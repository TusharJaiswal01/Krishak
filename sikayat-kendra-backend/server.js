// const express = require('express');
// const { connectDB } = require('./config/db');
// const cors = require('cors');
// require('dotenv').config(); // Add this at the top of your main file
// const cors = require('cors');
// app.use(cors({ origin: 'http://localhost:3000' }));

// // Connect to database

// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/complaints', require('./routes/complaints'));
// app.use('/api/users', require('./routes/users'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const { connectDB } = require('./config/db');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();

// Connect to the database
connectDB();

// Use CORS to allow requests from any origin
app.use(cors({ origin: '*' }));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
