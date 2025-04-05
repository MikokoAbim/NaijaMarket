export interface Product {
  id: number;
  product: string;
  price: number;
  store: string;
  image: string;
  category?: string;
  description?: string;
}

export interface CartItem {
  id: number;
  product_id: number;
  product: string;
  price: number;
  store: string;
  image: string;
  quantity: number;
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
  entities?: Array<{
    text: string;
    label: string;
  }>;
  navigation?: {
    path: string;
    action: string;
  };
}

export interface AIAssistantProps {
  onClose: () => void;
} 