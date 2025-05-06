const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Job = require('./Job'); // Import the Job model
const Vulnerability = require('./Vulnerabilty'); // Import the Vulnerability model

const JobResult = sequelize.define('JobResult', {
    jobResultId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    run_at: {
        type: DataTypes.STRING,
        allowNull: false,   
    }
}, {
    updatedAt: false,
});

const Vulnerability = sequelize.define('Vulnerability', {
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payload: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    recommendations: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    updatedAt: false,
});

// Define the relationship between JobResult and Vulnerability
JobResult.hasMany(Vulnerability, { foreignKey: 'jobResultId' });
Vulnerability.belongsTo(JobResult, { foreignKey: 'jobResultId' });

// Define the relationship between JobResult and Job
JobResult.hasOne(Job, { foreignKey: 'jobResultId' });
Job.belongsTo(JobResult, { foreignKey: 'jobResultId' });


module.exports = JobResult;