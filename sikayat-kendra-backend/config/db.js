const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/sikayat-kendra', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

// Function to generate JWT token
const generateToken = (id, role) => {
    const payload = {
        id,
        role
    };

    // Use secret from environment variables
    const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Ensure this is set in your environment

    // Token expiration
    const expiresIn = '1h'; // Adjust as needed

    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
};

module.exports = { connectDB, generateToken };
