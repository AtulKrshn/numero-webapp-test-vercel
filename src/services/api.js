import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request interceptor (placeholder for future auth tokens)
api.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor (placeholder for global error handling)
api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
});

export const getPricingConfig = async () => {
    try {
        const response = await api.get('/config/pricing');
        return response.data;
    } catch (error) {
        console.warn('Fetching pricing failed, using fallback.', error.message);
        return { base: 51, partner: 50 };
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await api.post('/orders/create', orderData);
        return response.data;
    } catch (error) {
        console.warn('Order creation failed, returning mock ID.', error.message);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            order_id: 'order_mock_' + Date.now(),
            amount: orderData?.amount || 51,
            currency: 'INR',
            status: 'created'
        };
    }
};

export default api;
