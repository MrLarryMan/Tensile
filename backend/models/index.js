const { sequelize } = require('../sequelize.js');
const { DataTypes } = require('sequelize');

// Import models
const Job = require('./Job.js');
const JobResult = require('./JobResult.js');
const Vulnerability = require('./Vulnerabilty.js');
const User = require('./User.js'); // change when user is changed to sequelize model
const SavedJob = require('./SavedJob.js'); // change when saved job is changed to sequelize model

const models = {
    Job,
    JobResult,
    Vulnerability,
    User,
    SavedJob
};

// Define the relationship between JobResult and Vulnerability
JobResult.hasMany(Vulnerability, { foreignKey: 'jobResultId', as: 'vulns' });
Vulnerability.belongsTo(JobResult, { foreignKey: 'jobResultId', as: 'jobResult' });

// Define the relationship between JobResult and Job
JobResult.hasOne(SavedJob, { foreignKey: 'jobResultId', as: 'savedJob' });
SavedJob.belongsTo(JobResult, { foreignKey: 'jobResultId', as: 'jobResult'});

//Define the relationship between User and Job and JobResult
User.hasMany(SavedJob, { foreignKey: 'userId', as: 'savedJobs' });
SavedJob.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(JobResult, { foreignKey: 'userId', as: 'jobResults' });
JobResult.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = models; 