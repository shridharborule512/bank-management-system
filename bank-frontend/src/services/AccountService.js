import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/account';

const AccountService = {

    // Get all accounts
    getAllAccounts: () => {
        return axios.get(`${BASE_URL}/all`);
    },

    // Get account by ID
    getAccountById: (id) => {
        return axios.get(`${BASE_URL}/${id}`);
    },

    // Create account
    createAccount: (account) => {
        return axios.post(`${BASE_URL}/create`, account);
    },

    // Update account
    updateAccount: (id, account) => {
        return axios.put(`${BASE_URL}/update/${id}`, account);
    },

    // Delete account
    deleteAccount: (id) => {
        return axios.delete(`${BASE_URL}/delete/${id}`);
    }
};

export default AccountService;