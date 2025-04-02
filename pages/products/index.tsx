import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAIAssistant } from '../../contexts/AIAssistantContext';
import { useCart } from '../../contexts/CartContext';
import { AIAssistant } from '../../components/AIAssistant';
import api, { Product } from '../../utils/api';

export default function Products() {
  const { isOpen, openAssistant, closeAssistant } = useAIAssistant();
  const { cartItems, addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await api.getProducts({
          category: activeFilter === 'all' ? undefined : activeFilter,
          min_price: priceRange[0],
          max_price: priceRange[1],
          sort_by: sortBy === 'featured' ? undefined : sortBy
        });
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeFilter, sortBy, priceRange]);

  // Format price with Naira symbol
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'art', name: 'Art & Crafts' },
    { id: 'home-decor', name: 'Home Decor' },
    { id: 'beauty', name: 'Beauty & Wellness' },
    { id: 'food', name: 'Food & Groceries' },
    { id: 'books', name: 'Books & Media' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Products | Nigerian AI Market</title>
        <meta name="description" content="Browse our collection of authentic Nigerian products including fashion, art, crafts, and more." />
      </Head>

      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-8">
            <Link href="/" className="text-gray-500 hover:text-nigerian-green">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Products</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-display">Our Products</h1>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nigerian-green mx-auto"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              {error}
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filter sidebar */}
              <div className="lg:w-1/4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-bold mb-4">Categories</h2>
                  <ul className="space-y-2 mb-8">
                    {categories.map(category => (
                      <li key={category.id}>
                        <button 
                          onClick={() => setActiveFilter(category.id)}
                          className={`block w-full text-left py-1 px-2 rounded ${
                            activeFilter === category.id 
                              ? 'bg-nigerian-green text-white font-medium' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <h2 className="text-lg font-bold mb-4">Sort By</h2>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="sort" 
                        checked={sortBy === 'featured'} 
                        onChange={() => setSortBy('featured')}
                        className="mr-2"
                      />
                      Featured
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="sort" 
                        checked={sortBy === 'price-low'} 
                        onChange={() => setSortBy('price-low')}
                        className="mr-2"
                      />
                      Price: Low to High
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="sort" 
                        checked={sortBy === 'price-high'} 
                        onChange={() => setSortBy('price-high')}
                        className="mr-2"
                      />
                      Price: High to Low
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="sort" 
                        checked={sortBy === 'rating'} 
                        onChange={() => setSortBy('rating')}
                        className="mr-2"
                      />
                      Customer Rating
                    </label>
                  </div>

                  <button 
                    className="w-full btn-outline py-2 mt-6"
                    onClick={() => {
                      setActiveFilter('all');
                      setSortBy('featured');
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>

              {/* Products grid */}
              <div className="lg:w-3/4">
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-gray-600">{products.length} products found</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <div key={product.id} className="group">
                      <div className="relative overflow-hidden rounded-lg bg-gray-100">
                        {/* Product Badge */}
                        {product.badge && (
                          <div className={`absolute top-2 right-2 z-10 px-2 py-1 rounded text-xs font-bold text-white ${
                            product.badge === 'New' ? 'bg-ankara-blue' : 
                            product.badge === 'Limited' ? 'bg-ankara-red' : 
                            product.badge === 'Bestseller' ? 'bg-ankara-orange' : 
                            'bg-nigerian-green'
                          }`}>
                            {product.badge}
                          </div>
                        )}
                        
                        {/* Product Image */}
                        <Link href={`/products/${product.id}`}>
                          <div className="h-64 overflow-hidden">
                            <div 
                              className="h-full w-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-300"
                              style={{ backgroundImage: `url(${product.image})` }}
                            ></div>
                          </div>
                        </Link>
                        
                        {/* Quick Actions */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
                            <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                              </svg>
                            </button>
                            <button 
                              className="p-2 bg-nigerian-green rounded-full shadow hover:bg-opacity-90"
                              onClick={() => addToCart(product.id)}
                            >
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                              </svg>
                            </button>
                            <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Product Info */}
                      <div className="mt-4">
                        <div className="flex items-center mb-1">
                          <span className="text-xs text-gray-500">{product.vendor}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <span className="text-xs ml-1 text-gray-500">{product.rating}</span>
                          </div>
                        </div>
                        <h3 className="text-gray-900 font-medium mb-1">
                          <Link href={`/products/${product.id}`} className="hover:text-nigerian-green transition-colors">
                            {product.name}
                          </Link>
                        </h3>
                        <p className="font-bold text-nigerian-green">{formatPrice(product.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {products.length === 0 && (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 className="text-lg font-bold text-gray-700 mb-2">No products found</h3>
                    <p className="text-gray-500 mb-4">We couldn't find any products that match your criteria.</p>
                    <button 
                      onClick={() => {
                        setActiveFilter('all');
                        setSortBy('featured');
                      }}
                      className="btn-primary"
                    >
                      View All Products
                    </button>
                  </div>
                )}
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