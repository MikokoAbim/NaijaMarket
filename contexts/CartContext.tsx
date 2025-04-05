import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '../types';
import api from '../utils/api';
import { Product } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: Product) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCart = async () => {
    try {
      const items = await api.getCart("default_user");
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product: Product) => {
    try {
      const cartItem: CartItem = {
        id: product.id,
        product_id: product.id,
        product: product.product,
        price: product.price,
        store: product.store,
        image: product.image,
        quantity: 1
      };
      await api.addToCart("default_user", cartItem);
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      await api.updateCartItem("default_user", productId, quantity);
      await fetchCart();
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  };

  const removeItem = async (productId: number) => {
    try {
      await api.removeFromCart("default_user", productId);
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 