import React, { useState } from 'react';
import TransactionService from '../services/TransactionService';

function Deposit() {
    const [form,    setForm]    = useState({ accountNumber: '', amount: '' });
    const [result,  setResult]  = useState(null);
    const [error,   setError]   = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        TransactionService.deposit(form)
            .then(res => {
                setResult(res.data);
                setForm({ accountNumber: '', amount: '' });
                setLoading(false);
            })
            .catch(err => {
                setError('❌ ' + (err.response?.data || 'Deposit failed!'));
                setLoading(false);
            });
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h1 style={styles.icon}>💰</h1>
                    <h2 style={styles.title}>Deposit Money</h2>
                    <p style={styles.subtitle}>Add funds to an account</p>
                </div>

                {error  && <div style={styles.error}>{error}</div>}

                {result && (
                    <div style={styles.successBox}>
                        <h4 style={{ margin: '0 0 8px 0', color: '#155724' }}>
                            ✅ Deposit Successful!
                        </h4>
                        <p style={styles.resultText}>
                            Account: <strong>{result.accountNumber}</strong>
                        </p>
                        <p style={styles.resultText}>
                            Amount Deposited: <strong>₹{result.amount}</strong>
                        </p>
                        <p style={styles.resultText}>
                            New Balance: <strong>₹{result.balanceAfter}</strong>
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.field}>
                        <label style={styles.label}>Account Number</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="accountNumber"
                            value={form.accountNumber}
                            onChange={handleChange}
                            placeholder="e.g. ACC100001"
                            required
                        />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Amount (₹)</label>
                        <input
                            style={styles.input}
                            type="number"
                            name="amount"
                            value={form.amount}
                            onChange={handleChange}
                            placeholder="Enter amount"
                            min="1"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={loading ? styles.btnDisabled : styles.btn}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : '💰 Deposit'}
                    </button>
                </form>

                <a href="/" style={styles.back}>← Back to Dashboard</a>
            </div>
        </div>
    );
}

const styles = {
    page:       { minHeight: '100vh', backgroundColor: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
    card:       { backgroundColor: 'white', borderRadius: '12px', padding: '40px', width: '100%', maxWidth: '440px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
    header:     { textAlign: 'center', marginBottom: '25px' },
    icon:       { fontSize: '40px', margin: '0 0 10px 0' },
    title:      { color: '#1F4E79', margin: '0 0 5px 0' },
    subtitle:   { color: '#666', margin: 0, fontSize: '14px' },
    error:      { backgroundColor: '#f8d7da', color: '#721c24', padding: '12px', borderRadius: '6px', marginBottom: '15px', fontSize: '14px' },
    successBox: { backgroundColor: '#d4edda', padding: '15px', borderRadius: '8px', marginBottom: '15px' },
    resultText: { margin: '4px 0', fontSize: '14px', color: '#155724' },
    form:       { display: 'flex', flexDirection: 'column', gap: '15px' },
    field:      { display: 'flex', flexDirection: 'column', gap: '5px' },
    label:      { fontSize: '13px', fontWeight: 'bold', color: '#333' },
    input:      { padding: '11px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' },
    btn:        { backgroundColor: '#28a745', color: 'white', padding: '13px', border: 'none', borderRadius: '6px', fontSize: '15px', cursor: 'pointer' },
    btnDisabled:{ backgroundColor: '#aaa', color: 'white', padding: '13px', border: 'none', borderRadius: '6px', fontSize: '15px', cursor: 'not-allowed' },
    back:       { display: 'block', textAlign: 'center', marginTop: '20px', color: '#1F4E79', textDecoration: 'none', fontSize: '14px' }
};

export default Deposit;