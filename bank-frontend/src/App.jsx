import React from 'react';
import Navbar from './components/Navbar';
import AccountList from './components/AccountList';
import CreateAccount from './components/CreateAccount';
import UpdateAccount from './components/UpdateAccount';
import Login from './components/Login';
import Register from './components/Register';
import UserService from './services/UserService';

function App() {
    const path    = window.location.pathname;
    const isLogin = UserService.isLoggedIn();

    // Redirect to login if not logged in
    if (!isLogin && path !== '/login' && path !== '/register') {
        window.location.href = '/login';
        return null;
    }

    return (
        <div>
            {/* Hide navbar on login/register pages */}
            {path !== '/login' && path !== '/register' && <Navbar />}

            {path === '/login'    && <Login />}
            {path === '/register' && <Register />}
            {path === '/'         && <AccountList />}
            {path === '/create'   && <CreateAccount />}
            {path === '/update'   && <UpdateAccount />}
        </div>
    );
}

export default App;