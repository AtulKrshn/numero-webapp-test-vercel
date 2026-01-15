import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': import.meta.env.VITE_API_KEY || '123TEST',
    },
    timeout: 10000,
});

console.log('API Initialized with Base URL:', api.defaults.baseURL);

// Request interceptor
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

// 1. Fetch Raw Products (Source of Truth)
export const fetchProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data.products || [];
    } catch (error) {
        console.warn('Fetching products failed:', error.message);
        return [];
    }
};

export const checkCoupon = async (code, skus) => {
    try {
        const response = await api.post('/orders/check-coupon', {
            coupon_code: code,
            product_skus: skus
        });
        return response.data;
    } catch (error) {
        // If 400 (Invalid), return the error message nicely
        if (error.response && error.response.status === 400 && error.response.data.detail) {
            throw new Error(error.response.data.detail);
        }
        throw error;
    }
};

// 2. Helper for Legacy Components
export const getPricingConfig = async () => {
    const products = await fetchProducts();

    const baseProduct = products.find(p => p.sku === 'NUM-FULL-2026');
    const partnerProduct = products.find(p => p.sku === 'NUM-REL-2026');

    return {
        base: baseProduct ? baseProduct.sale_price : 500, // Updated default
        partner: partnerProduct ? partnerProduct.sale_price : 300, // Updated default
        currency: baseProduct ? baseProduct.currency : 'INR'
    };
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
