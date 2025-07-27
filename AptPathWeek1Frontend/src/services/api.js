import axios from 'axios';

// Create an instance of axios
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Your backend API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers['Authorization'] = 'Bearer ' + user.token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- AUTH SERVICE ---
export const login = (username, password) => {
    return api.post('/auth/login', { username, password });
};

export const resetPassword = (newPassword) => {
    return api.post('/auth/reset-password', { newPassword });
};

// --- ADMIN SERVICE ---
export const createUser = (username, password, role) => {
    return api.post('/admin/users', { username, password, role });
};

// --- HR/MANAGER SERVICE ---
export const onboardEmployee = (employeeData) => {
    return api.post('/hr-manager/onboard-employee', employeeData);
};

export default api;