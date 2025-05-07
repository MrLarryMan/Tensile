'use strict';
const { Sequelize } = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('jobResults', [
      {
        jobResultId: 1,
        status: 'completed',
        run_at: new Date(),
      },
      {
        jobResultId: 2,
        status: 'failed',
        run_at: new Date(),
      },
    ], {});
    
    await queryInterface.bulkInsert('savedJobs', [
     {
        jobName: 'Test Job 1',
        url: 'https://example.com/job1',
        endpoint: '/api/job1',
        selectedTests: JSON.stringify(['test1', 'test2']),
        datatype: 'json',
        createdAt: new Date(),
        jobResultId: 1,
      },
      {
        jobName: 'Test Job 2',
        url: 'https://example.com/job2',
        endpoint: '/api/job2',
        selectedTests: JSON.stringify(['test3', 'test4']),
        datatype: 'xml',
        createdAt: new Date(),
        jobResultId: 2,
     }, 
    ], {});

    

    await queryInterface.bulkInsert('vulnerabilities', [
      {
        category: 'SQL Injection',
        payload: 'SELECT * FROM users WHERE id = 1 OR 1=1',
        recommendation: 'Use parameterized queries to prevent SQL injection attacks.',
        jobResultId: 1,
      },
      {
        category: 'Cross-Site Scripting (XSS)',
        payload: '<script>alert("XSS")</script>',
        recommendation: 'Use proper escaping and sanitization to prevent XSS attacks.',
        jobResultId: 1,
      }, {
        category: 'Cross-Site Scripting (XSS)',
        payload: '<script>alert("XSS")</script>',
        recommendation: 'Use proper escaping and sanitization to prevent XSS attacks.',
        jobResultId: 2,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('savedJobs', null, {});
    await queryInterface.bulkDelete('jobResults', null, {});
    await queryInterface.bulkDelete('vulnerabilities', null, {});
  }
};
