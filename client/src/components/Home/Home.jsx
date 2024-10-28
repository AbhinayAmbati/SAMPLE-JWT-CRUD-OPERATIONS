/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/me', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUser(response.data);
            setName(response.data.name);
            setEmail(response.data.email);
        } catch (error) {
            console.error('Error fetching user:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:5000/api/users/me', { name, email }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchUser(); 
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete('http://localhost:5000/api/users/me', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.removeItem('token');
            alert('User deleted');
            navigate('/login');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        } else {
            fetchUser();
        }
    }, []);

    return (
        <div className="container">
            <h2>User Management</h2>
            {user ? (
                <>
                    <form onSubmit={handleSubmit} className="user-form">
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Update User</button>
                    </form>
                    <button className="delete-button" onClick={handleDelete}>Delete User</button>
                    <h3>User Details</h3>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <p>No user found.</p>
            )}
        </div>
    );
};

export default Home;
