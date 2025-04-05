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

export interface CartItem {
  id: number;
  product: string;
  price: number;
  quantity: number;
  image: string;
  store: string;
}

export interface Message {
  text: string;
  isUser: boolean;
}

export interface Entity {
  text: string;
  label: string;
}

export interface AIResponse {
  message: string;
  intent?: string;
  entities?: Entity[];
  navigation?: {
    path: string;
    action: 'navigate' | 'open' | 'close';
  };
}

export interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
} 