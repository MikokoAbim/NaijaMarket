import React, { useState, useRef, useEffect } from 'react';
import { Message, AIAssistantProps, Entity } from '../types';
import api from '../utils/api';
import { useCart } from '../contexts/CartContext';
import { useRouter } from 'next/router';

export const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  // Step 1: Initialize state for input message using React's useState hook
  // This creates a state variable 'inputMessage' and a function 'setInputMessage' to update it
  const { setCartItems } = useCart();
  const router = useRouter();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Step 2: Define the message sending handler
  const handleSendMessage = async () => {
    // Step 3: Validate input before sending
    if (!inputMessage.trim() || isLoading) return;

    // Step 4: Create and add user message to chat history
    const userMessage: Message = {
      text: inputMessage,
      isUser: true,
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Step 5: Clear the input field after sending
    setInputMessage('');
    setIsLoading(true);

    try {
      // Step 6: Send message to backend using api.sendMessage
      const data = await api.sendMessage(inputMessage);

      // Add AI response to chat
      const aiMessage: Message = {
        text: data.message,
        isUser: false,
      };
      setMessages(prev => [...prev, aiMessage]);

      // Handle navigation if specified
      if (data.navigation) {
        if (data.navigation.action === 'navigate') {
          router.push(data.navigation.path);
          // Optionally close the AI assistant after navigation
          onClose();
        }
      }

      // If the intent was addToCart or removeFromCart, refresh the cart
      if (data.intent === "addToCart" || data.intent === "removeFromCart") {
        const updatedCart = await api.getCart();
        setCartItems(updatedCart);
      }

      // Log intent and entities for debugging
      if (data.intent) {
        console.log('Detected intent:', data.intent);
      }
      if (data.entities && data.entities.length > 0) {
        console.log('Detected entities:', data.entities);
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

  // Step 8: Handle keyboard events for sending message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="flex-shrink-0 px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900">AI Shopping Assistant</h2>
                <div className="ml-3 h-7 flex items-center">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close panel</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6">
              <div className="space-y-4 py-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.isUser
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Section */}
            <div className="flex-shrink-0 px-4 py-4 sm:px-6">
              <div className="flex space-x-4">
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Type your message..."
                  // Step 9: Bind input value to state
                  value={inputMessage}
                  // Step 10: Update state when input changes
                  onChange={(e) => setInputMessage(e.target.value)}
                  // Step 11: Handle Enter key press
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  // Step 12: Handle button click to send message
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 