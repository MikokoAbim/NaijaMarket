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

export interface Entity {
  text: string;
  label: string;
}

export interface AIResponse {
  message: string;
  intent?: string;
  entities?: Entity[];
}

export interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
} 