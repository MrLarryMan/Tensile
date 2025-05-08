'use strict';
const { Sequelize, DataTypes } = require('sequelize');

module.exports  = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('jobResults', {
            jobResultId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'userId'
                },
                allowNull: true,
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

        await queryInterface.createTable('vulns', {
            timestamps: false,
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
            recommendations: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            
        });

        await queryInterface.createTable('savedJobs', {
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
            // userId: {
            //     type: Sequelize.INTEGER,
            //     references: {
            //         model: 'users',
            //         key: 'userId'
            //     },
            //     allowNull: false,
            // },
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
            requestType: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            parameter: {
                type: Sequelize.STRING,
                allowNull: true,
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
        });

        await queryInterface.createTable('users', {
            userId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        });
    },


    

    
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('JobResults');
        await queryInterface.dropTable('vulns');
        await queryInterface.dropTable('SavedJobs');
        await queryInterface.dropTable('users');
    }
}