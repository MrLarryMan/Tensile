const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Vulnerability = sequelize.define('Vulnerability', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    jobResultId: {
        type: DataTypes.INTEGER,
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