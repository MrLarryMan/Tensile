const JobResult = require('../models/JobResult');
const SavedJob = require('../models/SavedJob');
const scannerXSS = require('./scannerXSS')
const scannerFileTrav = require('./scannerFileTrav')
const Vulnerability = require('../models/Vulnerabilty.js');

exports.jobStatus = async (resultId) => {
    const jobResult = await JobResult.findByPk(resultId);
    if (!jobResult) {
        throw new Error(`Job result with id ${id} not found`);
    }
    return jobResult.status;
}

exports.runJob = async (jobId) => {
    let job;
    try {
        job = await SavedJob.findByPk(jobId);
    } catch (err) {
        console.log(err);
    }
    if(!job) {
        console.error("Nonexistent ID!");
        return -1;
    }
    const tests = job.selectedTests;
    for (let i = 0; i < tests.length; i++) {
        // TODO: Fix up this code, currently a little redundant
        if(tests[i] === "XSS") {
            let result;
            try {
                result = await JobResult.create({
                    userId: undefined,
                    status: "Running",
                    run_at: Date.now().toString(),
                    vulns: []
                    }, {
                    include: [{ model: Vulnerability, as: 'vulns' }]
                });
            } catch (e) {
                console.log(e);
            }
            scannerXSS.xssScan(job.dataValues.url + job.dataValues.endpoint, job.dataValues.parameter, job.dataValues.requestType, job.dataValues.dataType).then(async (vulns) => {
                result.status = "Finished";
                console.log("XSS Finished without error!");
                if(vulns) {
                    await result.createVuln(vulns);
                }
                await result.save();
            }).catch(async (error) => {
                result.status = "Failed";
                await result.save();
                console.log("XSS Finished with error!");
            });
            return result.jobResultId;
        } else if(tests[i] === "pathTraversal") {
            let result;
            try {
                result = await JobResult.create({
                    userId: undefined,
                    status: "Running",
                    run_at: Date.now().toString(),
                    vulns: []
                    }, {
                    include: [{ model: Vulnerability, as: 'vulns' }]
                });
            } catch (e) {
                console.log(e);
            }
            scannerFileTrav.fileTravScan(job.dataValues.url + job.dataValues.endpoint, job.dataValues.parameter, job.dataValues.requestType, job.dataValues.datatype).then(async (vulns) => {
                result.status = "Finished";
                console.log("Path Traversal Finished without error!");
                if(vulns) {
                    await result.createVuln(vulns);
                }
                await result.save();
            }).catch(async (error) => {
                result.status = "Failed";
                console.log(error);
                console.log("Path Traversal Finished with error!");
                await result.save();
            });
            return result.jobResultId;
        }
    }
}

exports.createAndRunJob = async (spec) => {
    let newJob;
    try {
        newJob = await SavedJob.create(spec);
        return exports.runJob(newJob.jobId);
    } catch (err) {
        console.error(err);
    }
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
