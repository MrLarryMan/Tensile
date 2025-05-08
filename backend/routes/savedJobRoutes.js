const express = require('express');
const router = express.Router();
const savedJobController = require('../controllers/savedJobController');

router.get('/', savedJobController.getSavedJobs);
router.get('/:jobId', savedJobController.getSavedJob);
router.post('/', savedJobController.createSavedJob);
router.put('/:jobId',  savedJobController.updateSavedJob);
router.delete('/:jobId', savedJobController.deleteSavedJob);

module.exports = router;