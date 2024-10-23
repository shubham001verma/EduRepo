const express = require('express');
const multer = require('multer');
const Course = require('../models/course'); // Your Mongoose Course model
const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Path where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Renames file to avoid conflicts
    }
});

const upload = multer({ storage: storage });

// POST route for adding a course
router.post('/addcourse', upload.fields([
    { name: 'pdfNotes', maxCount: 10 }, // Adjust maxCount as needed
    { name: 'prevYearQPapers', maxCount: 10 },
    { name: 'videos', maxCount: 10 }
]), async (req, res) => {
    try {
        const courseData = {
            courseName: req.body.courseName,
            pdfNotes: req.files.pdfNotes ? req.files.pdfNotes.map(file => file.path) : [],
            prevYearQPapers: req.files.prevYearQPapers ? req.files.prevYearQPapers.map(file => file.path) : [],
            videos: req.files.videos ? req.files.videos.map(file => file.path) : []
        };

        const newCourse = new Course(courseData);
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/corsecount', async (req, res) => {
    try {
      const totalCourses = await Course.countDocuments(); // Count total courses in the database
      res.json({ totalCourses });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  router.get('/ssc-courses', async (req, res) => {
    try {
      // Find courses where category is 'SSC'
      const sscCourses = await Course.find({  courseName: 'SSC' });
      res.json(sscCourses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  router.get('/cgpse-courses', async (req, res) => {
    try {
      // Find courses where category is 'SSC'
      const cgpseCourses = await Course.find({  courseName: 'CGPSE' });
      res.json(cgpseCourses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  router.get('/cgvyapam-courses', async (req, res) => {
    try {
      // Find courses where category is 'SSC'
      const cgvyapamCourses = await Course.find({  courseName: 'CG-VYAPAM' });
      res.json(cgvyapamCourses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  router.get('/bank-courses', async (req, res) => {
    try {
      // Find courses where category is 'SSC'
      const bankCourses = await Course.find({  courseName: 'Bank' });
      res.json(bankCourses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  router.get('/railway-courses', async (req, res) => {
    try {
      // Find courses where category is 'SSC'
      const railwayCourses = await Course.find({  courseName: 'Railway' });
      res.json(railwayCourses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// GET route for retrieving all courses
router.get('/getcourse', async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving courses', error: error.message });
    }
});

// GET route for retrieving a course by ID
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving course', error: error.message });
    }
});

// PUT route for updating a course by ID
router.put('/:id', upload.fields([
    { name: 'pdfNotes', maxCount: 1 },
    { name: 'prevYearQPapers', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), async (req, res) => {
    try {
        const { courseName } = req.body;
        const updateData = { courseName };

        if (req.files['pdfNotes']) {
            updateData.pdfNotes = req.files['pdfNotes'][0].path;
        }
        if (req.files['prevYearQPapers']) {
            updateData.prevYearQPapers = req.files['prevYearQPapers'][0].path;
        }
        if (req.files['video']) {
            updateData.video = req.files['video'][0].path;
        }

        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error updating course', error: error.message });
    }
});

// DELETE route for deleting a course by ID
router.delete('/deletecourse/:id', async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error: error.message });
    }
});

module.exports = router;

