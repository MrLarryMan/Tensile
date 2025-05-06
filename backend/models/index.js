const { sequelize } = require('../sequelize.js');
const { DataTypes } = require('sequelize');

// Import models
const Job = require('./Job.js');
const JobResult = require('./jobResult.js');
const Vulnerability = require('./Vulnerabilty.js');
const User = require('./User.js'); // change when user is changed to sequelize model
//SavedJob = require('./SavedJob.js'); change when savedjob is changed to sequelize model

const models = {
    Job: Job(sequelize, DataTypes),
    JobResult: JobResult(sequelize, DataTypes),
    Vulnerability: Vulnerability(sequelize, DataTypes),
    User: User(sequelize, DataTypes), // change when user is changed to sequelize model
};

// Define associations

// Define the relationship between JobResult and Vulnerability
JobResult.hasMany(Vulnerability, { foreignKey: 'jobResultId' });
Vulnerability.belongsTo(JobResult, { foreignKey: 'jobResultId' });

// Define the relationship between JobResult and Job
JobResult.hasOne(Job, { foreignKey: 'jobResultId' });
Job.belongsTo(JobResult, { foreignKey: 'jobResultId' });

//Define the relationship between User and Job, JobResult, and SavedJobs
// User.hasMany(Job, { foreignKey: 'userId' });
// Job.belongsTo(User, { foreignKey: 'userId' });

// User.hasMany(JobResult, { foreignKey: 'userId' });
// JobResult.belongsTo(User, { foreignKey: 'userId' });

module.exports = models;