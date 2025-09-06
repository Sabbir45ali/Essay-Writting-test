const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const reportController = require('../controllers/reportController');

router.get('/', auth, reportController.getReports);
router.post('/', auth, reportController.createReport);

module.exports = router;
