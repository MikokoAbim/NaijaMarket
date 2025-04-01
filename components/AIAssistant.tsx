import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Message, AIResponse, AIAssistantProps, CartItem } from '../types';
import api from '../utils/api';

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

// Navigation mapping with synonyms and variations
const navigationMap: Record<string, string> = {
  'home': '/',
  'products': '/products',
  'cart': '/cart',
  'checkout': '/checkout',
  'profile': '/profile',
  'orders': '/orders',
  'settings': '/settings'
};

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

// Common phrases and their variations
const commonPhrases = {
  greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
  farewells: ['goodbye', 'bye', 'see you', 'take care'],
  thanks: ['thank you', 'thanks', 'appreciate it'],
  help: ['help', 'assist', 'support', 'guide'],
  search: ['find', 'search', 'look for', 'where can i find']
};

export function AIAssistant({ isOpen, onClose, cartItems, setCartItems }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.sendMessage(input, cartItems);
      const aiResponse: AIResponse = response;

      // Add AI response to messages
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: aiResponse.message,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        type: 'text',
        data: aiResponse.data
      };

      setMessages(prev => [...prev, aiMessage]);

      // Handle different actions
      if (aiResponse.action === 'add_to_cart' && aiResponse.data?.product) {
        const product = aiResponse.data.product;
        const existingItem = cartItems.find((item: CartItem) => item.id === product.id);
        
        if (existingItem) {
          setCartItems((prevItems: CartItem[]) =>
            prevItems.map((item: CartItem) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          );
        } else {
          setCartItems((prevItems: CartItem[]) => [...prevItems, { ...product, quantity: 1 }]);
        }
      } else if (aiResponse.action === 'remove_from_cart' && aiResponse.data?.product_id) {
        const productId = aiResponse.data.product_id;
        setCartItems((prevItems: CartItem[]) =>
          prevItems.filter((item: CartItem) => item.id !== productId)
        );
      } else if (aiResponse.action === 'update_quantity' && aiResponse.data?.product_id && aiResponse.data?.quantity) {
        const productId = aiResponse.data.product_id;
        const quantity = aiResponse.data.quantity;
        setCartItems((prevItems: CartItem[]) =>
          prevItems.map((item: CartItem) =>
            item.id === productId
              ? { ...item, quantity }
              : item
          )
        );
      } else if (aiResponse.action === 'navigate' && aiResponse.data?.url) {
        const url = aiResponse.data.url;
        if (navigationMap[url]) {
          setTimeout(() => {
            router.push(navigationMap[url]);
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date().toISOString(),
        type: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="flex-shrink-0 px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900">AI Assistant</h2>
                <div className="ml-3 h-7 flex items-center">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-nigerian-green"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close panel</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6">
              <div className="space-y-4 py-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.sender === 'user'
                          ? 'bg-nigerian-green text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      {message.type === 'error' && (
                        <p className="text-xs text-red-500 mt-1">Please try again</p>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="flex-shrink-0 px-4 py-4 sm:px-6">
              <div className="flex space-x-4">
                <textarea
                  rows={1}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-nigerian-green focus:ring-nigerian-green sm:text-sm"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-nigerian-green hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nigerian-green disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 