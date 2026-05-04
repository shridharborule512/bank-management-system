import axios from 'axios';
import UserService from './UserService';

const BASE_URL = 'http://localhost:8081/api/transaction';

// Auto attach token to every request
const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${UserService.getToken()}`
    }
});

const TransactionService = {

    deposit: (data) => {
        return axios.post(`${BASE_URL}/deposit`, data, authHeader());
    },

    withdraw: (data) => {
        return axios.post(`${BASE_URL}/withdraw`, data, authHeader());
    },

    transfer: (data) => {
        return axios.post(`${BASE_URL}/transfer`, data, authHeader());
    },

    getAllTransactions: () => {
        return axios.get(`${BASE_URL}/all`, authHeader());
    },

    getByAccount: (accountNumber) => {
        return axios.get(`${BASE_URL}/${accountNumber}`, authHeader());
    }
};

export default TransactionService;