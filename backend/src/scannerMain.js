const JobResult = require('../models/jobResult');
const SavedJob = require('../models/SavedJob');
const scannerXSS = require('./scannerXSS')
const scannerFileTrav = require('./scannerFileTrav')

exports.jobStatus = async (resultId) => {
    const jobResult = await JobResult.findByPk(resultId);
    if (!jobResult) {
        throw new Error(`Job result with id ${id} not found`);
    }
    return jobResult.status;
}

exports.runJob = async (jobId) => {
    const job = SavedJob.findByPk(jobId);
    const tests = job.test_options;
    for (const key in tests) {
        if (tests.hasOwnProperty(key)) { // Ensure it's not from the prototype chain
            // TODO: Fix up this code, currently a little redundant
            if(key === "XSS" && tests[key] == true) {
                const result = await JobResult.create({
                    userId: -1,
                    status: "Running",
                    run_at: Date.now().toString(),
                    vulns: []
                  }, {
                    include: [{ model: Vulnerability, as: 'vulns' }]
                });
                scannerXSS.xssScan(job.url + job.endpoint, job.parameter, job.requestType, job.dataType).then(async (vulns) => {
                    result.status = "Finished";
                    await result.createVuln(vulns);
                    await result.save();
                }).catch(async (error) => {
                    result.status = "Failed";
                    await result.save();
                });
                return result.jobResultId;
            } else if(key == "fileTraversal") {
                const result = await JobResult.create({
                    userId: -1,
                    status: "Running",
                    run_at: Date.now().toString(),
                    vulns: []
                  }, {
                    include: [{ model: Vulnerability, as: 'vulns' }]
                });
                scannerFileTrav.fileTravScan(job.url + job.endpoint, job.parameter, job.requestType, job.dataType).then(async (vulns) => {
                    result.status = "Finished";
                    await result.createVuln(vulns);
                    await result.save();
                }).catch(async (error) => {
                    result.status = "Failed";
                    await result.save();
                });
                return result.jobResultId;
            }
        }
    }
}

exports.createAndRunJob = async (spec) => {
    let newJob;
    try {
        newJob = await SavedJob.create(spec);
    } catch (err) {
        throw err;
    }
    
    return runJob(newJob.job_id);
}

// exports.terminateJob = async (resultId) => {
//     const jobResult = await jobResultModel.getById(resultId);
//     if (!jobResult) {
//         throw new Error(`Job result with id ${resultId} not found`);
//     }
//     if (jobResult.status != "Running") {
//         return false;
//     }

//     // DELETE THE JOB

//     return true;
// }
