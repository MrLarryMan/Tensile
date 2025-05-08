const express = require('express');
const router = express.Router();
const scannerController = require('../controllers/scannerController');

router.get('/jobStatus/:resultId', scannerController.jobStatus);
router.post('/runJob/:jobId',  scannerController.runJob);
router.delete('/terminateJob/:resultId', scannerController.terminateJob);
router.post('/createAndRunJob/', scannerController.createAndRunJob);

module.exports = router;
