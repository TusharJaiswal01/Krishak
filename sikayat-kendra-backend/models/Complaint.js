const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    farmerName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^([\w-]+(?:\.[\w-]+)*@([\w-]+\.)+[A-Z|a-z]{2,})$/.test(v); // Basic email regex
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    complaint: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Solved'] // Ensure only allowed statuses
    },
    solution: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Indexes for faster queries
ComplaintSchema.index({ status: 1 });
ComplaintSchema.index({ email: 1 });

module.exports = mongoose.model('Complaint', ComplaintSchema);
