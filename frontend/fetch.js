const ANALYTICS_BASE_URL = 'http://localhost:3000/api/analytics'

export async function getInitialHistoryData() {
    try {
        const response = await fetch(ANALYTICS_BASE_URL);
        if (!response.ok) {
            throw new Error(`Response status ${response.status}`);
        }

        const data = await response.json();

        const d = {
            jobIDs: [],
            run_at: [],
            tests: [],
            vulns: [],
            jobNames: [],
        };

        data.forEach(jobResult => {
            d.jobIDs.push(jobResult["jobResultId"]); // Fixed object access
            d.run_at.push(jobResult["run_at"]);
            d.vulns.push(jobResult["vulns"] || []);
            d.jobNames.push(jobResult.savedJob?.jobName || "Unknown Job"); 
        });

        return d;

    } catch (error) {
        console.error(`Fetch failed at ${ANALYTICS_BASE_URL}:`, error);
        return { jobs: [], run_at: [], tests: [], vulns: [], jobNames: [] }; // Return an empty dataset on error
    }
}



export async function getJobData(jobID) { 
    try {
        const response = await fetch(`${ANALYTICS_BASE_URL}/${jobID}`);
        if (!response.ok) {
            throw new Error(`Response status ${response.status}`);
        }

        const data = await response.json();
        return data;
        
    } catch (error) {   
        console.error(`Fetch failed at ${ANALYTICS_BASE_URL}/${jobID}:`, error);
        return null; // Return null on error
    }
}


export async function deleteJobData(jobID) { 
    try {
        const response = await fetch(`${ANALYTICS_BASE_URL}/${jobID}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Response status ${response.status}`);
        }

        return true;
        
    } catch (error) {   
        console.error(`Fetch failed at ${ANALYTICS_BASE_URL}/${jobID}:`, error);
        return false; // Return false on error
    }
}
