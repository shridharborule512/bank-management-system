import React, { useEffect, useState } from 'react';
import AccountService from '../services/AccountService';
import TransactionService from '../services/TransactionService';
import UserService from '../services/UserService';

function Dashboard() {
    const [accounts,     setAccounts]     = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading,      setLoading]      = useState(true);

    const user    = UserService.getLoggedInUser();
    const isAdmin = user?.role === 'ADMIN';

    useEffect(() => {
        Promise.all([
            AccountService.getAllAccounts(),
            TransactionService.getAllTransactions()
        ]).then(([accRes, txRes]) => {
            setAccounts(accRes.data);
            setTransactions(txRes.data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
    const totalSavings = accounts.filter(a => a.accountType === 'SAVINGS')
                                 .reduce((sum, a) => sum + a.balance, 0);
    const totalCurrent = accounts.filter(a => a.accountType === 'CURRENT')
                                 .reduce((sum, a) => sum + a.balance, 0);

    if (loading) return (
        <h3 style={{ textAlign: 'center', marginTop: '60px' }}>
            Loading dashboard...
        </h3>
    );

    return (
        <div style={styles.page}>

            {/* Welcome Banner */}
            <div style={styles.banner}>
                <div>
                    <h2 style={styles.welcome}>
                        Welcome back, {user?.fullName}! 👋
                    </h2>
                    <p style={styles.role}>
                        Role: <strong>{user?.role}</strong>
                    </p>
                </div>
                <div style={styles.badgeBox}>
                    <span style={isAdmin ? styles.adminBadge : styles.userBadge}>
                        {isAdmin ? '👑 ADMIN' : '👤 USER'}
                    </span>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={styles.cards}>
                <div style={{...styles.card, borderTop: '4px solid #1F4E79'}}>
                    <p style={styles.cardLabel}>Total Accounts</p>
                    <h2 style={styles.cardValue}>{accounts.length}</h2>
                </div>
                <div style={{...styles.card, borderTop: '4px solid #28a745'}}>
                    <p style={styles.cardLabel}>Total Balance</p>
                    <h2 style={styles.cardValue}>
                        ₹{totalBalance.toLocaleString()}
                    </h2>
                </div>
                <div style={{...styles.card, borderTop: '4px solid #2E75B6'}}>
                    <p style={styles.cardLabel}>Savings Balance</p>
                    <h2 style={styles.cardValue}>
                        ₹{totalSavings.toLocaleString()}
                    </h2>
                </div>
                <div style={{...styles.card, borderTop: '4px solid #fd7e14'}}>
                    <p style={styles.cardLabel}>Current Balance</p>
                    <h2 style={styles.cardValue}>
                        ₹{totalCurrent.toLocaleString()}
                    </h2>
                </div>
            </div>

            {/* Quick Actions */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Quick Actions</h3>
                <div style={styles.actions}>
                    <a href="/deposit"  style={{...styles.actionBtn, backgroundColor: '#28a745'}}>
                        💰 Deposit
                    </a>
                    <a href="/withdraw" style={{...styles.actionBtn, backgroundColor: '#dc3545'}}>
                        💸 Withdraw
                    </a>
                    <a href="/transfer" style={{...styles.actionBtn, backgroundColor: '#2E75B6'}}>
                        🔄 Transfer
                    </a>
                    <a href="/transactions" style={{...styles.actionBtn, backgroundColor: '#6f42c1'}}>
                        📋 History
                    </a>
                    {isAdmin && (
                        <>
                            <a href="/accounts" style={{...styles.actionBtn, backgroundColor: '#1F4E79'}}>
                                🏦 Accounts
                            </a>
                            <a href="/create" style={{...styles.actionBtn, backgroundColor: '#fd7e14'}}>
                                ➕ New Account
                            </a>
                            <a href="/users" style={{...styles.actionBtn, backgroundColor: '#343a40'}}>
                                👥 Users
                            </a>
                        </>
                    )}
                </div>
            </div>

            {/* Recent Transactions */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Recent Transactions</h3>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.headerRow}>
                            <th style={styles.th}>Account No</th>
                            <th style={styles.th}>Type</th>
                            <th style={styles.th}>Amount</th>
                            <th style={styles.th}>Balance After</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.slice(0, 5).map((tx, i) => (
                            <tr key={tx.id}
                                style={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                                <td style={styles.td}>{tx.accountNumber}</td>
                                <td style={styles.td}>
                                    <span style={
                                        tx.type === 'DEPOSIT'  ? styles.deposit  :
                                        tx.type === 'WITHDRAW' ? styles.withdraw :
                                        styles.transfer
                                    }>
                                        {tx.type}
                                    </span>
                                </td>
                                <td style={styles.td}>₹{tx.amount.toLocaleString()}</td>
                                <td style={styles.td}>₹{tx.balanceAfter.toLocaleString()}</td>
                                <td style={styles.td}>
                                    <span style={styles.success}>{tx.status}</span>
                                </td>
                                <td style={styles.td}>
                                    {new Date(tx.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <a href="/transactions" style={styles.viewAll}>
                    View All Transactions →
                </a>
            </div>

        </div>
    );
}

const styles = {
    page:         { padding: '25px', backgroundColor: '#f5f7ff', minHeight: '100vh' },
    banner:       { backgroundColor: '#1F4E79', borderRadius: '12px', padding: '25px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
    welcome:      { color: 'white', margin: '0 0 5px 0', fontSize: '22px' },
    role:         { color: '#90CAF9', margin: 0, fontSize: '14px' },
    badgeBox:     { display: 'flex', alignItems: 'center' },
    adminBadge:   { backgroundColor: '#fd7e14', color: 'white', padding: '8px 18px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px' },
    userBadge:    { backgroundColor: '#2E75B6', color: 'white', padding: '8px 18px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px' },
    cards:        { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '25px' },
    card:         { backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
    cardLabel:    { color: '#666', margin: '0 0 8px 0', fontSize: '13px' },
    cardValue:    { color: '#1F4E79', margin: 0, fontSize: '24px' },
    section:      { backgroundColor: 'white', borderRadius: '10px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
    sectionTitle: { color: '#1F4E79', marginTop: 0, marginBottom: '15px' },
    actions:      { display: 'flex', gap: '12px', flexWrap: 'wrap' },
    actionBtn:    { color: 'white', textDecoration: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold' },
    table:        { width: '100%', borderCollapse: 'collapse' },
    headerRow:    { backgroundColor: '#1F4E79', color: 'white' },
    th:           { padding: '10px 15px', textAlign: 'left', fontSize: '13px' },
    td:           { padding: '10px 15px', fontSize: '13px', borderBottom: '1px solid #eee' },
    rowEven:      { backgroundColor: '#ffffff' },
    rowOdd:       { backgroundColor: '#f9f9f9' },
    deposit:      { backgroundColor: '#d4edda', color: '#155724', padding: '3px 8px', borderRadius: '4px', fontSize: '11px' },
    withdraw:     { backgroundColor: '#f8d7da', color: '#721c24', padding: '3px 8px', borderRadius: '4px', fontSize: '11px' },
    transfer:     { backgroundColor: '#cce5ff', color: '#004085', padding: '3px 8px', borderRadius: '4px', fontSize: '11px' },
    success:      { backgroundColor: '#d4edda', color: '#155724', padding: '3px 8px', borderRadius: '4px', fontSize: '11px' },
    viewAll:      { display: 'block', textAlign: 'right', marginTop: '12px', color: '#1F4E79', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }
};

export default Dashboard;