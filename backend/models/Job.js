const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Job = sequelize.define('Job', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endpoint: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parameter: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  datatype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  selectedTests: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('selectedTests'));
    },
    set(val) {
      this.setDataValue('selectedTests', JSON.stringify(val));
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  updatedAt: false
});

module.exports = Job;