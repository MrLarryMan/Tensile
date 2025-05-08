const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const SavedJob = sequelize.define('SavedJob', {
  jobId: {
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
  tableName: 'savedJobs',
  updatedAt: false,
});

module.exports = SavedJob;