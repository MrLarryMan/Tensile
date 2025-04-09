import { getInitialHistoryData, getJobData } from "./fetch.js"

addEventListener("DOMContentLoaded", async () => {

    try {
        const data = await getInitialHistoryData();
        if (data.jobIDs.length > 0) {
            updateJobInfoSelection(data.jobIDs, data.jobNames);
        }
    } catch(error) {
        console.error(`Error fetching data: ${error}`)
    }

    const failedTestsSelections = document.getElementById("failed-tests");
    failedTestsSelections.addEventListener("change", async () => {
        updateFailedTestInfo(parseInt(failedTestsSelections.value));
    });

    const jobSelection = document.getElementById("Past Jobs");
    jobSelection.addEventListener("change", async () => {
        const jobInfo = await getJobData(parseInt(jobSelection.value));
        if (jobInfo) {
            replaceVulnObjects(jobInfo);
        }
    });
    
}); 






function replaceVulnObjects(jobInfo) {
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

async function updateJobInfoSelection(job_ids, jobNames) {
    if(job_ids.length !== jobNames.length) return;
    const jobSelection = document.getElementById("Past Jobs");
    jobSelection.replaceChildren(); // Clear existing options
    for(let i = 0; i < job_ids.length; i++) {
        const option = document.createElement("option");
        option.value = job_ids[i];
        option.textContent = jobNames[i];
        jobSelection.appendChild(option);
    }
    const jobInfo = getJobData(job_ids[0]); // Update info for the first option
    replaceVulnObjects(await jobInfo);
}