import React, { useState } from 'react';
import AccountService from '../services/AccountService';

function CreateAccount() {
    const [account, setAccount] = useState({
        name: '', age: '', accountType: 'SAVINGS', balance: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        AccountService.createAccount(account)
            .then(res => {
                setMessage(`✅ Account created! Account No: ${res.data.accountNumber}`);
                setAccount({ name: '', age: '', accountType: 'SAVINGS', balance: '' });
            })
            .catch(err => {
                setMessage('❌ Error creating account. Please try again.');
            });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Create New Account</h2>
            {message && <p style={styles.message}>{message}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.field}>
                    <label style={styles.label}>Full Name</label>
                    <input style={styles.input} type="text" name="name"
                        value={account.name} onChange={handleChange} required placeholder="Enter full name"/>
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Age</label>
                    <input style={styles.input} type="number" name="age"
                        value={account.age} onChange={handleChange} required placeholder="Enter age"/>
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Account Type</label>
                    <select style={styles.input} name="accountType"
                        value={account.accountType} onChange={handleChange}>
                        <option value="SAVINGS">SAVINGS</option>
                        <option value="CURRENT">CURRENT</option>
                    </select>
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Initial Balance (₹)</label>
                    <input style={styles.input} type="number" name="balance"
                        value={account.balance} onChange={handleChange} required placeholder="Enter initial balance"/>
                </div>
                <button type="submit" style={styles.btn}>Create Account</button>
            </form>
        </div>
    );
}

const styles = {
    container: { padding: '30px', maxWidth: '500px', margin: '0 auto' },
    heading: { color: '#1F4E79', marginBottom: '20px' },
    message: { padding: '10px', backgroundColor: '#d4edda', borderRadius: '5px', color: '#155724' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    field: { display: 'flex', flexDirection: 'column', gap: '5px' },
    label: { fontWeight: 'bold', color: '#333', fontSize: '14px' },
    input: { padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '14px' },
    btn: { backgroundColor: '#1F4E79', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', fontSize: '15px', cursor: 'pointer' }
};

export default CreateAccount;