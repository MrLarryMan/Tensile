const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/', analyticsController.getJobResults);
router.get('/:id', analyticsController.getJobResultById);
router.delete('/:id', analyticsController.deleteJobResultById);

module.exports = router;