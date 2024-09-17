const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../config/db'); // Ensure this path is correct
const bcrypt = require('bcryptjs');

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ msg: 'Please provide all required fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'User already exists' });

        const user = new User({
            name,
            email,
            password,  // This will be hashed in the User model
            role
        });

        await user.save();

        const token = generateToken(user._id, user.role);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login Attempt:', { email, password });

        const user = await User.findOne({ email });
        console.log('User Found:', user);

        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password); // Compare with the plain password
        console.log('Password Match:', isMatch);

        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = generateToken(user._id, user.role);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;
