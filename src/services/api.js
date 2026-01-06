import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.devsankhya.com/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

console.log('API Initialized with Base URL:', api.defaults.baseURL);

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
        const response = await api.get('/products');
        const products = response.data.products || [];

        // Map products to base and partner prices logic
        // Assuming known SKUs or order of products
        // Fallback to default if not found
        const baseProduct = products.find(p => p.sku === 'NUM-FULL-2026');
        const partnerProduct = products.find(p => p.sku === 'NUM-REL-2026');

        return {
            base: baseProduct ? baseProduct.sale_price : 51,
            partner: partnerProduct ? partnerProduct.sale_price : 50,
            currency: baseProduct ? baseProduct.currency : 'INR'
        };
    } catch (error) {
        console.warn('Fetching pricing failed, using fallback.', error.message);
        return { base: 51, partner: 50 };
    }
};

export const createOrder = async (orderData) => {
    try {
        // Backend expects 'product_sku'. Frontend might be sending something else.
        // We need to ensure payload matches OrderCreate schema.
        // For now, pass orderData through, assuming caller handles structure
        // or we map it here.
        const response = await api.post('/orders/create-order', orderData);
        return response.data;
    } catch (error) {
        console.warn('Order creation failed.', error.message);
        throw error; // Re-throw to let UI handle error
    }
};

export const verifyPayment = async (paymentData) => {
    try {
        const { payment_id, provider_order_id, signature } = paymentData;
        const response = await api.post(`/payments/verify?payment_id=${payment_id}&provider_order_id=${provider_order_id}&signature=${signature}`);
        return response.data;
    } catch (error) {
        console.warn('Payment verification failed.', error.message);
        throw error;
    }
};

export default api;
