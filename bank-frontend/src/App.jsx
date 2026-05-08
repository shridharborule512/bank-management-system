import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AccountList from './components/AccountList';
import CreateAccount from './components/CreateAccount';
import UpdateAccount from './components/UpdateAccount';
import Login from './components/Login';
import Register from './components/Register';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import Transfer from './components/Transfer';
import TransactionHistory from './components/TransactionHistory';
import AdminUserList from './components/AdminUserList';
import UserService from './services/UserService';
import Profile from './components/Profile';


function App() {
    const path    = window.location.pathname;
    const isLogin = UserService.isLoggedIn();
    const user    = UserService.getLoggedInUser();
    const isAdmin = user?.role === 'ADMIN';

    // Public routes
    if (path === '/login')    return <Login />;
    if (path === '/register') return <Register />;
    

    // Redirect to login if not logged in
    if (!isLogin) {
        window.location.href = '/login';
        return null;
    }

    // Admin only route guard
    if (path === '/users' && !isAdmin) {
        window.location.href = '/';
        return null;
    }

    return (
        <div>
            <Navbar />
            {path === '/profile' && <Profile />}
            {path === '/'            && <Dashboard />}
            {path === '/accounts'    && <AccountList />}
            {path === '/create'      && <CreateAccount />}
            {path === '/update'      && <UpdateAccount />}
            {path === '/deposit'     && <Deposit />}
            {path === '/withdraw'    && <Withdraw />}
            {path === '/transfer'    && <Transfer />}
            {path === '/transactions'&& <TransactionHistory />}
            {path === '/users'       && <AdminUserList />}
        </div>
    );
}

export default App;