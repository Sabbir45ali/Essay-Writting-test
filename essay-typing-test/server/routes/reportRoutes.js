const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { saveReport, getReports } = require('../controllers/reportController');

router.post('/', auth, saveReport);
router.get('/', auth, getReports);

module.exports = router;
