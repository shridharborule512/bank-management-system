import React, { useState } from 'react';
import UserService from '../services/UserService';

function Register() {
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        role: 'USER'
    });
    const [message, setMessage]   = useState('');
    const [error, setError]       = useState('');
    const [loading, setLoading]   = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        UserService.register(user)
            .then(res => {
                setMessage('✅ Registration successful! You can now login.');
                setUser({ fullName: '', email: '', password: '', phone: '', role: 'USER' });
                setLoading(false);
            })
            .catch(err => {
                setError('❌ ' + (err.response?.data || 'Registration failed!'));
                setLoading(false);
            });
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>

                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.icon}>🏦</h1>
                    <h2 style={styles.title}>Create Account</h2>
                    <p style={styles.subtitle}>Join Bank Management System</p>
                </div>

                {/* Messages */}
                {message && <div style={styles.success}>{message}</div>}
                {error   && <div style={styles.error}>{error}</div>}

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>

                    <div style={styles.field}>
                        <label style={styles.label}>Full Name</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="fullName"
                            value={user.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            style={styles.input}
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Password</label>
                        <input
                            style={styles.input}
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Phone Number</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            required
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Role</label>
                        <select
                            style={styles.input}
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        style={loading ? styles.btnDisabled : styles.btn}
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                </form>

                {/* Login Link */}
                <p style={styles.loginLink}>
                    Already have an account?{' '}
                    <a href="/login" style={styles.link}>Login here</a>
                </p>

            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        backgroundColor: '#f0f4ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '40px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    },
    header: { textAlign: 'center', marginBottom: '25px' },
    icon:   { fontSize: '40px', margin: '0 0 10px 0' },
    title:  { color: '#1F4E79', margin: '0 0 5px 0', fontSize: '24px' },
    subtitle: { color: '#666', margin: 0, fontSize: '14px' },
    success: {
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '12px',
        borderRadius: '6px',
        marginBottom: '15px',
        fontSize: '14px'
    },
    error: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '12px',
        borderRadius: '6px',
        marginBottom: '15px',
        fontSize: '14px'
    },
    form:  { display: 'flex', flexDirection: 'column', gap: '15px' },
    field: { display: 'flex', flexDirection: 'column', gap: '5px' },
    label: { fontSize: '13px', fontWeight: 'bold', color: '#333' },
    input: {
        padding: '11px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '14px',
        outline: 'none'
    },
    btn: {
        backgroundColor: '#1F4E79',
        color: 'white',
        padding: '13px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '15px',
        cursor: 'pointer',
        marginTop: '5px'
    },
    btnDisabled: {
        backgroundColor: '#aaa',
        color: 'white',
        padding: '13px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '15px',
        cursor: 'not-allowed',
        marginTop: '5px'
    },
    loginLink: { textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#555' },
    link: { color: '#1F4E79', fontWeight: 'bold', textDecoration: 'none' }
};

export default Register;