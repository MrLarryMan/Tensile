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
            jobNames: [],
        };

        data.forEach(jobResult => {
            d.jobIDs.push(jobResult["id"]); // Fixed object access
            d.run_at.push(jobResult["run_at"]);
            d.tests.push(jobResult["tests"]);
            d.jobNames.push(jobResult["job"]["job_name"] || "Unknown Job"); 
        });

        return d;

    } catch (error) {
        console.error(`Fetch failed at ${ANALYTICS_BASE_URL}:`, error);
        return { jobs: [], run_at: [], tests: [], jobNames: [] }; // Return an empty dataset on error
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
