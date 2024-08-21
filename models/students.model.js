const mongoose = require('mongoose');

// Define the schema for notes
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    file: {
        type: String, // Assuming the PDF file is stored as a path or URL
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    visibility: {
        type: String,
        enum: ['everyone', 'batch'],
        required: true
    },
    batch: {
        type: String, // Store batch details like "2024", "2025", etc.
        required: function() {
            return this.visibility === 'batch';
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Define the schema for users
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    batch: {
        type: String, // Store batch details like "2024", "2025", etc.
        required: true
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }]
});

// Create models from the schemas
const Note = mongoose.model('Note', noteSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Note, User };
