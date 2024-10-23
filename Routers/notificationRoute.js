const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');

// Route to add a new notification
router.post('/addnoty', async (req, res) => {
  const { title, date, message } = req.body;

  // Validate request body
  if (!title || !date || !message) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    // Create a new notification
    const newNotification = new Notification({
      title,
      date,
      message
    });

    // Save the notification to the database
    const savedNotification = await newNotification.save();

    // Send success response
    res.status(201).json(savedNotification);
  } catch (error) {
    // Handle error
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Route to count total notifications
router.get('/countnoty', async (req, res) => {
  try {
    const totalNoty = await Notification.countDocuments(); // Assuming you are using Mongoose
    res.json({ totalNoty });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/job-notifications', async (req, res) => {
    try {
      const notifications = await Notification.find({ title: /job/i }).sort({ createdAt: -1 }); // Regex to match "job" in the title
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  });
  router.get('/latest-notifications', async (req, res) => {
    try {
      const latestNotifications = await Notification.find({ title: /latest/i }).sort({ createdAt: -1 }); // Limit to 5 latest notifications
      res.status(200).json(latestNotifications);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  });
// Route to fetch all notifications
router.get('/getallnoty', async (req, res) => {
  try {
    // Fetch all notifications
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Route to fetch a single notification by ID
router.get('/getsinglenoty/:id', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json(notification); // Send the found notification
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Route to delete a notification by ID
router.delete('/deletenoty/:id', async (req, res) => {
  try {
    // Find the notification by ID and delete it
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Route to update a notification by ID
router.put('/updatenoty/:id', async (req, res) => {
  const { title, date, message } = req.body;

  // Validate request body
  if (!title || !date || !message) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    // Find the notification by ID and update it
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      { title, date, message },
      { new: true, runValidators: true } // Options to return the updated document and run validation
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json(updatedNotification); // Send the updated notification
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = router;

