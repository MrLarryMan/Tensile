const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const JobResult = sequelize.define('JobResult', {
    jobResultId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'userId'
        },
        allowNull: true,
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
    tableName: 'jobResults',
    updatedAt: false,
});

module.exports = JobResult;