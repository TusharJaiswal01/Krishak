const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const auth = require('../middleware/auth'); // Adjust path as needed

// Create a new complaint (Authenticated users only)
router.post('/', auth(), async (req, res) => {
    try {
        const { farmerName, location, mobileNumber, email, complaint } = req.body;

        // Validate required fields
        if (!farmerName || !location || !mobileNumber || !email || !complaint) {
            return res.status(400).json({ msg: 'Please provide all required fields' });
        }

        // Create and save new complaint
        const newComplaint = new Complaint({
            farmerName,
            location,
            mobileNumber,
            email,
            complaint
        });

        const savedComplaint = await newComplaint.save();
        res.status(201).json(savedComplaint); // Set status 201 for resource creation
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Get all complaints (Admin only)
router.get('/', auth('admin'), async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Update complaint status and solution (Admin only)
router.put('/:id', auth('admin'), async (req, res) => {
    try {
        const { status, solution } = req.body;

        // Log the incoming request data
        console.log('Update request:', { id: req.params.id, status, solution });

        // Find and update the complaint
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });

        complaint.status = status || complaint.status;
        complaint.solution = solution || complaint.solution;

        const updatedComplaint = await complaint.save();
        res.json(updatedComplaint);
    } catch (err) {
        console.error('Error updating complaint:', err);
        res.status(500).json({ msg: err.message });
    }
});

// Delete a complaint (Admin only)
router.delete('/:id', auth('admin'), async (req, res) => {
    try {
        // Find the complaint by ID and delete it
        const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id);

        if (!deletedComplaint) {
            return res.status(404).json({ msg: 'Complaint not found' });
        }

        res.json({ msg: 'Complaint deleted successfully' });
    } catch (err) {
        console.error('Error deleting complaint:', err);
        res.status(500).json({ msg: err.message });
    }
});

// Get complaints by user (Authenticated users only)
router.get('/user/:email', auth(), async (req, res) => {
    try {
        const complaints = await Complaint.find({ email: req.params.email });
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;
