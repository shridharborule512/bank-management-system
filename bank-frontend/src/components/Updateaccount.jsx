import React, { useState, useEffect } from 'react';
import AccountService from '../services/AccountService';

function UpdateAccount() {

    const [searchId, setSearchId] = useState('');
    const [account, setAccount] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // ── Search Account by ID ──
    const handleSearch = () => {
        if (!searchId) {
            setError('Please enter an Account ID');
            return;
        }
        AccountService.getAccountById(searchId)
            .then(res => {
                setAccount(res.data);
                setError('');
                setMessage('');
            })
            .catch(err => {
                setError('❌ Account not found with ID: ' + searchId);
                setAccount(null);
            });
    };

    // ── Handle Input Change ──
    const handleChange = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    };

    // ── Submit Update ──
    const handleSubmit = (e) => {
        e.preventDefault();
        AccountService.updateAccount(account.id, account)
            .then(res => {
                setMessage('✅ Account updated successfully!');
                setError('');
            })
            .catch(err => {
                setError('❌ Error updating account. Please try again.');
            });
    };

    // ── Reset Form ──
    const handleReset = () => {
        setAccount(null);
        setSearchId('');
        setMessage('');
        setError('');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Update Account</h2>

            {/* ── Search Box ── */}
            <div style={styles.searchBox}>
                <input
                    style={styles.searchInput}
                    type="number"
                    placeholder="Enter Account ID to search..."
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <button style={styles.searchBtn} onClick={handleSearch}>
                    Search
                </button>
                {account && (
                    <button style={styles.resetBtn} onClick={handleReset}>
                        Reset
                    </button>
                )}
            </div>

            {/* ── Error Message ── */}
            {error && <p style={styles.error}>{error}</p>}

            {/* ── Success Message ── */}
            {message && <p style={styles.success}>{message}</p>}

            {/* ── Update Form (shows only after search) ── */}
            {account && (
                <form onSubmit={handleSubmit} style={styles.form}>

                    {/* Read Only Fields */}
                    <div style={styles.readOnlyBox}>
                        <p style={styles.readOnlyText}>
                            <strong>Account ID:</strong> {account.id}
                        </p>
                        <p style={styles.readOnlyText}>
                            <strong>Account Number:</strong> {account.accountNumber}
                        </p>
                    </div>

                    {/* Editable Fields */}
                    <div style={styles.field}>
                        <label style={styles.label}>Full Name</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="name"
                            value={account.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter full name"
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Age</label>
                        <input
                            style={styles.input}
                            type="number"
                            name="age"
                            value={account.age}
                            onChange={handleChange}
                            required
                            placeholder="Enter age"
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Account Type</label>
                        <select
                            style={styles.input}
                            name="accountType"
                            value={account.accountType}
                            onChange={handleChange}
                        >
                            <option value="SAVINGS">SAVINGS</option>
                            <option value="CURRENT">CURRENT</option>
                        </select>
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Balance (₹)</label>
                        <input
                            style={styles.input}
                            type="number"
                            name="balance"
                            value={account.balance}
                            onChange={handleChange}
                            required
                            placeholder="Enter balance"
                        />
                    </div>

                    <button type="submit" style={styles.updateBtn}>
                        Update Account
                    </button>

                </form>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '30px',
        maxWidth: '550px',
        margin: '0 auto'
    },
    heading: {
        color: '#1F4E79',
        marginBottom: '25px'
    },
    searchBox: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px'
    },
    searchInput: {
        flex: 1,
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '14px'
    },
    searchBtn: {
        backgroundColor: '#1F4E79',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    resetBtn: {
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    error: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '10px 15px',
        borderRadius: '5px',
        marginBottom: '15px'
    },
    success: {
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '10px 15px',
        borderRadius: '5px',
        marginBottom: '15px'
    },
    readOnlyBox: {
        backgroundColor: '#f0f4ff',
        padding: '12px 15px',
        borderRadius: '5px',
        marginBottom: '15px',
        border: '1px solid #d0d9f0'
    },
    readOnlyText: {
        margin: '4px 0',
        fontSize: '14px',
        color: '#333'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
    },
    label: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: '14px'
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '14px'
    },
    updateBtn: {
        backgroundColor: '#2E75B6',
        color: 'white',
        padding: '12px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '15px',
        cursor: 'pointer',
        marginTop: '5px'
    }
};

export default UpdateAccount;