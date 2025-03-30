import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AIAssistant } from '../components/AIAssistant';
import FeaturedProducts from '../components/FeaturedProducts';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import { useAIAssistant } from '../contexts/AIAssistantContext';

export default function Home() {
  const { isOpen, openAssistant, closeAssistant } = useAIAssistant();

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Nigerian AI Market - AI-Powered Nigerian E-commerce Platform</title>
        <meta name="description" content="Discover authentic Nigerian products with our AI-powered shopping assistant. Find traditional crafts, fashion, art, and more." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <CategorySection />
        <FeaturedProducts />
        
        {/* Floating AI Assistant Button */}
        <button 
          onClick={openAssistant}
          className="fixed bottom-6 right-6 bg-nigerian-green text-white rounded-full p-4 shadow-lg hover:bg-opacity-90 transition-all z-20"
          aria-label="Open AI Assistant"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
        </button>
      </main>

      <Footer />
      
      {/* AI Assistant Modal */}
      <AIAssistant isOpen={isOpen} onClose={closeAssistant} />
    </div>
  );
} 