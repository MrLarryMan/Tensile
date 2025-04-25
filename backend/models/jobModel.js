const fs = require('fs');
const path = require('path');
const JOBS_FILE = path.join(__dirname, '../../data/jobs.json');

function readJobs() {
  if (!fs.existsSync(JOBS_FILE)) fs.writeFileSync(JOBS_FILE, '[]');
  const data = fs.readFileSync(JOBS_FILE, 'utf-8');
  return JSON.parse(data);
}

function writeJobs(jobs) {
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
}

exports.getAll = () => readJobs();

exports.getById = (id) => readJobs().find(job => job.id === id);

exports.create = (jobData) => {
  const jobs = readJobs();
  const newJob = { ...jobData, id: Date.now().toString() };
  jobs.push(newJob);
  writeJobs(jobs);
  return newJob;
};

exports.update = (id, jobData) => {
  const jobs = readJobs();
  const idx = jobs.findIndex(job => job.id === id);
  if (idx === -1) return null;
  jobs[idx] = { ...jobs[idx], ...jobData };
  writeJobs(jobs);
  return jobs[idx];
};

exports.delete = (id) => {
  const jobs = readJobs();
  const idx = jobs.findIndex(job => job.id === id);
  if (idx === -1) return false;
  jobs.splice(idx, 1);
  writeJobs(jobs);
  return true;
};