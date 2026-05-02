import React from 'react';

function Navbar() {
    return (
        <nav style={styles.nav}>
            <h2 style={styles.logo}>🏦 Bank Management System</h2>
            <div style={styles.links}>
    <a href="/"       style={styles.link}>Dashboard</a>
    <a href="/create" style={styles.link}>New Account</a>
    <a href="/update" style={styles.link}>Update Account</a>  {/* ADD THIS */}
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        backgroundColor: '#1F4E79',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: { color: 'white', margin: 0, fontSize: '20px' },
    links: { display: 'flex', gap: '20px' },
    link: { color: 'white', textDecoration: 'none', fontSize: '15px' }
};

export default Navbar;