import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAIAssistant } from '../contexts/AIAssistantContext';
import { AIAssistant } from '../components/AIAssistant';

export default function Checkout() {
  const { isOpen, openAssistant, closeAssistant } = useAIAssistant();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  
  // Mock cart data
  const cartItems = [
    {
      id: 1,
      name: 'Ankara Fabric Tote Bag',
      price: 4500,
      image: '/images/product-tote.jpg',
      quantity: 1,
      vendor: 'Lagos Crafts'
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
  ];

  // Form states
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'Nigeria',
    postalCode: ''
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 10000 ? 0 : 1500;
  const total = subtotal + shipping;

  // Format price with Naira symbol
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Handle form submissions
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = () => {
    // In a real app, this would submit the order to an API
    alert('Order placed successfully! Redirecting to confirmation page...');
    // Would redirect to order confirmation page
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Checkout | Nigerian AI Market</title>
        <meta name="description" content="Complete your purchase by providing shipping and payment details on Nigerian AI Market." />
      </Head>

      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-8">
            <Link href="/" className="text-gray-500 hover:text-nigerian-green">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/cart" className="text-gray-500 hover:text-nigerian-green">Cart</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-display">Checkout</h1>

          {/* Checkout Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <div className={`flex flex-col items-center ${step >= 1 ? 'text-nigerian-green' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= 1 ? 'bg-nigerian-green text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <span className="text-sm">Shipping</span>
              </div>
              
              <div className={`w-20 h-1 mx-2 ${step >= 2 ? 'bg-nigerian-green' : 'bg-gray-200'}`}></div>
              
              <div className={`flex flex-col items-center ${step >= 2 ? 'text-nigerian-green' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= 2 ? 'bg-nigerian-green text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <span className="text-sm">Payment</span>
              </div>
              
              <div className={`w-20 h-1 mx-2 ${step >= 3 ? 'bg-nigerian-green' : 'bg-gray-200'}`}></div>
              
              <div className={`flex flex-col items-center ${step >= 3 ? 'text-nigerian-green' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= 3 ? 'bg-nigerian-green text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
                <span className="text-sm">Review</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Checkout Form */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Step 1: Shipping */}
                {step === 1 && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                    
                    <form onSubmit={handleShippingSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                          <input 
                            type="text" 
                            id="firstName" 
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                            value={shippingDetails.firstName}
                            onChange={(e) => setShippingDetails({...shippingDetails, firstName: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                          <input 
                            type="text" 
                            id="lastName" 
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                            value={shippingDetails.lastName}
                            onChange={(e) => setShippingDetails({...shippingDetails, lastName: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                          <input 
                            type="email" 
                            id="email" 
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                            value={shippingDetails.email}
                            onChange={(e) => setShippingDetails({...shippingDetails, email: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                          <input 
                            type="tel" 
                            id="phone" 
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                            value={shippingDetails.phone}
                            onChange={(e) => setShippingDetails({...shippingDetails, phone: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                        <input 
                          type="text" 
                          id="address" 
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                          value={shippingDetails.address}
                          onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                          <input 
                            type="text" 
                            id="city" 
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                            value={shippingDetails.city}
                            onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                          <select 
                            id="state" 
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                            value={shippingDetails.state}
                            onChange={(e) => setShippingDetails({...shippingDetails, state: e.target.value})}
                          >
                            <option value="">Select State</option>
                            <option value="Abia">Abia</option>
                            <option value="Abuja">Abuja (FCT)</option>
                            <option value="Lagos">Lagos</option>
                            <option value="Rivers">Rivers</option>
                            {/* Add other Nigerian states */}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                          <input 
                            type="text" 
                            id="postalCode" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                            value={shippingDetails.postalCode}
                            onChange={(e) => setShippingDetails({...shippingDetails, postalCode: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between pt-6 border-t">
                        <Link href="/cart" className="text-gray-600 hover:text-gray-800 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                          </svg>
                          Back to Cart
                        </Link>
                        
                        <button type="submit" className="btn-primary">
                          Continue to Payment
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* Step 2: Payment */}
                {step === 2 && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                    
                    <form onSubmit={handlePaymentSubmit}>
                      <div className="mb-6">
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card *</label>
                        <input 
                          type="text" 
                          id="cardName" 
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                          value={paymentDetails.cardName}
                          onChange={(e) => setPaymentDetails({...paymentDetails, cardName: e.target.value})}
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            id="cardNumber" 
                            required
                            placeholder="**** **** **** ****"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                            value={paymentDetails.cardNumber}
                            onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-1">
                            <div className="w-8 h-5 bg-gray-200 rounded"></div>
                            <div className="w-8 h-5 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                          <input 
                            type="text" 
                            id="expiry" 
                            required
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                            value={paymentDetails.expiry}
                            onChange={(e) => setPaymentDetails({...paymentDetails, expiry: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                          <input 
                            type="text" 
                            id="cvv" 
                            required
                            placeholder="***"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                            value={paymentDetails.cvv}
                            onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="rounded-md bg-gray-50 p-4 mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Methods</h3>
                        <div className="flex space-x-4">
                          <div className="flex items-center">
                            <input 
                              id="credit-card" 
                              name="payment-method" 
                              type="radio" 
                              defaultChecked
                              className="h-4 w-4 text-nigerian-green focus:ring-nigerian-green"
                            />
                            <label htmlFor="credit-card" className="ml-2 text-sm text-gray-700">
                              Credit Card
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              id="bank-transfer" 
                              name="payment-method" 
                              type="radio" 
                              className="h-4 w-4 text-nigerian-green focus:ring-nigerian-green"
                            />
                            <label htmlFor="bank-transfer" className="ml-2 text-sm text-gray-700">
                              Bank Transfer
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              id="paystack" 
                              name="payment-method" 
                              type="radio" 
                              className="h-4 w-4 text-nigerian-green focus:ring-nigerian-green"
                            />
                            <label htmlFor="paystack" className="ml-2 text-sm text-gray-700">
                              Paystack
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between pt-6 border-t">
                        <button 
                          type="button" 
                          onClick={() => setStep(1)}
                          className="text-gray-600 hover:text-gray-800 flex items-center"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                          </svg>
                          Back to Shipping
                        </button>
                        
                        <button type="submit" className="btn-primary">
                          Review Order
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* Step 3: Review */}
                {step === 3 && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Review Your Order</h2>
                    
                    <div className="space-y-6">
                      <div className="border-b pb-4">
                        <h3 className="font-medium text-gray-900 mb-2">Shipping Information</h3>
                        <div className="text-sm text-gray-600">
                          <p>{shippingDetails.firstName} {shippingDetails.lastName}</p>
                          <p>{shippingDetails.address}</p>
                          <p>{shippingDetails.city}, {shippingDetails.state} {shippingDetails.postalCode}</p>
                          <p>{shippingDetails.country}</p>
                          <p>Phone: {shippingDetails.phone}</p>
                          <p>Email: {shippingDetails.email}</p>
                        </div>
                        <button 
                          onClick={() => setStep(1)}
                          className="text-sm text-nigerian-green hover:underline mt-2"
                        >
                          Edit
                        </button>
                      </div>
                      
                      <div className="border-b pb-4">
                        <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                        <div className="text-sm text-gray-600">
                          <p>Credit Card ending in {paymentDetails.cardNumber.slice(-4)}</p>
                          <p>Expires {paymentDetails.expiry}</p>
                        </div>
                        <button 
                          onClick={() => setStep(2)}
                          className="text-sm text-nigerian-green hover:underline mt-2"
                        >
                          Edit
                        </button>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
                        <div className="space-y-4">
                          {cartItems.map(item => (
                            <div key={item.id} className="flex items-center">
                              <div className="h-16 w-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-grow">
                                <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 bg-gray-50 p-4 rounded-md">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">
                          {shipping > 0 ? formatPrice(shipping) : 'Free'}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>Total</span>
                        <span className="text-nigerian-green">{formatPrice(total)}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-8 pt-6 border-t">
                      <button 
                        onClick={() => setStep(2)}
                        className="text-gray-600 hover:text-gray-800 flex items-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Back to Payment
                      </button>
                      
                      <button 
                        onClick={handlePlaceOrder}
                        className="btn-primary"
                      >
                        Place Order
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="max-h-64 overflow-y-auto mb-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex py-4 border-b">
                        <div className="h-16 w-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3 pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping > 0 ? formatPrice(shipping) : 'Free'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-lg font-bold pt-3 border-t">
                      <span>Total</span>
                      <span className="text-nigerian-green">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
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