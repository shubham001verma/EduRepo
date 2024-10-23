const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    pdfNotes: [{ type: String }], // Array of PDF note file paths
    prevYearQPapers: [{ type: String }], // Array of previous year question paper file paths
    videos: [{ type: String }] ,// Array of video file paths
    createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
