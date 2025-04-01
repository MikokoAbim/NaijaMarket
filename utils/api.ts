import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Types
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  vendor: string;
  categories?: string[];
  rating?: number;
  badge?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

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
  getProducts: async (params?: {
    category?: string;
    min_price?: number;
    max_price?: number;
    sort_by?: string;
  }) => {
    const response = await axios.get(`${API_BASE_URL}/products`, { params });
    return response.data;
  },

  getProduct: async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  },

  searchProducts: async (query: SearchQuery) => {
    const response = await axios.post(`${API_BASE_URL}/search`, query);
    return response.data;
  },

  // Cart operations
  getCart: async () => {
    const response = await axios.get(`${API_BASE_URL}/cart/default_user`);
    return response.data;
  },

  addToCart: async (productId: number, quantity: number = 1) => {
    // First get the product details
    const product = await api.getProduct(productId);
    
    // Create cart item with all required fields
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      vendor: product.vendor || 'Unknown Vendor'
    };

    // Add to cart with user_id (using a default for now)
    const response = await axios.post(`${API_BASE_URL}/cart/default_user/add`, cartItem);
    return response.data;
  },

  updateCartItem: async (productId: number, quantity: number) => {
    const response = await axios.put(`${API_BASE_URL}/cart/default_user/update`, {
      product_id: productId,
      quantity
    });
    return response.data;
  },

  removeFromCart: async (productId: number) => {
    const response = await axios.delete(`${API_BASE_URL}/cart/default_user/remove/${productId}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await axios.delete(`${API_BASE_URL}/cart/default_user/clear`);
    return response.data;
  },

  // Promo code operations
  applyPromoCode: async (code: string) => {
    const response = await axios.post(`${API_BASE_URL}/cart/promo`, { code });
    return response.data;
  },

  // AI Assistant operations
  sendMessage: async (message: string, cartItems: CartItem[]) => {
    const response = await axios.post(`${API_BASE_URL}/personal_assistant`, {
      message,
      cart_items: cartItems
    });
    return response.data;
  }
};

export default api; 