const mongoose = require('mongoose'); // Import mongoose

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/myapp');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
    }
};

module.exports = dbConnect; // Export the function
