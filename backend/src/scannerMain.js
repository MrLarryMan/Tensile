const jobResultModel = require('../models/jobResultModel');
const SavedJob = require('../models/SavedJob');
const scannerXSS = require('./scannerXSS')

// create a template of job results to initially save
function createJobResultTemplate(job) {
    return {
        "status": "Running",
        "vulns": [],
        "run_at": Date.now().toString(),
        job
    }
}

exports.jobStatus = async (resultId) => {
    const jobResult = await jobResultModel.getById(resultId);
    if (!jobResult) {
        throw new Error(`Job result with id ${id} not found`);
    }
    return jobResult.status;
}

exports.runJob = (jobId) => {
    const job = SavedJob.getById(jobId);
    const tests = job.test_options;
    for (const key in tests) {
        if (tests.hasOwnProperty(key)) { // Ensure it's not from the prototype chain
            if(key === "XSS" && tests[key] == true) {
                let template = createJobResultTemplate(job);
                const result = jobResultModel.create(template);
                scannerXSS.xssScan(job.url + job.endpoint, job.requestType, job.dataType).then((vulns) => {
                    template.status = "Finished";
                    template.vulns = vulns; 
                    jobResultModel.update(result.id, template);
                }).catch((error) => {
                    template.status = "Failed";
                    jobResultModel.update(result.id, template);
                });
                return result.id;
            } else if(key === "LFI" && tests[key] == true) {
                let template = createJobResultTemplate(job);
                const result = jobResultModel.create(template);
                scannerLFI.LFIScan(job.url + job.endpoint, job.requestType, job.dataType).then((vulns) => {
                    template.status = "Finished";
                    template.vulns = vulns; 
                    jobResultModel.update(result.id, template);
                }).catch((error) => {
                    template.status = "Failed";
                    jobResultModel.update(result.id, template);
                });
                return result.id;
            }
        }
    }
}

exports.createAndRunJob = async (spec) => {
    const newJob = await SavedJob.create(spec);
    return runJob(newJob.job_id);
}

exports.terminateJob = async (resultId) => {
    const jobResult = await jobResultModel.getById(resultId);
    if (!jobResult) {
        throw new Error(`Job result with id ${resultId} not found`);
    }
    if (jobResult.status != "Running") {
        return false;
    }
    return true;
}
