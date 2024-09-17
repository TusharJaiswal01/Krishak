import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const DiscussionChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        socket.on('previousMessages', (messages) => {
            setMessages(messages);
        });

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('previousMessages');
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        if (input.trim() !== '') {
            const messageData = {
                username: username,
                message: input,
            };

            socket.emit('message', messageData);
            setInput(''); // Clear input field
        }
    };

    const handleLogin = () => {
        if (username.trim() !== '') {
            setLoggedIn(true);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {!loggedIn ? (
                <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Enter Your Username</h2>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username..."
                    />
                    <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
                        onClick={handleLogin}
                    >
                        Join Chat
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-3xl p-4 bg-white shadow-lg rounded-lg">
                    <div className="chat-window h-96 overflow-y-auto p-4 border-b border-gray-200">
                        {messages.map((msg, index) => (
                            <div key={index} className="mb-2">
                                <strong className="text-blue-600">{msg.username}: </strong>
                                <span>{msg.message}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex">
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
                            onClick={sendMessage}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiscussionChat;
