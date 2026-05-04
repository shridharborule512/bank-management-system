import React, { useEffect, useState } from 'react';
import TransactionService from '../services/TransactionService';

function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);
    const [filtered,     setFiltered]     = useState([]);
    const [search,       setSearch]       = useState('');
    const [typeFilter,   setTypeFilter]   = useState('ALL');
    const [loading,      setLoading]      = useState(true);

    useEffect(() => {
        TransactionService.getAllTransactions()
            .then(res => {
                setTransactions(res.data);
                setFiltered(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Filter logic
    useEffect(() => {
        let data = [...transactions];
        if (typeFilter !== 'ALL') {
            data = data.filter(tx => tx.type === typeFilter);
        }
        if (search) {
            data = data.filter(tx =>
                tx.accountNumber.toLowerCase().includes(search.toLowerCase())
            );
        }
        setFiltered(data);
    }, [search, typeFilter, transactions]);

    if (loading) return (
        <h3 style={{ textAlign: 'center', marginTop: '60px' }}>
            Loading transactions...
        </h3>
    );

    return (
        <div style={styles.page}>
            <h2 style={styles.heading}>📋 Transaction History</h2>

            {/* Filters */}
            <div style={styles.filters}>
                <input
                    style={styles.search}
                    type="text"
                    placeholder="Search by account number..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select
                    style={styles.select}
                    value={typeFilter}
                    onChange={e => setTypeFilter(e.target.value)}
                >
                    <option value="ALL">All Types</option>
                    <option value="DEPOSIT">Deposit</option>
                    <option value="WITHDRAW">Withdraw</option>
                    <option value="TRANSFER">Transfer</option>
                </select>
                <span style={styles.count}>
                    Total: <strong>{filtered.length}</strong> records
                </span>
            </div>

            {/* Table */}
            <div style={styles.tableBox}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.headerRow}>
                            <th style={styles.th}>#</th>
                            <th style={styles.th}>Account No</th>
                            <th style={styles.th}>Type</th>
                            <th style={styles.th}>Amount</th>
                            <th style={styles.th}>Balance After</th>
                            <th style={styles.th}>To Account</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan="8" style={styles.noData}>
                                    No transactions found
                                </td>
                            </tr>
                        ) : (
                            filtered.map((tx, i) => (
                                <tr key={tx.id}
                                    style={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                                    <td style={styles.td}>{i + 1}</td>
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
                                    <td style={styles.td}>
                                        ₹{tx.amount.toLocaleString()}
                                    </td>
                                    <td style={styles.td}>
                                        ₹{tx.balanceAfter.toLocaleString()}
                                    </td>
                                    <td style={styles.td}>
                                        {tx.toAccountNumber || '—'}
                                    </td>
                                    <td style={styles.td}>
                                        <span style={styles.successBadge}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        {new Date(tx.createdAt)
                                            .toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <a href="/" style={styles.back}>← Back to Dashboard</a>
        </div>
    );
}

const styles = {
    page:         { padding: '25px', backgroundColor: '#f5f7ff', minHeight: '100vh' },
    heading:      { color: '#1F4E79', marginBottom: '20px' },
    filters:      { display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' },
    search:       { padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px', flex: 1, minWidth: '200px' },
    select:       { padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' },
    count:        { fontSize: '14px', color: '#555' },
    tableBox:     { backgroundColor: 'white', borderRadius: '10px', overflow: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
    table:        { width: '100%', borderCollapse: 'collapse' },
    headerRow:    { backgroundColor: '#1F4E79', color: 'white' },
    th:           { padding: '12px 15px', textAlign: 'left', fontSize: '13px' },
    td:           { padding: '10px 15px', fontSize: '13px', borderBottom: '1px solid #eee' },
    rowEven:      { backgroundColor: '#ffffff' },
    rowOdd:       { backgroundColor: '#f9f9f9' },
    deposit:      { backgroundColor: '#d4edda', color: '#155724', padding: '3px 8px', borderRadius: '4px', fontSize: '11px' },
    withdraw:     { backgroundColor: '#f8d7da', color: '#721c24', padding: '3px 8px', borderRadius: '4px', fontSize: '11px' },
    transfer:     { backgroundColor: '#cce5ff', color: '#004085', padding: '3px 8px', borderRadius: '4px', fontSize: '11px' },
    successBadge: { backgroundColor: '#d4edda', color: '#155724', padding: '3px 8px', borderRadius: '4px', fontSize: '11px' },
    noData:       { textAlign: 'center', padding: '30px', color: '#888' },
    back:         { display: 'block', marginTop: '20px', color: '#1F4E79', textDecoration: 'none', fontSize: '14px' }
};

export default TransactionHistory;