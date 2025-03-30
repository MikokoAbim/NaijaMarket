import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAIAssistant } from '../contexts/AIAssistantContext';
import { AIAssistant } from '../components/AIAssistant';

export default function ForgotPassword() {
  const { isOpen, openAssistant, closeAssistant } = useAIAssistant();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Forgot Password | Nigerian AI Market</title>
        <meta name="description" content="Reset your password for your Nigerian AI Market account." />
      </Head>

      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-8">
            <Link href="/" className="text-gray-500 hover:text-nigerian-green">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/login" className="text-gray-500 hover:text-nigerian-green">Login</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Forgot Password</span>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2 font-display">Reset Password</h1>
                <p className="text-gray-600">Enter your email address and we'll send you instructions to reset your password.</p>
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}
              
              {success ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                  <p className="font-medium">Check your email</p>
                  <p className="text-sm mt-1">
                    We've sent password reset instructions to your email address. Please check your inbox and follow the instructions.
                  </p>
                  <div className="mt-4">
                    <Link 
                      href="/login" 
                      className="text-sm font-medium text-nigerian-green hover:text-ankara-green"
                    >
                      Return to login
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <button 
                      type="submit" 
                      className={`w-full btn-primary py-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Instructions...
                        </span>
                      ) : 'Send Reset Instructions'}
                    </button>
                  </div>
                </form>
              )}
              
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Remember your password?{' '}
                  <Link href="/login" className="font-medium text-nigerian-green hover:text-ankara-green">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium mb-2">Need Help?</h2>
              <p className="text-sm text-gray-600 mb-4">
                If you're having trouble resetting your password, please contact our support team:
              </p>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:support@nigerianaimarket.com" className="text-nigerian-green hover:text-ankara-green">
                    support@nigerianaimarket.com
                  </a>
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+2341234567890" className="text-nigerian-green hover:text-ankara-green">
                    +234 123 456 7890
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* AI Assistant Button */}
      <button 
        onClick={openAssistant}
        className="fixed bottom-6 right-6 bg-nigerian-green text-white rounded-full p-4 shadow-lg hover:bg-opacity-90 transition-all z-20"
        aria-label="Open AI Assistant"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
      </button>
      
      {/* AI Assistant Modal */}
      <AIAssistant isOpen={isOpen} onClose={closeAssistant} />
    </div>
  );
} 