import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAIAssistant } from '../contexts/AIAssistantContext';
import { AIAssistant } from '../components/AIAssistant';

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;
  const { isOpen, openAssistant, closeAssistant } = useAIAssistant();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);

  useEffect(() => {
    // In a real application, you would validate the token with your backend
    // For demo purposes, we'll just check if it exists
    if (!token) {
      setIsValidToken(false);
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login?reset=success');
      }, 3000);
    }, 1500);
  };

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex flex-col">
        <Head>
          <title>Invalid Reset Link | Nigerian AI Market</title>
          <meta name="description" content="The password reset link is invalid or has expired." />
        </Head>

        <Navbar />

        <main className="flex-grow pt-24 pb-16">
          <div className="container-custom">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold mb-2 font-display">Invalid Reset Link</h1>
                  <p className="text-gray-600">This password reset link is invalid or has expired.</p>
                </div>
                
                <div className="text-center">
                  <Link 
                    href="/forgot-password" 
                    className="text-nigerian-green hover:text-ankara-green font-medium"
                  >
                    Request a new password reset link
                  </Link>
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

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Reset Password | Nigerian AI Market</title>
        <meta name="description" content="Set your new password for your Nigerian AI Market account." />
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
            <span className="text-gray-900 font-medium">Reset Password</span>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2 font-display">Set New Password</h1>
                <p className="text-gray-600">Please enter your new password below.</p>
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}
              
              {success ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                  <p className="font-medium">Password Reset Successful</p>
                  <p className="text-sm mt-1">
                    Your password has been reset successfully. You will be redirected to the login page in a few seconds.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input 
                      type="password" 
                      id="password" 
                      name="password"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your new password"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input 
                      type="password" 
                      id="confirmPassword" 
                      name="confirmPassword"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your new password"
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
                          Resetting Password...
                        </span>
                      ) : 'Reset Password'}
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
              <h2 className="text-lg font-medium mb-2">Password Requirements</h2>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Must be at least 8 characters long</li>
                <li>• Should include a mix of letters and numbers</li>
                <li>• Can include special characters for added security</li>
                <li>• Should not be easily guessable</li>
              </ul>
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