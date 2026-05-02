import React from 'react';
import Navbar from './components/Navbar';
import AccountList from './components/AccountList';
import CreateAccount from './components/CreateAccount';
import UpdateAccount from './components/UpdateAccount';

function App() {
    const path = window.location.pathname;

    return (
        <div>
            <Navbar />
            {path === '/'        && <AccountList />}
            {path === '/create'  && <CreateAccount />}
            {path === '/update'  && <UpdateAccount />}
        </div>
    );
}

export default App;