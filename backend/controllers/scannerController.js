// Does not have its own model, as it makes use of the jobResult and SavedJob models in its service code.
const scannerMain = require('../src/scannerMain')

// GET, returns the status of the job (Running, Failed, or Finished)
exports.jobStatus = async (req, res) => {
    try {
        const jobStatus = await scannerMain.jobStatus(req.params.resultId);
        res.status(200).json(jobStatus);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job status', error });
    }
};

// POST, runs a job by its id. Will return the job result id (not necessarily finished running).
exports.runJob = async (req, res) => {
    try {
        const jobResult = await scannerMain.runJob(req.params.jobId);
        res.status(200).json(jobResult);
    } catch (error) {
        res.status(500).json({ message: 'Error running job', error });
    }
}

// POST, runs a creates and runs a job with specs taken from the body of the request.
// Will return the job result id (not necessarily finished running).
exports.createAndRunJob = async (req, res) => {
    try {
        const jobResult = await scannerMain.createAndRunJob(req.body);
        res.status(200).json(jobResult);
    } catch (error) {
        res.status(500).json({ message: 'Error running job', error });
    }
}

// DELETE, Terminates a running job with its result id and deletes its results (only if job did not finish).
exports.terminateJob = async (req, res) => {
    try {
        const deletedJobResult = await scannerMain.terminateJob(id);
        if (deletedJobResult = false) {
            res.status(200).json({ message: 'Job already finished. No change made.' });
        } else {
            res.status(200).json({ message: 'Job result deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error terminating job', error });
    }
}