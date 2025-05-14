import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageUsers.css'; // Make sure to create this CSS file for custom styles

const ManageUsers = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [error, setError] = useState(null);

    // Use effect to fetch pending users when component mounts
    useEffect(() => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (token) {
            // Make an API call with token in Authorization header
            axios.get('https://localhost:7009/api/admin/pending-users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': '*/*'
                }
            })
            .then(response => {
                setPendingUsers(response.data);
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 401) {
                        setError("Unauthorized access. Please log in.");
                    } else {
                        setError("Error fetching pending users");
                    }
                } else {
                    setError("Network error. Please try again.");
                }
            });
        } else {
            setError("No token found. Please log in.");
        }
    }, []);

    const approveUser = (userId) => {
        const token = localStorage.getItem('token'); // Retrieve token
        if (token) {
            axios.post(`https://localhost:7009/api/admin/approve-user/${userId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': '*/*'
                }
            })
            .then(() => {
                // Remove approved user from pending list
                setPendingUsers(pendingUsers.filter(user => user.userId !== userId));
            })
            .catch(error => {
                setError('Error approving user');
                console.error(error);
            });
        }
    };

    const rejectUser = (userId) => {
        const token = localStorage.getItem('token'); // Retrieve token
        if (token) {
            axios.post(`https://localhost:7009/api/admin/reject-user/${userId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': '*/*'
                }
            })
            .then(() => {
                // Remove rejected user from pending list
                setPendingUsers(pendingUsers.filter(user => user.userId !== userId));
            })
            .catch(error => {
                setError('Error rejecting user');
                console.error(error);
            });
        }
    };

    return (
        <div className="container">
            <h2 className="text-uppercase fw-bold text-dark text-center"
          style={{
            fontSize: "2.5rem",
            letterSpacing: "1px",
            borderBottom: "3px solid #dc3545",
            paddingBottom: "10px",
          }}>Manage Users</h2>
            {error && <p className="error">{error}</p>}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingUsers.map(user => (
                        <tr key={user.userId}>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="approve-btn" onClick={() => approveUser(user.userId)}>Approve</button>
                                <button className="reject-btn" onClick={() => rejectUser(user.userId)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
