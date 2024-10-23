// models/Faculty.js
const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    email: {
        type: String,
   
        unique: true
    },
    phoneNumber: {
        type: String,
        
    },
    department: {
        type: String,
        
    },
    qualifications: {
        type: String,
        
    },
    experience: {
        type: Number,
     
    },
    details:{

        type: String,
        default: 'No details provided'
    },
    facultyImage: {
        type: String // Store the image URL or path
    }
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
