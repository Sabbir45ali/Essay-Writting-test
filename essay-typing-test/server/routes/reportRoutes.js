const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const reportController = require('../controllers/reportController');

router.get('/', auth, async (req, res) => {
  try {
    const reports = await reportController.getReports(req, res);
    res.json(reports);
  } catch (err) {
    res.status(500).json({ msg: 'Server error fetching reports' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const savedReport = await reportController.saveReport(req, res);
    res.status(201).json(savedReport);
  } catch (err) {
    res.status(500).json({ msg: 'Server error saving report' });
  }
});

module.exports = router;
