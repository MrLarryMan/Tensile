'use strict';
const { Sequelize, json } = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'testuser1',
        password: 'password1',
        email: 'email1@example.com',
        createdAt: new Date(),
      },
      {
        username: 'testuser2',
        password: 'password2',
        email: 'email2@example.com',
        createdAt: new Date(),
      },
    ], {});
    
    await queryInterface.bulkInsert('jobResults', [
      {
        jobResultId: 1,
        userId: 1,
        status: 'completed',
        run_at: new Date(),
      },
      {
        jobResultId: 2,
        userId: 1,
        status: 'failed',
        run_at: new Date(),
      },
    ], {});

    await queryInterface.bulkInsert('savedJobs', [
     {  
        userId: 1,
        jobResultId: 1,
        jobName: 'Test Job 1',
        url: 'https://example.com/job1',
        endpoint: '/api/job1',
        parameter: null,
        selectedTests: JSON.stringify(['pathTraversal']),
        datatype: 'raw',
        createdAt: new Date(),
      },
      {
        userId: 1,
        jobResultId: 2,
        jobName: 'Test Job 2',
        url: 'https://example.com/job2',
        endpoint: '/api/name',
        parameter: 'name',
        selectedTests: JSON.stringify(['XSS']),
        datatype: 'base64',
        createdAt: new Date(),
     }, 
    ], {});

    

    await queryInterface.bulkInsert('vulns', [
      {
        category: 'Path Traversal',
        payload: '../../../etc/shadow',
        recommendations: 'Review the allowed routes of your website, and make sure that only intended directories are included. Sanitize filepaths and avoid user-inputted filepaths.',
        jobResultId: 1,
      },
      {
        category: 'Cross-Site Scripting (XSS)',
        payload: '<script>alert("XSS")</script>',
        recommendations: 'Use proper escaping and sanitization to prevent XSS attacks.',
        jobResultId: 2,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('savedJobs', null, {});
    await queryInterface.bulkDelete('jobResults', null, {});
    await queryInterface.bulkDelete('vulns', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
