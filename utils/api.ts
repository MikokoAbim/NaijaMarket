import axios from 'axios';
import { Product, CartItem, AIResponse } from '../types';

const BASE_URL = 'http://localhost:8000';

// Types
export interface SearchQuery {
  query: string;
  category?: string;
  min_price?: number;
  max_price?: number;
  sort_by?: string;
}

export interface CartResponse {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export interface PromoCodeResponse {
  success: boolean;
  discount: number;
  message: string;
}

// API Service
const api = {
  // Product operations
  getProducts: async (params?: { category?: string }) => {
    const response = await axios.get(`${BASE_URL}/products`, { params });
    return response.data;
  },

  getProduct: async (id: number) => {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
  },

  getProductWithAiAssistant: async (product_name: string) => {
    const response = await axios.get(`${BASE_URL}/products_with_Ai_Assitant/${product_name}`);
    return response.data;
  },

  searchProducts: async (params: { query: string }) => {
    const response = await axios.post(`${BASE_URL}/search`, { query: params.query });
    return response.data;
  },

  // Cart operations
  getCart: async (user_id: string) => {
    const response = await axios.get(`${BASE_URL}/cart/${user_id}`);
    return response.data;
  },

  addToCart: async (user_id: string, cartItem: CartItem) => {
    const response = await axios.post(`${BASE_URL}/cart/${user_id}`, cartItem);
    return response.data;
  },

  updateCartItem: async (user_id: string, productId: number, quantity: number) => {
    const response = await axios.put(`${BASE_URL}/cart/${user_id}/${productId}`, { quantity });
    return response.data;
  },

  removeFromCart: async (user_id: string, productId: number) => {
    const response = await axios.delete(`${BASE_URL}/cart/${user_id}/${productId}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await axios.delete(`${BASE_URL}/cart/default_user/clear`);
    return response.data;
  },

  // Promo code operations
  applyPromoCode: async (code: string) => {
    const response = await axios.post(`${BASE_URL}/cart/promo`, { code });
    return response.data;
  },

  // AI Assistant operations
  sendMessage: async (message: string): Promise<AIResponse> => {
    const response = await axios.post(`${BASE_URL}/personal_assistant`, { message });
    return response.data;
  }
};

export default api; 