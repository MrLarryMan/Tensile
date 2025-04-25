const Job = require('../models/jobModel');

// GET /api/jobs
exports.getAllJobs = (req, res) => {
  res.json(Job.getAll());
};

// GET /api/jobs/:id
exports.getJobById = (req, res) => {
  const job = Job.getById(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
};

// POST /api/jobs
exports.createJob = (req, res) => {
  const { url, endpoint, datatype, selectedTests } = req.body;
  if (!url || !endpoint) return res.status(400).json({ error: 'URL and endpoint required' });
  try { new URL(url); } catch { return res.status(400).json({ error: 'Invalid URL' }); }
  if (!endpoint.startsWith('/') || /\s/.test(endpoint)) {
    return res.status(400).json({ error: 'Endpoint must start with "/" and contain no spaces' });
  }
  const job = Job.create({ url, endpoint, datatype, selectedTests, createdAt: new Date().toISOString() });
  res.status(201).json(job);
};

// PUT /api/jobs/:id
exports.updateJob = (req, res) => {
  const job = Job.update(req.params.id, req.body);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
};

// DELETE /api/jobs/:id
exports.deleteJob = (req, res) => {
  const ok = Job.delete(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Job not found' });
  res.status(204).end();
};