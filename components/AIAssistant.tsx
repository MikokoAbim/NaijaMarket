import React, { useState, useRef, useEffect } from 'react';
import { Message, AIAssistantProps } from '../types';
import api from '../utils/api';
import { useCart } from '../contexts/CartContext';
import { useRouter } from 'next/router';

export default function AIAssistant({ onClose }: AIAssistantProps) {
  const router = useRouter();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setCartItems } = useCart();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      text: inputMessage,
      isUser: true,
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await api.sendMessage(inputMessage);
      
      const aiMessage: Message = {
        text: response.message,
        isUser: false,
      };
      setMessages(prev => [...prev, aiMessage]);

      if (response.navigation) {
        if (response.navigation.action === 'navigate') {
          if (response.intent === 'searchProduct' && response.entities) {
            const productEntity = response.entities.find((e: { label: string }) => e.label === 'product');
            if (productEntity) {
              router.push(`/products?search=${encodeURIComponent(productEntity.text)}`);
              onClose();
              return;
            }
          }
          router.push(response.navigation.path);
          onClose();
        }
      }

      if (response.intent === "addToCart" || response.intent === "removeFromCart") {
        const updatedCart = await api.getCart("default_user");
        setCartItems(updatedCart);
      }

      if (response.intent) {
        console.log('Detected intent:', response.intent);
      }
      if (response.entities && response.entities.length > 0) {
        console.log('Detected entities:', response.entities);
      }

    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        text: 'Sorry, I encountered an error. Please try again.', 
        isUser: false,
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-[80vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">AI Shopping Assistant</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className={`px-4 py-2 rounded-lg ${
                isLoading || !inputMessage.trim()
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              } text-white`}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 