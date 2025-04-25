const express = require('express');
const router = express.Router();
const scannerController = require('../controllers/scannerController');

router.get('/:resultId', scannerController.jobStatus);
router.post('/', scannerController.createAndRunJob);
router.post('/:jobId',  scannerController.runJob);
router.delete('/:resultId', scannerController.terminateJob);

module.exports = router;
