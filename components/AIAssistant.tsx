import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'product' | 'navigation';
  data?: any;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  subcategory: string;
  rating: number;
  vendor: string;
  keywords: string[];
}

interface AIResponse {
  type: 'text' | 'product' | 'navigation';
  text: string;
  data?: any;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample product data
const sampleProducts: Product[] = [
  {
    id: 'p1',
    name: 'Traditional Ankara Dress',
    price: 15999.99,
    image: '/images/placeholder.jpg',
    category: 'clothing',
    subcategory: 'traditional',
    rating: 4.5,
    vendor: 'Lagos Fashion House',
    keywords: ['ankara', 'dress', 'traditional', 'clothing', 'fashion']
  },
  {
    id: 'p2',
    name: 'Smart LED TV',
    price: 249999.99,
    image: '/images/placeholder.jpg',
    category: 'electronics',
    subcategory: 'televisions',
    rating: 4.8,
    vendor: 'TechZone Nigeria',
    keywords: ['tv', 'television', 'smart tv', 'electronics', 'led']
  }
];

// Navigation mapping with synonyms and variations
const navigationMap = {
  home: {
    url: '/',
    keywords: ['home', 'homepage', 'main page', 'start', 'beginning']
  },
  products: {
    url: '/products',
    keywords: ['products', 'items', 'goods', 'merchandise', 'catalog']
  },
  categories: {
    url: '/categories',
    keywords: ['categories', 'departments', 'sections', 'types']
  },
  clothing: {
    url: '/categories/clothing',
    keywords: ['clothing', 'clothes', 'fashion', 'apparel', 'wear']
  },
  electronics: {
    url: '/categories/electronics',
    keywords: ['electronics', 'gadgets', 'devices', 'tech']
  },
  beauty: {
    url: '/categories/beauty',
    keywords: ['beauty', 'cosmetics', 'makeup', 'skincare', 'personal care']
  },
  homeLiving: {
    url: '/categories/home',
    keywords: ['home', 'household', 'furniture', 'decor']
  },
  cart: {
    url: '/cart',
    keywords: ['cart', 'basket', 'shopping cart', 'checkout']
  },
  account: {
    url: '/account',
    keywords: ['account', 'profile', 'my account', 'dashboard']
  },
  contact: {
    url: '/contact',
    keywords: ['contact', 'contact us', 'help', 'support']
  }
};

// Common phrases and their variations
const commonPhrases = {
  greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
  farewells: ['goodbye', 'bye', 'see you', 'take care'],
  thanks: ['thank you', 'thanks', 'appreciate it'],
  help: ['help', 'assist', 'support', 'guide'],
  search: ['find', 'search', 'look for', 'where can i find']
};

export const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userInput: string): Promise<AIResponse> => {
    setIsTyping(true);
    const lowercaseInput = userInput.toLowerCase();
    
    // Check for navigation intents
    for (const [key, value] of Object.entries(navigationMap)) {
      if (value.keywords.some(keyword => lowercaseInput.includes(keyword))) {
        return {
          type: 'navigation',
          text: `I can help you navigate to the ${key} page.`,
          data: { url: value.url }
        };
      }
    }

    // Check for product search
    if (commonPhrases.search.some(phrase => lowercaseInput.includes(phrase))) {
      const matchedProducts = sampleProducts.filter(product => 
        product.keywords.some(keyword => lowercaseInput.includes(keyword))
      );

      if (matchedProducts.length > 0) {
        return {
          type: 'product',
          text: 'I found these products that might interest you:',
          data: { products: matchedProducts }
        };
      }
    }

    // Default response
    return {
      type: 'text',
      text: "I'm here to help you find products, navigate the site, or answer any questions you might have about our marketplace."
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const response = await generateResponse(input);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response.text,
      sender: 'ai',
      timestamp: new Date(),
      type: response.type,
      data: response.data
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);

    // Handle navigation if response type is 'navigation'
    if (response.type === 'navigation' && response.data?.url) {
      setTimeout(() => {
        router.push(response.data.url);
        onClose(); // Close the AI assistant after navigation
      }, 1000); // Small delay to show the response message
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col">
      <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
        <h3 className="text-lg font-semibold">AI Assistant</h3>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.type === 'product' && message.data?.products && (
                <div className="space-y-2">
                  {message.data.products.map((product: Product) => (
                    <div key={product.id} className="flex items-center space-x-2 bg-white p-2 rounded">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm">₦{product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <p>Typing...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}; 