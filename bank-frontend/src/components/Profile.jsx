import React from 'react';
import UserService from '../services/UserService';

function Profile() {
    const user = UserService.getLoggedInUser();

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.avatar}>
                    {user?.fullName?.charAt(0).toUpperCase()}
                </div>
                <h2 style={styles.name}>{user?.fullName}</h2>
                <p style={styles.role}>
                    {user?.role === 'ADMIN' ? '👑 Admin' : '👤 User'}
                </p>

                <div style={styles.infoBox}>
                    <div style={styles.infoRow}>
                        <span style={styles.label}>Email</span>
                        <span style={styles.value}>{user?.email}</span>
                    </div>
                    <div style={styles.infoRow}>
                        <span style={styles.label}>Role</span>
                        <span style={styles.value}>{user?.role}</span>
                    </div>
                </div>

                <a href="/" style={styles.back}>← Back to Dashboard</a>
            </div>
        </div>
    );
}

const styles = {
    page:    { minHeight: '100vh', backgroundColor: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    card:    { backgroundColor: 'white', borderRadius: '12px', padding: '40px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center' },
    avatar:  { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#1F4E79', color: 'white', fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' },
    name:    { color: '#1F4E79', margin: '0 0 5px 0' },
    role:    { color: '#666', marginBottom: '25px' },
    infoBox: { backgroundColor: '#f5f8ff', borderRadius: '8px', padding: '15px', marginBottom: '20px', textAlign: 'left' },
    infoRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' },
    label:   { color: '#666', fontSize: '14px' },
    value:   { color: '#333', fontWeight: 'bold', fontSize: '14px' },
    back:    { color: '#1F4E79', textDecoration: 'none', fontSize: '14px' }
};

export default Profile;