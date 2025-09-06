const Report = require('../models/Report');

exports.saveReport = async (req, res) => {
  try {
    const userId = req.user;
    const reportData = req.body;
    const newReport = new Report({ ...reportData, user: userId });
    await newReport.save();
    res.json(newReport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const userId = req.user;
    const reports = await Report.find({ user: userId }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
