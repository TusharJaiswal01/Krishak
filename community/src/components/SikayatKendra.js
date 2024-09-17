import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SikayatKendra = () => {
    const [view, setView] = useState('signup'); // 'signup', 'login', or 'main'
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [complaint, setComplaint] = useState('');
    const [contactDetails, setContactDetails] = useState({ name: '', location: '', mobile: '', email: '' });
    const [complaintsList, setComplaintsList] = useState([]);

    // Fetch complaints for admin view
    useEffect(() => {
        const fetchComplaints = async () => {
            if (isAuthenticated && isAdmin) {
                try {
                    const response = await axios.get('http://localhost:5004/api/complaints', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });
                    setComplaintsList(response.data);
                } catch (error) {
                    console.error('Failed to fetch complaints:', error.response?.data?.message || error.message);
                }
            }
        };
        fetchComplaints();
    }, [isAuthenticated, isAdmin]);

    // Signup handler
    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, role } = e.target.elements;

        try {
            const response = await axios.post('http://localhost:5004/api/users/register', {
                name: name.value,
                email: email.value,
                password: password.value,
                role: role.value
            });
            localStorage.setItem('token', response.data.token);
            setView('login');
        } catch (error) {
            console.error('Signup failed:', error.response?.data?.message || error.message);
            alert('Signup failed: ' + (error.response?.data?.message || error.message));
        }
    };

    // Login handler
    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;

        try {
            const response = await axios.post('http://localhost:5004/api/users/login', {
                email: email.value,
                password: password.value
            });
            localStorage.setItem('token', response.data.token);
            // Decode token to set user role
            const payload = JSON.parse(atob(response.data.token.split('.')[1]));
            setIsAuthenticated(true);
            setIsAdmin(payload.role === 'admin');
            setView('main');
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
            alert('Login failed: ' + (error.response?.data?.message || error.message));
        }
    };

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setIsAdmin(false);
        setView('signup');
    };

    // Handle complaint change
    const handleComplaintChange = (e) => {
        setComplaint(e.target.value);
    };

    // Handle contact details change
    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    // Submit complaint handler
    const handleSubmitComplaint = async (e) => {
        e.preventDefault();
        if (complaint && contactDetails.name && contactDetails.location && contactDetails.mobile && contactDetails.email) {
            try {
                const token = localStorage.getItem('token');
                await axios.post('http://localhost:5004/api/complaints', {
                    farmerName: contactDetails.name,
                    location: contactDetails.location,
                    mobileNumber: contactDetails.mobile,
                    email: contactDetails.email,
                    complaint: complaint
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setComplaint('');
                setContactDetails({ name: '', location: '', mobile: '', email: '' });
                alert('Complaint submitted successfully!');
            } catch (error) {
                console.error('Error submitting complaint:', error.response?.data?.message || error.message);
                alert('Failed to submit complaint: ' + (error.response?.data?.message || error.message));
            }
        } else {
            alert('Please fill in all fields.');
        }
    };

    // Resolve complaint handler
    const handleResolve = async (id) => {
        try {
            await axios.put(`http://localhost:5004/api/complaints/${id}`, {
                status: 'Solved',
                solution: 'Resolved by admin'
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setComplaintsList(complaintsList.map(comp =>
                comp._id === id ? { ...comp, status: 'Solved' } : comp
            ));
        } catch (error) {
            console.error('Failed to resolve complaint:', error.response?.data?.message || error.message);
            alert('Failed to resolve complaint: ' + (error.response?.data?.message || error.message));
        }
    };

    // Delete complaint handler
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5004/api/complaints/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setComplaintsList(complaintsList.filter(comp => comp._id !== id));
        } catch (error) {
            console.error('Failed to delete complaint:', error.response?.data?.message || error.message);
            alert('Failed to delete complaint: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <main className="bg-gray-100 p-6">
            <section className="container mx-auto">
                <h1 className="text-3xl font-bold mb-6">Sikayat Kendra</h1>

                {view === 'signup' && (
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                        <form onSubmit={handleSignup}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                                required
                            />
                            <select
                                name="role"
                                className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                                required
                            >
                                <option value="" disabled>Select Role</option>
                                <option value="farmer">Farmer</option>
                                <option value="admin">Admin</option>
                            </select>
                            <button
                                type="submit"
                                className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
                            >
                                Sign Up
                            </button>
                        </form>
                        <p className="mt-4">Already have an account? <button onClick={() => setView('login')} className="text-blue-500">Login</button></p>
                    </div>
                )}

                {view === 'login' && (
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Login</h2>
                        <form onSubmit={handleLogin}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
                            >
                                Login
                            </button>
                        </form>
                        <p className="mt-4">Don't have an account? <button onClick={() => setView('signup')} className="text-blue-500">Sign Up</button></p>
                    </div>
                )}

                {view === 'main' && (
                    <>
                        <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-3 rounded-lg mb-6">Logout</button>

                        {isAdmin ? (
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4">Complaints</h2>
                                <ul>
                                    {complaintsList.map(comp => (
                                        <li key={comp._id} className="border-b border-gray-300 pb-4 mb-4">
                                            <p><strong>Farmer Name:</strong> {comp.farmerName}</p>
                                            <p><strong>Complaint:</strong> {comp.complaint}</p>
                                            <p><strong>Status:</strong> {comp.status}</p>
                                            <button
                                                onClick={() => handleResolve(comp._id)}
                                                className="bg-green-500 text-white px-4 py-2 rounded-lg mr-4"
                                                disabled={comp.status === 'Solved'}
                                            >
                                                Mark as Solved
                                            </button>
                                            <button
                                                onClick={() => handleDelete(comp._id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (



                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <div className='flex justify-between'>
                                    <h2 className="text-2xl font-semibold mb-4">Submit a Complaint</h2>
                                    <div>If You are not getting response in two working days Contact :
                                        +91 xxxxxxxxxx </div>
                                </div>


                                <form onSubmit={handleSubmitComplaint}>
                                    <textarea
                                        value={complaint}
                                        onChange={handleComplaintChange}
                                        placeholder="Describe your complaint"
                                        className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="name"
                                        value={contactDetails.name}
                                        onChange={handleContactChange}
                                        placeholder="Your Name"
                                        className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="location"
                                        value={contactDetails.location}
                                        onChange={handleContactChange}
                                        placeholder="Your Location"
                                        className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={contactDetails.mobile}
                                        onChange={handleContactChange}
                                        placeholder="Your Mobile Number"
                                        className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={contactDetails.email}
                                        onChange={handleContactChange}
                                        placeholder="Your Email"
                                        className="w-full p-4 border border-gray-300 rounded-lg mb-4"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
                                    >
                                        Submit Complaint
                                    </button>
                                </form>
                            </div>
                        )}
                    </>
                )}
            </section>
        </main>
    );
};

export default SikayatKendra;
