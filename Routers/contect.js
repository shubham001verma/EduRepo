const express = require('express');
const router = express.Router();
const Contact = require('../models/contect');

// POST route to submit contact form data
router.post('/postuser', async (req, res) => {
  try {
    const { name, email, phone, preferredTime, message } = req.body;

    // Create new contact entry in the database
    const newContact = new Contact({
      name,
      email,
      phone,
      preferredTime,
      message,
    });

    await newContact.save(); // Save the contact form data to the database
    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit the contact form' });
  }
});
// GET route to fetch all contacts
router.get('/getuser', async (req, res) => {
    try {
      const contacts = await Contact.find(); // Get all contacts
      res.status(200).json(contacts);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  });
  // GET route to get the total number of registered students
router.get('/usercount', async (req, res) => {
    try {
      const totalStudents = await Contact.countDocuments(); // Count all students in the database
      res.status(200).json({ totalStudents });
    } catch (err) {
      res.status(500).json({ error: 'Failed to get total students count' });
    }
  });
  
// GET route to fetch a contact by ID
router.get('/getsingleuser/:id', async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id); // Find contact by ID
      if (!contact) return res.status(404).json({ error: 'Contact not found' });
  
      res.status(200).json(contact);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch the contact' });
    }
  });
  // DELETE route to delete a contact
router.delete('/deleteuser/:id', async (req, res) => {
    try {
      const deletedContact = await Contact.findByIdAndDelete(req.params.id); // Delete contact by ID
      if (!deletedContact) return res.status(404).json({ error: 'Contact not found' });
  
      res.status(200).json({ message: 'Contact deleted successfully!' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete the contact' });
    }
  });
  // PUT route to update a contact
router.put('/updateuser/:id', async (req, res) => {
    try {
      const { name, email, phone, preferredTime, message } = req.body;
  
      // Find the contact by ID and update it
      const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        { name, email, phone, preferredTime, message },
        { new: true } // This option returns the updated document
      );
  
      if (!updatedContact) return res.status(404).json({ error: 'Contact not found' });
  
      res.status(200).json({ message: 'Contact updated successfully!', contact: updatedContact });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update the contact' });
    }
  });
  
  
module.exports = router;
