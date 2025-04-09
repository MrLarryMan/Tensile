import { getInitialHistoryData, getJobData } from "./fetch.js"

addEventListener("DOMContentLoaded", async () => {
    try {
        const data = await getInitialHistoryData();
    } catch(error) {
        console.error(`Error fetching data: ${error}`)
    }
    try {
        const jobInfo = await getJobData(1);
        if (jobInfo) {
            replaceVulnObjects(jobInfo);
        }
    } catch(error) {
        console.error(`Error fetching job data: ${error}`)
    }
}); 

const failedTestsSelections = document.getElementById("failed-tests");
failedTestsSelections.addEventListener("change", async () => {
    updateFailedTestInfo(parseInt(failedTestsSelections.value));
});




function replaceVulnObjects(jobInfo) {
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