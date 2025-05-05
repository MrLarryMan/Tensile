const Job = require('../models/Job');

// GET /api/jobs
exports.getAllJobs = async (req, res) => {
  const jobs = await Job.findAll();
  res.json(jobs);
};

// GET /api/jobs/:id
exports.getJobById = async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
};

// POST /api/jobs
exports.createJob = async (req, res) => {
  const { url, endpoint, datatype, selectedTests } = req.body;
  if (!url || !endpoint) return res.status(400).json({ error: 'URL and endpoint required' });
  try { new URL(url); } catch { return res.status(400).json({ error: 'Invalid URL' }); }
  if (!endpoint.startsWith('/') || /\s/.test(endpoint)) {
    return res.status(400).json({ error: 'Endpoint must start with "/" and contain no spaces' });
  }
  const job = await Job.create({ url, endpoint, datatype, selectedTests });
  res.status(201).json(job);
};

// PUT /api/jobs/:id
exports.updateJob = async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  await job.update(req.body);
  res.json(job);
};

// DELETE /api/jobs/:id
exports.deleteJob = async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  await job.destroy();
  res.status(204).end();
};