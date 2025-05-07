const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Vulnerability = sequelize.define('Vulnerability', {
    jobResultId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'jobResults',
            key: 'jobResultId'
        },
        allowNull: false,
    },
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
    tableName: 'vulns',
    updatedAt: false,
    createdAt: false,
});

module.exports = Vulnerability;