import React, { useState } from 'react';
import UserService from '../services/UserService';

function Login() {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [error, setError]         = useState('');
    const [loading, setLoading]     = useState(false);

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        UserService.login(loginData)
            .then(res => {
                // Save token + user info
                UserService.saveToken(res.data.token);
                UserService.saveUser({
                    fullName: res.data.fullName,
                    email:    res.data.email,
                    role:     res.data.role
                });
                // Redirect to dashboard
                window.location.href = '/';
            })
            .catch(err => {
                setError('❌ ' + (err.response?.data || 'Invalid email or password!'));
                setLoading(false);
            });
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>

                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.icon}>🏦</h1>
                    <h2 style={styles.title}>Welcome Back!</h2>
                    <p style={styles.subtitle}>Login to Bank Management System</p>
                </div>

                {/* Error */}
                {error && <div style={styles.error}>{error}</div>}

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>

                    <div style={styles.field}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            style={styles.input}
                            type="email"
                            name="email"
                            value={loginData.email}
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
                            value={loginData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={loading ? styles.btnDisabled : styles.btn}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                </form>

                {/* Register Link */}
                <p style={styles.registerLink}>
                    Don't have an account?{' '}
                    <a href="/register" style={styles.link}>Register here</a>
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
        justifyContent: 'center'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '40px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    },
    header:   { textAlign: 'center', marginBottom: '25px' },
    icon:     { fontSize: '40px', margin: '0 0 10px 0' },
    title:    { color: '#1F4E79', margin: '0 0 5px 0', fontSize: '24px' },
    subtitle: { color: '#666', margin: 0, fontSize: '14px' },
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
        fontSize: '14px'
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
    registerLink: { textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#555' },
    link: { color: '#1F4E79', fontWeight: 'bold', textDecoration: 'none' }
};

export default Login;