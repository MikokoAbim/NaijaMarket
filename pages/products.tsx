import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/api';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useAIAssistant } from '../contexts/AIAssistantContext';
import Footer from '../components/Footer';
import AIAssistant from '../components/AIAssistant';

export default function Products() {
  const router = useRouter();
  const { search, category } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { openAssistant, isOpen, closeAssistant } = useAIAssistant();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let fetchedProducts: Product[];

        if (search) {
          // Fetch products based on search query
          fetchedProducts = await api.searchProducts({ query: search as string });
        } else if (category) {
          // Fetch products based on category
          fetchedProducts = await api.getProducts({ category: category as string });
        } else {
          // Fetch all products
          fetchedProducts = await api.getProducts();
        }

        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category]);

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product);
      openAssistant();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">Loading products...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center text-red-500">{error}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          {search && (
            <p className="text-gray-600">Search results for: "{search}"</p>
          )}
          {category && (
            <p className="text-gray-600">Category: {category}</p>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative pb-[100%]">
                  <img
                    src={product.image}
                    alt={product.product}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.product}</h3>
                  <p className="text-xl font-bold text-green-600 mb-2">₦{product.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mb-4">{product.store}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
      
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
      
      {/* AI Assistant Modal */}
      {isOpen && <AIAssistant onClose={closeAssistant} />}
    </div>
  );
} 