const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');





router.get('/test', analyticsController.getJobResults);


module.exports = router;