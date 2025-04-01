import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAIAssistant } from '../contexts/AIAssistantContext';
import { useCart } from '../contexts/CartContext';
import { AIAssistant } from '../components/AIAssistant';
import api, { CartItem } from '../utils/api';

export default function Cart() {
  const { isOpen, openAssistant, closeAssistant } = useAIAssistant();
  const { cartItems, updateQuantity, removeItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
  }, [cartItems]);

  const applyPromoCode = async () => {
    try {
      setPromoError(null);
      const result = await api.applyPromoCode(promoCode);
      if (result.success) {
        setAppliedPromo(promoCode);
        setPromoError(null);
      } else {
        setPromoError(result.message);
      }
    } catch (err) {
      setPromoError('Invalid promo code');
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    if (subtotal === 0) return 0;
    if (subtotal >= 50000) return 0;
    return 2000;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    let total = subtotal + shipping;

    // Apply 10% discount if promo code is valid
    if (appliedPromo) {
      total = total * 0.9;
    }

    return total;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Shopping Cart | Nigerian AI Market</title>
        <meta name="description" content="View and manage your shopping cart items." />
      </Head>

      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-8">
            <Link href="/" className="text-gray-500 hover:text-nigerian-green">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Cart</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-display">Shopping Cart</h1>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nigerian-green mx-auto"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              {error}
            </div>
          ) : cartItems.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <h3 className="text-lg font-bold text-gray-700 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-4">Looks like you haven't added any items to your cart yet.</p>
              <Link href="/products" className="btn-primary">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="divide-y">
                    {cartItems.map(item => (
                      <div key={item.id} className="p-6 flex items-center">
                        <div className="flex-shrink-0 w-24 h-24 relative">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="ml-6 flex-grow">
                          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.vendor}</p>
                          <div className="mt-2 flex items-center">
                            <div className="flex items-center">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="p-1 rounded-full hover:bg-gray-100"
                              >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                </svg>
                              </button>
                              <span className="mx-4 text-gray-900">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded-full hover:bg-gray-100"
                              >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-4 text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="ml-6">
                          <p className="text-lg font-medium text-nigerian-green">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatPrice(calculateSubtotal())}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">{formatPrice(calculateShipping())}</span>
                    </div>

                    {appliedPromo && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span>-{formatPrice(calculateSubtotal() * 0.1)}</span>
                      </div>
                    )}

                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-nigerian-green">{formatPrice(calculateTotal())}</span>
                      </div>
                    </div>
                  </div>

                  {/* Promo Code */}
                  {!appliedPromo && (
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Promo Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter promo code"
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-nigerian-green focus:ring-nigerian-green"
                        />
                        <button
                          onClick={applyPromoCode}
                          className="btn-outline"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <p className="mt-2 text-sm text-red-500">{promoError}</p>
                      )}
                    </div>
                  )}

                  <button className="w-full btn-primary mt-6">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
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
      <AIAssistant 
        isOpen={isOpen} 
        onClose={closeAssistant} 
        cartItems={cartItems}
        setCartItems={() => {}}
      />
    </div>
  );
} 