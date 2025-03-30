import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAIAssistant } from '../../contexts/AIAssistantContext';
import { AIAssistant } from '../../components/AIAssistant';

export default function VendorDashboard() {
  const { isOpen, openAssistant, closeAssistant } = useAIAssistant();
  const [timeRange, setTimeRange] = useState('monthly');
  
  // Mock vendor data - in a real app, this would come from an API
  const vendor = {
    name: "Lagos Crafts",
    description: "Traditional Nigerian crafts with modern appeal",
    coverImage: "/images/placeholder.jpg",
    logo: "/images/placeholder.jpg",
    rating: 4.8,
    totalSales: 1234,
    totalProducts: 45,
    storeName: 'Lagos Crafts Marketplace',
    joinDate: 'May 10, 2023',
    profileImage: '/images/vendor-placeholder.jpg',
    stats: {
      revenue: {
        total: 1250000,
        weekly: 85000,
        monthly: 325000,
        yearly: 1250000
      },
      orders: {
        total: 215,
        weekly: 18,
        monthly: 56,
        yearly: 215,
        pending: 3,
        processing: 5,
        shipped: 8,
        delivered: 199
      },
      products: {
        total: 32,
        active: 28,
        outOfStock: 4,
        featured: 6
      },
      customers: {
        total: 156,
        returning: 89
      }
    },
    products: [
      { id: 1, name: 'Ankara Fabric Tote Bag', price: 4500, image: '/images/product-tote.jpg', stock: 25, sales: 42 },
      { id: 5, name: 'Handwoven Raffia Slippers', price: 5500, image: '/images/product-slippers.jpg', stock: 18, sales: 36 },
      { id: 7, name: 'Beaded Statement Necklace', price: 7200, image: '/images/product-necklace.jpg', stock: 15, sales: 29 },
      { id: 10, name: 'Organic Hibiscus Tea (50g)', price: 1800, image: '/images/product-tea.jpg', stock: 0, sales: 53 },
    ],
    recentOrders: [
      { id: 'ORD-2023-1205', date: 'Dec 5, 2023', customer: 'Chioma O.', total: 10000, status: 'Pending', items: 2 },
      { id: 'ORD-2023-1202', date: 'Dec 2, 2023', customer: 'Emeka N.', total: 5500, status: 'Processing', items: 1 },
      { id: 'ORD-2023-1130', date: 'Nov 30, 2023', customer: 'Amina K.', total: 13500, status: 'Shipped', items: 3 },
      { id: 'ORD-2023-1128', date: 'Nov 28, 2023', customer: 'Oluwaseun D.', total: 7200, status: 'Delivered', items: 1 },
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

  const getCurrentStats = () => {
    return {
      revenue: vendor.stats.revenue[timeRange as keyof typeof vendor.stats.revenue],
      orders: vendor.stats.orders[timeRange as keyof typeof vendor.stats.orders]
    };
  };

  const currentStats = getCurrentStats();

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Vendor Dashboard | Nigerian AI Market</title>
        <meta name="description" content="Manage your vendor account, view sales analytics, and manage products on Nigerian AI Market." />
      </Head>

      <Navbar />

      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-8">
            <Link href="/" className="text-gray-500 hover:text-nigerian-green">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/vendor" className="text-gray-500 hover:text-nigerian-green">Vendor</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Dashboard</span>
          </div>

          {/* Vendor Header */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="h-48 relative">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: `url(${vendor.coverImage})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            </div>
            
            <div className="relative px-6 py-4 flex flex-col md:flex-row md:items-center">
              <div className="absolute -top-16 left-6 w-24 h-24 rounded-xl overflow-hidden border-4 border-white shadow-md">
                <img 
                  src={vendor.profileImage}
                  alt={vendor.storeName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="md:ml-28">
                <h1 className="text-2xl font-bold">{vendor.storeName}</h1>
                <p className="text-gray-500">Vendor since {vendor.joinDate}</p>
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-auto flex space-x-2">
                <Link href="/vendor/products/add" className="btn-primary">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add Product
                </Link>
                <Link href="/vendor/settings" className="btn-outline">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Settings
                </Link>
              </div>
            </div>
            
            <div className="border-t px-6 py-3">
              <nav className="flex space-x-4 overflow-x-auto">
                <Link href="/vendor/dashboard" className="px-3 py-2 text-sm font-medium text-nigerian-green border-b-2 border-nigerian-green">
                  Dashboard
                </Link>
                <Link href="/vendor/products" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-nigerian-green">
                  Products
                </Link>
                <Link href="/vendor/orders" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-nigerian-green">
                  Orders
                </Link>
                <Link href="/vendor/analytics" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-nigerian-green">
                  Analytics
                </Link>
                <Link href="/vendor/customers" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-nigerian-green">
                  Customers
                </Link>
                <Link href="/vendor/reviews" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-nigerian-green">
                  Reviews
                </Link>
              </nav>
            </div>
          </div>
          
          {/* Time Range Filter */}
          <div className="flex justify-end mb-6">
            <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
              <button 
                onClick={() => setTimeRange('weekly')}
                className={`px-4 py-2 text-sm rounded-md ${
                  timeRange === 'weekly' 
                    ? 'bg-nigerian-green text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Weekly
              </button>
              <button 
                onClick={() => setTimeRange('monthly')}
                className={`px-4 py-2 text-sm rounded-md ${
                  timeRange === 'monthly' 
                    ? 'bg-nigerian-green text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setTimeRange('yearly')}
                className={`px-4 py-2 text-sm rounded-md ${
                  timeRange === 'yearly' 
                    ? 'bg-nigerian-green text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm">Revenue</h3>
                <div className="bg-green-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div className="mb-2">
                <h2 className="text-2xl font-bold">{formatPrice(currentStats.revenue)}</h2>
                <p className="text-xs text-gray-500">
                  {timeRange === 'weekly' ? 'This Week' : 
                   timeRange === 'monthly' ? 'This Month' : 
                   'This Year'}
                </p>
              </div>
              <div className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                <span className="text-green-500 font-medium">12.5%</span>
                <span className="text-gray-500 ml-1">from previous {timeRange}</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm">Orders</h3>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
              </div>
              <div className="mb-2">
                <h2 className="text-2xl font-bold">{currentStats.orders}</h2>
                <p className="text-xs text-gray-500">
                  {timeRange === 'weekly' ? 'This Week' : 
                   timeRange === 'monthly' ? 'This Month' : 
                   'This Year'}
                </p>
              </div>
              <div className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                <span className="text-green-500 font-medium">8.2%</span>
                <span className="text-gray-500 ml-1">from previous {timeRange}</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm">Products</h3>
                <div className="bg-purple-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                </div>
              </div>
              <div className="mb-2">
                <h2 className="text-2xl font-bold">{vendor.stats.products.total}</h2>
                <p className="text-xs text-gray-500">
                  {vendor.stats.products.active} active
                </p>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-gray-500">
                  {vendor.stats.products.outOfStock} out of stock
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm">Customers</h3>
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
              </div>
              <div className="mb-2">
                <h2 className="text-2xl font-bold">{vendor.stats.customers.total}</h2>
                <p className="text-xs text-gray-500">
                  Total customers
                </p>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-gray-500">
                  {vendor.stats.customers.returning} returning customers
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Status Chart */}
            <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-1">
              <h3 className="font-bold text-gray-700 mb-4">Order Status</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pending</span>
                    <span className="font-medium">{vendor.stats.orders.pending}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${(vendor.stats.orders.pending / vendor.stats.orders.total) * 100}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Processing</span>
                    <span className="font-medium">{vendor.stats.orders.processing}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${(vendor.stats.orders.processing / vendor.stats.orders.total) * 100}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Shipped</span>
                    <span className="font-medium">{vendor.stats.orders.shipped}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-400 h-2 rounded-full" style={{ width: `${(vendor.stats.orders.shipped / vendor.stats.orders.total) * 100}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Delivered</span>
                    <span className="font-medium">{vendor.stats.orders.delivered}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: `${(vendor.stats.orders.delivered / vendor.stats.orders.total) * 100}%` }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Link href="/vendor/orders" className="text-sm text-nigerian-green font-medium hover:underline">
                  View all orders →
                </Link>
              </div>
            </div>
            
            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-700">Recent Orders</h3>
                <Link href="/vendor/orders" className="text-sm text-nigerian-green hover:underline">
                  View all
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {vendor.recentOrders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <Link href={`/vendor/orders/${order.id}`} className="hover:text-nigerian-green">
                            {order.id}
                          </Link>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatPrice(order.total)}</td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                              order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                              order.status === 'Shipped' ? 'bg-indigo-100 text-indigo-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Top Products */}
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-700 text-lg">Top Products</h3>
                <Link href="/vendor/products" className="text-sm text-nigerian-green hover:underline">
                  Manage products
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {vendor.products.map(product => (
                  <div key={product.id} className="border rounded-lg overflow-hidden group">
                    <div className="h-40 overflow-hidden relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-bold text-sm px-3 py-1 bg-red-500 rounded-full">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-sm line-clamp-1" title={product.name}>{product.name}</h4>
                      <div className="flex justify-between mt-2">
                        <span className="text-nigerian-green font-bold">{formatPrice(product.price)}</span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                          </svg>
                          {product.sales} sold
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                        <Link href={`/vendor/products/${product.id}/edit`} className="text-xs text-nigerian-green hover:underline">
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
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