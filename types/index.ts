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
  text: string;
  isUser: boolean;
}

export interface AIResponse {
  message: string;
  action?: string;
}

export interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
} 