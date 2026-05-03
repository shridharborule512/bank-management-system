import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/user';

const UserService = {

    // Register
    register: (user) => {
        return axios.post(`${BASE_URL}/register`, user);
    },

    // Login
    login: (loginData) => {
        return axios.post(`${BASE_URL}/login`, loginData);
    },

    // Get all users
    getAllUsers: () => {
        return axios.get(`${BASE_URL}/all`);
    },

    // Get user by ID
    getUserById: (id) => {
        return axios.get(`${BASE_URL}/${id}`);
    },

    // Delete user
    deleteUser: (id) => {
        return axios.delete(`${BASE_URL}/delete/${id}`);
    },

    // Save token to localStorage
    saveToken: (token) => {
        localStorage.setItem('token', token);
    },

    // Get token
    getToken: () => {
        return localStorage.getItem('token');
    },

    // Save user info
    saveUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
    },

    // Get logged in user
    getLoggedInUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    },

    // Logout
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    },

    // Check if logged in
    isLoggedIn: () => {
        return localStorage.getItem('token') !== null;
    }
};

export default UserService;