const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

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

module.exports = Vulnerability;