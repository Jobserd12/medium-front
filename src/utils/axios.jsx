import axios from 'axios';
import Cookies from 'js-cookie'; 

if (!import.meta.env.VITE_API_BASE_URL) { console.error('VITE_API_BASE_URL is not defined'); }
const apiInstance = axios.create({
    // baseURL: import.meta.env.VITE_API_BASE_URL,
    baseURL: "http://127.0.0.1:8000/api/v1",
    timeout: 50000,

    headers: {
        'Content-Type': 'application/json', 
        Accept: 'application/json', 
    },
});

apiInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default apiInstance;