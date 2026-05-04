import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserService from '../services/UserService';

function AdminUserList() {
    const [users,   setUsers]   = useState([]);
    const [loading, setLoading] = useState(true);

    const authHeader = {
        headers: { Authorization: `Bearer ${UserService.getToken()}` }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        axios.get('http://localhost:8081/api/user/all', authHeader)
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this user?')) {
            axios.delete(`http://localhost:8081/api/user/delete/${id}`, authHeader)
                .then(() => {
                    alert('User deleted!');
                    loadUsers();
                });
        }
    };

    if (loading) return (
        <h3 style={{ textAlign: 'center', marginTop: '60px' }}>
            Loading users...
        </h3>
    );

    return (
        <div style={styles.page}>
            <h2 style={styles.heading}>👥 All Users (Admin View)</h2>
            <div style={styles.tableBox}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.headerRow}>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Full Name</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Phone</th>
                            <th style={styles.th}>Role</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr key={user.id}
                                style={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                                <td style={styles.td}>{user.id}</td>
                                <td style={styles.td}>{user.fullName}</td>
                                <td style={styles.td}>{user.email}</td>
                                <td style={styles.td}>{user.phone}</td>
                                <td style={styles.td}>
                                    <span style={
                                        user.role === 'ADMIN'
                                            ? styles.adminBadge
                                            : styles.userBadge
                                    }>
                                        {user.role}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    <button
                                        style={styles.deleteBtn}
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <a href="/" style={styles.back}>← Back to Dashboard</a>
        </div>
    );
}

const styles = {
    page:       { padding: '25px', backgroundColor: '#f5f7ff', minHeight: '100vh' },
    heading:    { color: '#1F4E79', marginBottom: '20px' },
    tableBox:   { backgroundColor: 'white', borderRadius: '10px', overflow: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
    table:      { width: '100%', borderCollapse: 'collapse' },
    headerRow:  { backgroundColor: '#1F4E79', color: 'white' },
    th:         { padding: '12px 15px', textAlign: 'left', fontSize: '13px' },
    td:         { padding: '10px 15px', fontSize: '13px', borderBottom: '1px solid #eee' },
    rowEven:    { backgroundColor: '#ffffff' },
    rowOdd:     { backgroundColor: '#f9f9f9' },
    adminBadge: { backgroundColor: '#fff3cd', color: '#856404', padding: '3px 8px', borderRadius: '4px', fontSize: '11px' },
    userBadge:  { backgroundColor: '#cce5ff', color: '#004085', padding: '3px 8px', borderRadius: '4px', fontSize: '11px' },
    deleteBtn:  { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer' },
    back:       { display: 'block', marginTop: '20px', color: '#1F4E79', textDecoration: 'none', fontSize: '14px' }
};

export default AdminUserList;