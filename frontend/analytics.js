import { getInitialHistoryData, getJobData } from "./fetch.js"

addEventListener("DOMContentLoaded", async () => {

    updatePage();

    const failedTestsSelections = document.getElementById("failed-tests");
    failedTestsSelections.addEventListener("change", async () => {
        updateFailedTestInfo(parseInt(failedTestsSelections.value));
    });

    const jobSelection = document.getElementById("Past Jobs");
    jobSelection.addEventListener("change", async () => {
        const jobInfo = await getJobData(parseInt(jobSelection.value));
        if (jobInfo) {
            refreshJobInfo(jobInfo);
        }
    });

}); 



async function updatePage() {
    try {
        const data = await getInitialHistoryData();
        if (data && data["jobIDs"].length > 0) {
            //updateHistoryGraph(data);
            updateJobSelectionInfo(data["jobIDs"], data["jobNames"]);
        }
    } catch(error) {
        console.error(`Error updating page: ${error}`);
    }
    try {
        const jobInfo = await getJobData(1);
        refreshJobInfo(jobInfo);
    } catch (error) {
        console.error(`Error fetching initial job info: ${error}`);
    }
}

async function updateHistoryGraph(data) {
    return;
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

 function refreshJobInfo(jobInfo) {
    updateFailedTestSelectionOptions(jobInfo);
    updateJobSummaryInfo(jobInfo);
}

function updateFailedTestSelectionOptions(jobInfo) {
    if (!jobInfo || !jobInfo["vulns"]) return;
    const failedTestsSelections = document.getElementById("failed-tests");
    const vulnList = jobInfo["vulns"] || [];
    failedTestsSelections.replaceChildren(); // Clear existing options
    for (const vuln of vulnList) {
        const option = document.createElement("option");
        option.value = vuln["test_id"];
        option.textContent = `${vuln["category"]}: ${vuln["payload"]}`;
        failedTestsSelections.appendChild(option);
    }
    updateFailedTestInfo(vulnList[0]["test_id"]); // Update info for the first option
}

async function updateFailedTestInfo(test_id) {
    try{
        const jobInfo = await getJobData(test_id);
        const vulnList = jobInfo["vulns"] || [];
        const vulnInfo = vulnList.find(v => v["test_id"] === test_id);
        if (vulnInfo) {
            document.getElementsByClassName("failed-test-info")[0].innerHTML = vulnInfo["recommendations"];  
        } else {
            console.warn("vulnInfo not found for test_id:", test_id);
        }
    } catch(error) {
        console.error(`Error fetching failed test info: ${error}`)
    }
}

async function updateJobSummaryInfo(jobData) {
    const testResults = Object.values(jobData["tests"]) || {};
    if (testResults.length === 0) return;
    const passed_tests = testResults.reduce((acc, test) => acc + (test ? 1 : 0), 0);
    const job_summary = document.getElementById("passed-info");
    job_summary.innerHTML = ` ${passed_tests} out of ${testResults.length} tests passed`;
}



