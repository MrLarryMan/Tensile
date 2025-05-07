'use strict';
const { Sequelize } = require('sequelize');

module.exports  = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('jobResults', {
            jobResultId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            run_at: {
                type: Sequelize.STRING,
                allowNull: false,   
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        });

        await queryInterface.createTable('vulnerabilities', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            jobResultId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'jobResults',
                    key: 'jobResultId'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            category: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            payload: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            recommendation: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            
        });

        await queryInterface.createTable('SavedJobs', {
            jobId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            jobResultId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'jobResults',
                    key: 'jobResultId'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            jobName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            url: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            endpoint: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            selectedTests: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            datatype: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('JobResults');
        await queryInterface.dropTable('Vulnerabilities');
        await queryInterface.dropTable('SavedJobs');
    }
}