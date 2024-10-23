// index.js (or app.js)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');
const facultyRoutes = require('./Routers/facultyRoutes');
const contactRoutes = require('./Routers/contect');
const courseRoutes = require('./Routers/courseRoutes');
const notificationRoutes = require('./Routers/notificationRoute');
const adminRoute = require("./Routers/adminRoute")
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Eduweb');

// Use faculty routes
app.use('/faculty', facultyRoutes);
app.use('/contact', contactRoutes);
app.use('/courses', courseRoutes); 
app.use('/notification', notificationRoutes); 
app.use('/admin',adminRoute) 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use("/uploads",express.static("uploads"));