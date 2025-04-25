const SavedJob = require('../models/SavedJob');
const { NotFoundError } = require('../errors');

// GET: get all saved jobs
exports.getSavedJobs = async (req, res, next) => {
  try {
    const jobs = SavedJob.getAll();
    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

// GET: get single saved job -- by jobId
exports.getSavedJob = async (req, res, next) => {
  try {
    const job = SavedJob.getById(req.params.jobId);
    if (!job) {
      throw new NotFoundError('Job not found');
    }
    res.json(job);
  } catch (err) {
    next(err);
  }
};

// POST: create new saved job
exports.createSavedJob = async (req, res, next) => {
  try {
    const newJob = SavedJob.create(req.body);
    res.status(201).json(newJob);
  } catch (err) {
    next(err);
  }
};

// PUT: update saved job
exports.updateSavedJob = async (req, res, next) => {
  try {
    const updatedJob = SavedJob.update(req.params.jobId, req.body);
    if (!updatedJob) {
      throw new NotFoundError('Job not found');
    }
    res.json(updatedJob);
  } catch (err) {
    next(err);
  }
};

// DELETE: delete saved job
exports.deleteSavedJob = async (req, res, next) => {
  try {
    const success = SavedJob.delete(req.params.jobId);
    if (!success) {
      throw new NotFoundError('Job not found');
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};