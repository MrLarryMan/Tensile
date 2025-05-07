const { sequelize } = require('../sequelize.js');
const { DataTypes } = require('sequelize');

// Import models
const Job = require('./Job.js');
const JobResult = require('./jobResult.js');
const Vulnerability = require('./Vulnerabilty.js');
const User = require('./User.js'); // change when user is changed to sequelize model
//SavedJob = require('./SavedJob.js'); change when savedjob is changed to sequelize model

const models = {
    Job,
    JobResult,
    Vulnerability,
    User, 
};

// Define the relationship between JobResult and Vulnerability
JobResult.hasMany(Vulnerability, { foreignKey: 'jobResultId', as: 'vulnerabilities' });
Vulnerability.belongsTo(JobResult, { foreignKey: 'jobResultId', as: 'jobResult' });

// Define the relationship between JobResult and Job
JobResult.hasOne(Job, { foreignKey: 'jobResultId', as: 'job' });
Job.belongsTo(JobResult, { foreignKey: 'jobResultId', as: 'jobResult'});

//Define the relationship between User and Job and JobResult
User.hasMany(Job, { foreignKey: 'userId', as: 'jobs' });
Job.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(JobResult, { foreignKey: 'userId', as: 'jobResults' });
JobResult.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = models;