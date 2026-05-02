import React, { useEffect, useState } from 'react';
import AccountService from '../services/AccountService';

function AccountList() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAccounts();
    }, []);

    const loadAccounts = () => {
        AccountService.getAllAccounts()
            .then(res => {
                setAccounts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading accounts:", err);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this account?")) {
            AccountService.deleteAccount(id)
                .then(() => {
                    alert("Account deleted successfully!");
                    loadAccounts();
                })
                .catch(err => console.error("Error deleting:", err));
        }
    };

    if (loading) return <h3 style={{ textAlign: 'center', marginTop: '50px' }}>Loading accounts...</h3>;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>All Accounts</h2>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.headerRow}>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Age</th>
                        <th style={styles.th}>Account No</th>
                        <th style={styles.th}>Type</th>
                        <th style={styles.th}>Balance (₹)</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((acc, index) => (
                        <tr key={acc.id} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                            <td style={styles.td}>{acc.id}</td>
                            <td style={styles.td}>{acc.name}</td>
                            <td style={styles.td}>{acc.age}</td>
                            <td style={styles.td}>{acc.accountNumber}</td>
                            <td style={styles.td}>
                                <span style={acc.accountType === 'SAVINGS' ? styles.savings : styles.current}>
                                    {acc.accountType}
                                </span>
                            </td>
                            <td style={styles.td}>₹{acc.balance.toLocaleString()}</td>
                            <td style={styles.td}>
                                <button
                                    style={styles.deleteBtn}
                                    onClick={() => handleDelete(acc.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    container: { padding: '30px' },
    heading: { color: '#1F4E79', marginBottom: '20px' },
    table: { width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
    headerRow: { backgroundColor: '#1F4E79', color: 'white' },
    th: { padding: '12px 15px', textAlign: 'left', fontSize: '14px' },
    td: { padding: '10px 15px', fontSize: '14px', borderBottom: '1px solid #eee' },
    rowEven: { backgroundColor: '#ffffff' },
    rowOdd: { backgroundColor: '#f5f8ff' },
    savings: { backgroundColor: '#d4edda', color: '#155724', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' },
    current: { backgroundColor: '#cce5ff', color: '#004085', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' },
    deleteBtn: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer' }
};

export default AccountList;