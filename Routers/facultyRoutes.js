// routes/facultyRoutes.js
const express = require('express');
const router = express.Router();
const Faculty = require('../models/feculity'); // Corrected the path to faculty model
const multer = require('multer');
const path = require('path');

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// POST: Add a new faculty member with image upload
router.post('/add', upload.single('facultyImage'), async (req, res) => {
    const { name, email, phoneNumber, department, qualifications, experience,details } = req.body;
    const facultyImage = req.file ? req.file.path : null; // Save the image path

    try {
        const newFaculty = new Faculty({
            name,
            email,
            phoneNumber,
            department,
            qualifications,
            experience,
            details,
            facultyImage
        });

        await newFaculty.save();
        res.status(201).json({ message: 'Faculty member added successfully', faculty: newFaculty });
    } catch (error) {
        res.status(400).json({ message: 'Error adding faculty member', error });
    }
});

// GET: Retrieve all faculty members
router.get('/', async (req, res) => {
    try {
        const facultyMembers = await Faculty.find();
        res.status(200).json(facultyMembers);
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving faculty members', error });
    }
});
router.get('/count', async (req, res) => {
    try {
      const totalFaculty = await Faculty.countDocuments(); // Assuming you are using Mongoose
      res.json({ totalFaculty });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// GET: Retrieve a faculty member by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const facultyMember = await Faculty.findById(id);
        if (!facultyMember) {
            return res.status(404).json({ message: 'Faculty member not found' });
        }
        res.status(200).json(facultyMember);
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving faculty member', error });
    }
});

// PUT: Update a faculty member by ID
router.put('/:id', upload.single('facultyImage'), async (req, res) => {
    const { id } = req.params;
    const { name, email, phoneNumber, department, qualifications, experience,details } = req.body;
    const facultyImage = req.file ? req.file.path :req.body.facultyImage; // Save the image path if provided

    try {
        const updatedFaculty = await Faculty.findByIdAndUpdate(
            id,
            {
                name,
                email,
                phoneNumber,
                department,
                qualifications,
                experience,
                details,
                facultyImage // This can be null if no new image is uploaded
            },
            { new: true } // Return the updated document
        );

        if (!updatedFaculty) {
            return res.status(404).json({ message: 'Faculty member not found' });
        }

        res.status(200).json({ message: 'Faculty member updated successfully', faculty: updatedFaculty });
    } catch (error) {
        res.status(400).json({ message: 'Error updating faculty member', error });
    }
});

// DELETE: Delete a faculty member by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFaculty = await Faculty.findByIdAndDelete(id);
        if (!deletedFaculty) {
            return res.status(404).json({ message: 'Faculty member not found' });
        }
        res.status(200).json({ message: 'Faculty member deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting faculty member', error });
    }
});

module.exports = router;


