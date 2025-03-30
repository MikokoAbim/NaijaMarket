import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAIAssistant } from '../../contexts/AIAssistantContext';
import { AIAssistant }from '../../components/AIAssistant';

export default function Account() {
  const { isOpen, openAssistant, closeAssistant } = useAIAssistant();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data - in a real app, this would come from an API
  const user = {
    name: 'Chioma Okonkwo',
    email: 'chioma@example.com',
    phone: '+234 812 345 6789',
    address: '25 Awolowo Road, Ikoyi, Lagos',
    profileImage: '/images/profile-placeholder.jpg',
    joinDate: 'January 15, 2023',
    orders: [
      { id: 'ORD-2023-1205', date: 'Dec 5, 2023', total: 25800, status: 'Delivered', items: 3 },
      { id: 'ORD-2023-1118', date: 'Nov 18, 2023', total: 12000, status: 'Delivered', items: 1 },
      { id: 'ORD-2023-0930', date: 'Sep 30, 2023', total: 8500, status: 'Delivered', items: 2 },
    ],
    wishlist: [
      { id: 1, name: 'Ankara Fabric Tote Bag', price: 4500, image: '/images/product-tote.jpg' },
      { id: 7, name: 'Beaded Statement Necklace', price: 7200, image: '/images/product-necklace.jpg' },
      { id: 10, name: 'Organic Hibiscus Tea (50g)', price: 1800, image: '/images/product-tea.jpg' },
    ]
  };

  // Format price with Naira symbol
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
        <title>My Account | Nigerian AI Market</title>
        <meta name="description" content="Manage your Nigerian AI Market account, view orders, wishlist, and update your profile." />
      </Head>

      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-8">
            <Link href="/" className="text-gray-500 hover:text-nigerian-green">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">My Account</span>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              {/* Account Sidebar */}
              <div className="md:w-1/4 bg-gray-50 p-6 border-r">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4">
                    <img 
                      src={user.profileImage} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-gray-800">{user.name}</h2>
                    <p className="text-sm text-gray-500">Member since {user.joinDate}</p>
                  </div>
                </div>
                
                <nav>
                  <ul className="space-y-1">
                    <li>
                      <button 
                        onClick={() => setActiveTab('profile')}
                        className={`flex items-center w-full px-4 py-2 rounded-md ${
                          activeTab === 'profile' 
                            ? 'bg-nigerian-green text-white' 
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Profile
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab('orders')}
                        className={`flex items-center w-full px-4 py-2 rounded-md ${
                          activeTab === 'orders' 
                            ? 'bg-nigerian-green text-white' 
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                        Orders
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab('wishlist')}
                        className={`flex items-center w-full px-4 py-2 rounded-md ${
                          activeTab === 'wishlist' 
                            ? 'bg-nigerian-green text-white' 
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                        Wishlist
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab('addresses')}
                        className={`flex items-center w-full px-4 py-2 rounded-md ${
                          activeTab === 'addresses' 
                            ? 'bg-nigerian-green text-white' 
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Addresses
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab('settings')}
                        className={`flex items-center w-full px-4 py-2 rounded-md ${
                          activeTab === 'settings' 
                            ? 'bg-nigerian-green text-white' 
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Settings
                      </button>
                    </li>
                  </ul>
                </nav>

                <div className="mt-8 pt-6 border-t">
                  <Link href="#" className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Logout
                  </Link>
                </div>
              </div>
              
              {/* Main Content Area */}
              <div className="md:w-3/4 p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">My Profile</h2>
                    
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input 
                            type="text" 
                            id="name" 
                            defaultValue={user.name}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <input 
                            type="email" 
                            id="email" 
                            defaultValue={user.email}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input 
                            type="tel" 
                            id="phone" 
                            defaultValue={user.phone}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Default Address</label>
                          <input 
                            type="text" 
                            id="address" 
                            defaultValue={user.address}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4">
                            <img 
                              src={user.profileImage} 
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">Change Photo</button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <button type="submit" className="btn-primary">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                    
                    {user.orders.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {user.orders.map((order) => (
                              <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatPrice(order.total)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                                      order.status === 'Shipped' ? 'bg-indigo-100 text-indigo-800' : 
                                      'bg-gray-100 text-gray-800'}`}>
                                    {order.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <Link href="#" className="text-nigerian-green hover:text-ankara-green">View</Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                        <Link href="/products" className="btn-primary">
                          Start Shopping
                        </Link>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Wishlist Tab */}
                {activeTab === 'wishlist' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
                    
                    {user.wishlist.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {user.wishlist.map((product) => (
                          <div key={product.id} className="bg-white border rounded-lg overflow-hidden group">
                            <div className="relative h-48 overflow-hidden">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100">
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                              </button>
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium text-gray-900 mb-1">
                                <Link href={`/products/${product.id}`} className="hover:text-nigerian-green transition-colors">
                                  {product.name}
                                </Link>
                              </h3>
                              <p className="font-bold text-nigerian-green mb-2">{formatPrice(product.price)}</p>
                              <button className="w-full btn-primary text-sm py-1">
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
                        <Link href="/products" className="btn-primary">
                          Browse Products
                        </Link>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Addresses Tab */}
                {activeTab === 'addresses' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">My Addresses</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border rounded-lg p-4 relative">
                        <div className="absolute top-4 right-4">
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                            </svg>
                          </button>
                        </div>
                        <h3 className="font-bold mb-2">Default Address</h3>
                        <p className="text-sm text-gray-600 mb-1">{user.name}</p>
                        <p className="text-sm text-gray-600 mb-1">{user.address}</p>
                        <p className="text-sm text-gray-600 mb-1">Lagos, Nigeria</p>
                        <p className="text-sm text-gray-600">{user.phone}</p>
                      </div>
                      
                      <div className="border border-dashed rounded-lg p-4 flex items-center justify-center">
                        <button className="flex flex-col items-center text-gray-500 hover:text-nigerian-green">
                          <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                          <span>Add New Address</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h3 className="font-medium mb-2">Change Password</h3>
                        <form className="space-y-4">
                          <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <input 
                              type="password" 
                              id="currentPassword" 
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input 
                              type="password" 
                              id="newPassword" 
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input 
                              type="password" 
                              id="confirmPassword" 
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nigerian-green focus:border-transparent"
                            />
                          </div>
                          
                          <button type="submit" className="btn-primary">
                            Update Password
                          </button>
                        </form>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h3 className="font-medium mb-2">Notification Preferences</h3>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" defaultChecked className="mr-2" />
                            Order updates and shipping notifications
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" defaultChecked className="mr-2" />
                            Product recommendations and personalized offers
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" defaultChecked className="mr-2" />
                            Newsletter and market updates
                          </label>
                        </div>
                        <button className="mt-4 btn-outline-sm">
                          Save Preferences
                        </button>
                      </div>
                      
                      <div className="bg-red-50 p-4 rounded-md">
                        <h3 className="font-medium text-red-700 mb-2">Delete Account</h3>
                        <p className="text-sm text-red-600 mb-4">
                          Once you delete your account, all your data will be permanently removed. This action cannot be undone.
                        </p>
                        <button className="bg-white border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 font-medium">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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