const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:5006', // Allow requests from this origin
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/discussionForum', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});

// Define a Mongoose schema for the messages
const messageSchema = new mongoose.Schema({
    user: String,
    content: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create a Mongoose model based on the schema
const Message = mongoose.model('Message', messageSchema);

app.use(cors());
app.use(express.json());

io.on('connection', async (socket) => {
    console.log('a user connected');

    try {
        // Retrieve previous messages from MongoDB
        const messages = await Message.find({}).sort({ timestamp: 1 }).exec();
        socket.emit('previousMessages', messages);
    } catch (err) {
        console.error(err);
    }

    // Listen for new messages
    socket.on('message', async (messageData) => {
        try {
            const newMessage = new Message(messageData);
            await newMessage.save(); // Save the message to MongoDB
            io.emit('message', messageData); // Broadcast the new message to all clients
        } catch (err) {
            console.error(err);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start the server
const PORT = 5006;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
