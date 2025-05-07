const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const SavedJob = sequelize.define('SavedJob', {
  jobId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  jobName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endpoint: {
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
  datatype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  updatedAt: false,
});

module.exports = SavedJob;