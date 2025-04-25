const fs = require('fs');
const path = require('path');
const JOB_RESULTS_FILE = path.join(__dirname, '../../data/job_results.json');

function readJobResults() {
    if (!fs.existsSync(JOB_RESULTS_FILE)) fs.writeFileSync(JOB_RESULTS_FILE, '[]');
    const data = fs.readFileSync(JOB_RESULTS_FILE, 'utf-8');
    return JSON.parse(data);
}

function writeJobResults(jobResults) {
    fs.writeFileSync(JOB_RESULTS_FILE, JSON.stringify(jobResults, null, 2));
}

exports.getAll = () => readJobResults();

exports.getById = (id) => readJobResults().find(jobResult => jobResult.id === id);

exports.create = (jobResultData) => {
    const jobResults = readJobResults();
    const newJobResult = { ...jobResultData, id: Date.now().toString() };
    jobResults.push(newJobResult);
    writeJobResults(jobResults);
    return newJobResult;
};

exports.update = (id, jobResultData) => {
    const jobResults = readJobResults();
    const idx = jobResults.findIndex(jobResult => jobResult.id === id);
    if (idx === -1) return null;
    jobResults[idx] = { ...jobResults[idx], ...jobResultData };
    writeJobResults(jobResults);
    return jobResults[idx];
};

exports.delete = (id) => {  
    const jobResults = readJobResults();
    const idx = jobResults.findIndex(jobResult => jobResult.id === id);
    if (idx === -1) return false;
    jobResults.splice(idx, 1);
    writeJobResults(jobResults);
    return true;
};