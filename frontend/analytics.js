import { getInitialHistoryData, getJobData, deleteJobData } from "./fetch.js"

addEventListener("DOMContentLoaded", async () => {

    updatePage();

    const failedTestsSelections = document.getElementById("failed-tests");
    failedTestsSelections.addEventListener("change", async () => {
        updateFailedTestInfo(parseInt(failedTestsSelections.value));
    });

    const jobSelection = document.getElementById("Past Jobs");
    jobSelection.addEventListener("change", async () => {  
        refreshJobInfo(parseInt(jobSelection.value)); 
    });

    const deleteJobButton = document.getElementById("delete-job-btn");
    deleteJobButton.addEventListener("click", async () => {
        deleteJob(parseInt(jobSelection.value));
    });


}); 

async function updatePage() {
    try {
        const data = await getInitialHistoryData();
        if (data && data["jobIDs"].length > 0) {
            buildHistoryGraph(data["run_at"], data["tests"]);
            updateJobSelectionInfo(data["jobIDs"], data["jobNames"]); //set job selection options
            refreshJobInfo(data["jobIDs"][0]); // Load initial job info
        }
    } catch(error) {
        console.error(`Error updating page: ${error}`);
    }
}

function stepSizeSetter(dates) {
    const properDates = dates.map(run_at => new Date(run_at));
    const diff = properDates[properDates.length-1] - properDates[0];
    const hours = diff / (1000 * 60);
    const minutes = hours / 60;
    const days = hours / 24;

    if (minutes < 60) return { unit: 'minute', stepSize: 5 };
    if (hours < 24) return { unit: 'hour', stepSize: 1 };
    if (days < 30) return { unit: 'day', stepSize: 1 };
    return { unit: 'month', stepSize: 1 };
}

function buildHistoryGraph(run_ats, tests) {
    const graph = document.getElementById("graph-history").getContext("2d");
    if (!graph) {
        console.error("Graph context not found");
        return;
    }
    const x_values = run_ats.map(run_at => new Date(run_at).toISOString());
    const y_values = tests.map(test => Object.values(test).reduce((acc, val) => acc + (val ? 1 : 0), 0));
    const data = {
        labels: x_values,
        datasets: [{
            label: 'Number of Tests Passed',
            data: y_values,
            backgroundColor: 'rgba(0, 119, 204, 0.2)',
            borderColor: 'rgba(0, 119, 204, 1)',
            borderWidth: 2,
            tension: 0.3
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10
                    },
                    type: 'time',
                    time: stepSizeSetter(run_ats),
                    scaleLabel: {
                        display: true,
                        labelString: 'Run Date'
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Tests Passed'
                    }
                }]
            },
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    };

    new Chart(graph, config);
}

async function updateJobSelectionInfo(job_ids, jobNames) {
    if(job_ids.length !== jobNames.length) return;
    const jobSelection = document.getElementById("Past Jobs");
    jobSelection.replaceChildren(); // Clear existing options
    for(let i = 0; i < job_ids.length; i++) {
        const option = document.createElement("option");
        option.value = job_ids[i];
        option.textContent = jobNames[i];
        jobSelection.appendChild(option);
    }
}

 async function refreshJobInfo(jobID) {
    const jobInfo = await getJobData(jobID);
    if (!jobInfo) return;
    sessionStorage.setItem(`jobInfo_${jobID}`, JSON.stringify(jobInfo));
    updateFailedTestSelectionOptions(jobInfo);
    updateJobSummaryInfo(jobInfo);
}

function updateFailedTestSelectionOptions(jobInfo) {
    if (!jobInfo || !jobInfo["vulns"]) return;
    const failedTestsSelections = document.getElementById("failed-tests");
    const vulnList = jobInfo["vulns"] || [];
    failedTestsSelections.replaceChildren(); // Clear existing options
    for (let i = 0; i < vulnList.length; i++){
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `${vulnList[i]["category"]}`;
        failedTestsSelections.appendChild(option);
    }
    if(vulnList.length > 0) {
        updateFailedTestInfo(0); // Update info for the first option
    }
    
}

async function updateFailedTestInfo(vuln_id) {
    try{
        const job_id = parseInt(document.getElementById("Past Jobs").value);
        let jobInfo = sessionStorage.getItem(`jobInfo_${job_id}`);

        if (!jobInfo) {
            jobInfo = await getJobData(job_id);
            sessionStorage.setItem(`jobInfo_${job_id}`, JSON.stringify(jobInfo));
        } else {
            jobInfo = JSON.parse(jobInfo);
        }
        const vulnList = jobInfo["vulns"] || [];
        const vulnInfo = vulnList[vuln_id];
        if (vulnInfo) {
            document.getElementsByClassName("failed-test-info")[0].innerHTML = vulnInfo["recommendations"];  
        } else {
            console.warn("vulnInfo not found for test_id:", vuln_id);
        }
    } catch(error) {
        console.error(`Error fetching failed test info: ${error}`)
    }
}

async function updateJobSummaryInfo(jobData) {
    const testResults = Object.values(jobData["vulns"]) || {};
    if (testResults.length === 0) return;
    const passed_tests = testResults.reduce((acc, test) => acc + (test ? 1 : 0), 0);
    const job_summary = document.getElementById("passed-info");
    job_summary.innerHTML = ` ${passed_tests} out of ${testResults.length} tests passed`;

    const job_information = document.getElementById("job-information");
    job_information.innerHTML = `<strong>${jobData.savedJob.jobName}</strong> | Ran on: ${new Date(jobData.run_at).toLocaleDateString()} found ${jobData.vulns.length} vulnerabilities.`;
}


async function deleteJob(jobID) {
    try {
        const response = await deleteJobData(jobID);
        if (response) {ç
            sessionStorage.removeItem(`jobInfo_${jobID}`);
            updatePage();
            alert("Job data deleted successfully");
        } else {
            console.error("Failed to delete job data");
        }
    } catch (error) {
        console.error(`Error deleting job data: ${error}`);
    }
}
