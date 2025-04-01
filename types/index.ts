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

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  type: 'text' | 'error';
  data?: any;
}

export interface AIResponse {
  message: string;
  action?: 'add_to_cart' | 'remove_from_cart' | 'update_quantity' | 'navigate';
  data?: {
    product?: Product;
    product_id?: number;
    quantity?: number;
    url?: string;
  };
}

export interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
} 