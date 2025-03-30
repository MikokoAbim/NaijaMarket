import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAIAssistant } from '../contexts/AIAssistantContext';
import { AIAssistant } from '../components/AIAssistant';

export default function Cart() {
  const { isOpen, openAssistant, closeAssistant } = useAIAssistant();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Traditional Ankara Dress',
      price: 29999,
      quantity: 1,
      image: '/images/placeholder.jpg',
      vendor: 'Lagos Crafts'
    },
    {
      id: 2,
      name: 'Smart LED TV',
      price: 199999,
      quantity: 1,
      image: '/images/placeholder.jpg',
      vendor: 'Tech Nigeria'
    },
    {
      id: 3,
      name: 'Premium Shea Butter (100g)',
      price: 3000,
      image: '/images/product-shea.jpg',
      quantity: 2,
      vendor: 'Natural Glow Nigeria'
    },
    {
      id: 6,
      name: 'Nigerian Spice Mix Set',
      price: 3800,
      image: '/images/product-spices.jpg',
      quantity: 1,
      vendor: 'Naija Flavors'
    }
  ]);
  
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 10000 ? 0 : 1500;
  const total = subtotal + shipping - discountAmount;

  // Format price with Naira symbol
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Update item quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Apply promo code
  const applyPromoCode = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (promoCode.toUpperCase() === 'NAIJA20') {
        const discount = Math.round(subtotal * 0.2);
        setDiscountAmount(discount);
        setDiscountApplied(true);
      } else {
        setDiscountAmount(0);
        setDiscountApplied(false);
        alert('Invalid promo code');
      }
      setLoading(false);
    }, 1000);
  };

  // Recommended products
  const recommendedProducts = [
    {
      id: 2,
      name: 'Handcrafted Adire Wall Art',
      price: 15000,
      image: '/images/product-adire.jpg',
    },
    {
      id: 7,
      name: 'Beaded Statement Necklace',
      price: 7200,
      image: '/images/product-necklace.jpg',
    },
    {
      id: 10,
      name: 'Organic Hibiscus Tea (50g)',
      price: 1800,
      image: '/images/product-tea.jpg',
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Shopping Cart | Nigerian AI Market</title>
        <meta name="description" content="Review your shopping cart items, update quantities, and proceed to checkout on Nigerian AI Market." />
      </Head>

      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-8">
            <Link href="/" className="text-gray-500 hover:text-nigerian-green">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-display">Your Shopping Cart</h1>

          {cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Cart Items ({cartItems.length})</h2>
                    
                    <div className="divide-y">
                      {cartItems.map(item => (
                        <div key={item.id} className="py-6 flex flex-col sm:flex-row">
                          <div className="sm:w-24 sm:h-24 h-20 w-20 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-grow sm:ml-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                  <Link href={`/products/${item.id}`} className="hover:text-nigerian-green">
                                    {item.name}
                                  </Link>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">Vendor: {item.vendor}</p>
                              </div>
                              <p className="text-lg font-medium text-nigerian-green mt-2 sm:mt-0">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                            
                            <div className="mt-4 flex justify-between items-center">
                              <div className="flex items-center border rounded-md">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-3 py-1 border-r text-gray-600 hover:bg-gray-100"
                                >
                                  -
                                </button>
                                <span className="px-4 py-1">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-1 border-l text-gray-600 hover:bg-gray-100"
                                >
                                  +
                                </button>
                              </div>
                              
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center mt-6 pt-6 border-t">
                      <Link href="/products" className="text-nigerian-green font-medium hover:underline flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Continue Shopping
                      </Link>
                      
                      <button 
                        onClick={() => setCartItems([])}
                        className="text-red-500 hover:text-red-700 font-medium"
                      >
                        Clear Cart
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Recommendations */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {recommendedProducts.map(product => (
                        <div key={product.id} className="group">
                          <div className="relative overflow-hidden rounded-lg bg-gray-100 h-40">
                            <Link href={`/products/${product.id}`}>
                              <div 
                                className="h-full w-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundImage: `url(${product.image})` }}
                              ></div>
                            </Link>
                          </div>
                          
                          <div className="mt-2">
                            <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                              <Link href={`/products/${product.id}`} className="hover:text-nigerian-green transition-colors">
                                {product.name}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm font-bold text-nigerian-green">{formatPrice(product.price)}</p>
                            <button className="mt-2 w-full text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-1 rounded">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                        <span className="font-medium">{formatPrice(subtotal)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">
                          {shipping > 0 ? formatPrice(shipping) : 'Free'}
                        </span>
                      </div>
                      
                      {discountApplied && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount (20%)</span>
                          <span>-{formatPrice(discountAmount)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="my-6">
                      <div className="flex">
                        <input 
                          type="text" 
                          placeholder="Enter promo code" 
                          className="flex-grow px-4 py-2 border border-r-0 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <button 
                          onClick={applyPromoCode}
                          disabled={loading || !promoCode}
                          className={`px-4 py-2 bg-gray-800 text-white rounded-r-md ${
                            loading || !promoCode ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'
                          }`}
                        >
                          {loading ? 'Applying...' : 'Apply'}
                        </button>
                      </div>
                      {discountApplied && (
                        <p className="text-xs text-green-600 mt-1">
                          Promo code NAIJA20 applied successfully!
                        </p>
                      )}
                    </div>
                    
                    <div className="flex justify-between font-bold text-xl border-t pt-6 mb-6">
                      <span>Total</span>
                      <span className="text-nigerian-green">{formatPrice(total)}</span>
                    </div>
                    
                    <Link href="/checkout" className="btn-primary w-full py-3 flex justify-center items-center">
                      Proceed to Checkout
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </Link>
                    
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-500 mb-2">Secure Checkout</p>
                      <div className="flex justify-center space-x-2">
                        <div className="w-8 h-5 bg-gray-200 rounded"></div>
                        <div className="w-8 h-5 bg-gray-200 rounded"></div>
                        <div className="w-8 h-5 bg-gray-200 rounded"></div>
                        <div className="w-8 h-5 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md mx-auto">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Link href="/products" className="btn-primary">
                Continue Shopping
              </Link>
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
      <AIAssistant isOpen={isOpen} onClose={closeAssistant} />
    </div>
  );
} 