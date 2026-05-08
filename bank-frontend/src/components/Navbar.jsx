import React from 'react';
import UserService from '../services/UserService';

function Navbar() {
    const user    = UserService.getLoggedInUser();
    const isLogin = UserService.isLoggedIn();

    return (
        <nav style={styles.nav}>
            <h2 style={styles.logo}>🏦 Bank Management System</h2>
            <div style={styles.links}>
                {isLogin ? (
                    <>
                        <a href="/"        style={styles.link}>Dashboard</a>
                        <a href="/profile" style={styles.link}>👤 {user?.fullName}</a>
                        <a href="/create"  style={styles.link}>New Account</a>
                        <a href="/update"  style={styles.link}>Update</a>
                        <span style={styles.userBadge}>
                            👤 {user?.fullName} ({user?.role})
                        </span>
                        <button style={styles.logoutBtn}
                            onClick={UserService.logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <a href="/login"    style={styles.link}>Login</a>
                        <a href="/register" style={styles.link}>Register</a>
                    </>
                )}
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
        alignItems: 'center'
    },
    logo:      { color: 'white', margin: 0, fontSize: '20px' },
    links:     { display: 'flex', gap: '15px', alignItems: 'center' },
    link:      { color: 'white', textDecoration: 'none', fontSize: '14px' },
    userBadge: { color: '#90CAF9', fontSize: '13px' },
    logoutBtn: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '7px 14px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '13px'
    }
};

export default Navbar;