export async function getInitialHistoryData() {
    const url = "tempStorage/job_results.json"; // Fixed path

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status ${response.status}`);
        }

        const data = await response.json();

        const d = {
            jobIDs: [],
            run_at: [],
            tests: []
        };

        data.forEach(jobResult => {
            d.jobIDs.push(jobResult["id"]); // Fixed object access
            d.run_at.push(jobResult["run_at"]);
            d.tests.push(jobResult["tests"]);
        });

        return d;

    } catch (error) {
        console.error("There was a problem with the fetch request:", error);
        return { jobs: [], run_at: [], tests: [] }; // Return an empty dataset on error
    }
}



export async function getJobData(jobID) { 
    const url = "tempStorage/job_results.json"; // Fixed path

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status ${response.status}`);
        }

        const data = await response.json();

        const jobData = data.find(jobResult => jobResult["id"] === jobID);
        return jobData;
        
    } catch (error) {   
        console.error("There was a problem with the fetch request:", error);
        return null; // Return null on error
    }
}