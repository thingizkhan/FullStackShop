import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        document.cookie = `admin=${formData.password}; path=/`; // Set the admin_key cookie to the password
        navigate('/admin');
        window.location.href = '/admin';
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default AdminLogin;
