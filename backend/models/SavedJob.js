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
    allowNull: true,
  },
  jobResultId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'jobResults',
      key: 'jobResultId'
    },
    allowNull: true,
  },
  jobName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requestType: {
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
  selectedTests: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      const raw = this.getDataValue('selectedTests');
      return raw ? JSON.parse(raw) : ["No Tests Found"];
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