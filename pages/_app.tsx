import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { AIAssistantProvider } from '../contexts/AIAssistantContext';
import { CartProvider } from '../contexts/CartContext';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading screen for 1 second
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="mb-4">
            <div className="inline-block h-12 w-12 bg-ankara-orange rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Nigerian AI Market</h2>
          <p className="text-green-400">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <AIAssistantProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AIAssistantProvider>
  );
}

export default MyApp; 