import axios from 'axios';
import UserService from './UserService';

const BASE_URL = 'http://localhost:8081/api/account';

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${UserService.getToken()}`
    }
});

const AccountService = {

    getAllAccounts: () => {
        return axios.get(`${BASE_URL}/all`, authHeader());
    },

    getAccountById: (id) => {
        return axios.get(`${BASE_URL}/${id}`, authHeader());
    },

    createAccount: (account) => {
        return axios.post(`${BASE_URL}/create`, account, authHeader());
    },

    createMultipleAccounts: (accounts) => {
        return axios.post(`${BASE_URL}/create-all`, accounts, authHeader());
    },

    updateAccount: (id, account) => {
        return axios.put(`${BASE_URL}/update/${id}`, account, authHeader());
    },

    deleteAccount: (id) => {
        return axios.delete(`${BASE_URL}/delete/${id}`, authHeader());
    }
};

export default AccountService;