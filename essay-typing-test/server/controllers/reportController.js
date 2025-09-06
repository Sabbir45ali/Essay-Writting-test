const Report = require('../models/Report');  // Import the Report model

// Get all reports for logged-in user
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user.id }).sort({ createdAt: -1 });
    return reports;  // For router to handle response
  } catch (err) {
    throw err;
  }
};

// Save a new report for logged-in user
exports.saveReport = async (req, res) => {
  try {
    const newReport = new Report({
      ...req.body,
      user: req.user.id   // Attach user ID from auth middleware
    });
    const savedReport = await newReport.save();
    return savedReport;
  } catch (err) {
    throw err;
  }
};
