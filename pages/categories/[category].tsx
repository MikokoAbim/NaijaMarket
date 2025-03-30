import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAIAssistant } from '../../contexts/AIAssistantContext';
import { AIAssistant } from '../../components/AIAssistant';

// Sample product data - in a real app, this would come from an API
const products = {
  clothing: [
    {
      id: 1,
      name: "Traditional Ankara Dress",
      price: 15000,
      image: "/images/placeholder.jpg",
      description: "Beautiful handcrafted Ankara dress with modern design",
      rating: 4.8,
      reviews: 128,
      vendor: "Nigerian Fashion House"
    },
    {
      id: 2,
      name: "Aso Oke Agbada",
      price: 25000,
      image: "/images/placeholder.jpg",
      description: "Elegant Aso Oke Agbada for special occasions",
      rating: 4.9,
      reviews: 95,
      vendor: "Royal Nigerian Wear"
    }
  ],
  electronics: [
    {
      id: 3,
      name: "Smart LED TV",
      price: 85000,
      image: "/images/placeholder.jpg",
      description: "55-inch Smart LED TV with Android OS",
      rating: 4.7,
      reviews: 256,
      vendor: "TechPro Nigeria"
    },
    {
      id: 4,
      name: "Wireless Earbuds",
      price: 15000,
      image: "/images/placeholder.jpg",
      description: "True wireless earbuds with noise cancellation",
      rating: 4.6,
      reviews: 189,
      vendor: "SoundMaster NG"
    }
  ],
  beauty: [
    {
      id: 5,
      name: "Natural Hair Care Kit",
      price: 12000,
      image: "/images/placeholder.jpg",
      description: "Complete natural hair care kit with essential oils",
      rating: 4.8,
      reviews: 167,
      vendor: "Natural Beauty NG"
    },
    {
      id: 6,
      name: "African Black Soap",
      price: 5000,
      image: "/images/placeholder.jpg",
      description: "Traditional African black soap with shea butter",
      rating: 4.9,
      reviews: 234,
      vendor: "Pure African Beauty"
    }
  ],
  home: [
    {
      id: 7,
      name: "Modern Sofa Set",
      price: 150000,
      image: "/images/placeholder.jpg",
      description: "Contemporary 3-piece sofa set with premium fabric",
      rating: 4.7,
      reviews: 89,
      vendor: "Luxury Home NG"
    },
    {
      id: 8,
      name: "Smart LED Bulb",
      price: 8000,
      image: "/images/placeholder.jpg",
      description: "WiFi-enabled smart LED bulb with color control",
      rating: 4.6,
      reviews: 145,
      vendor: "Smart Home Solutions"
    }
  ]
};

const categories = {
  clothing: {
    name: "Clothing & Fashion",
    description: "Discover our collection of traditional and modern Nigerian fashion",
    subcategories: ["Traditional Wear", "Modern Fashion", "Accessories"]
  },
  electronics: {
    name: "Electronics & Gadgets",
    description: "Latest gadgets and electronic devices from trusted brands",
    subcategories: ["Smartphones", "Laptops", "Accessories"]
  },
  beauty: {
    name: "Beauty & Personal Care",
    description: "Natural beauty products and personal care items",
    subcategories: ["Skincare", "Hair Care", "Makeup"]
  },
  home: {
    name: "Home & Living",
    description: "Everything you need to create your perfect home",
    subcategories: ["Furniture", "Decor", "Kitchen"]
  }
};

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const { isOpen, openAssistant, closeAssistant } = useAIAssistant();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');

  const categoryData = categories[category as keyof typeof categories];
  const categoryProducts = products[category as keyof typeof products] || [];

  if (!categoryData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Head>
          <title>Category Not Found | Nigerian AI Market</title>
          <meta name="description" content="The requested category could not be found." />
        </Head>

        <Navbar />

        <main className="flex-grow pt-24 pb-16">
          <div className="container-custom">
            <div className="max-w-md mx-auto text-center">
              <h1 className="text-3xl font-bold mb-4 font-display">Category Not Found</h1>
              <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
              <Link 
                href="/" 
                className="btn-primary inline-block"
              >
                Return to Homepage
              </Link>
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
        <title>{categoryData.name} | Nigerian AI Market</title>
        <meta name="description" content={categoryData.description} />
      </Head>

      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-8">
            <Link href="/" className="text-gray-500 hover:text-nigerian-green">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{categoryData.name}</span>
          </div>

          {/* Category Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 font-display">{categoryData.name}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">{categoryData.description}</p>
          </div>

          {/* Subcategories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {categoryData.subcategories.map((subcategory) => (
              <Link 
                key={subcategory}
                href={`/categories/${category}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <h3 className="font-medium text-gray-900">{subcategory}</h3>
              </Link>
            ))}
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-nigerian-green"
              >
                <option value="all">All Prices</option>
                <option value="under-10000">Under ₦10,000</option>
                <option value="10000-50000">₦10,000 - ₦50,000</option>
                <option value="over-50000">Over ₦50,000</option>
              </select>

              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-nigerian-green"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <Link 
                key={product.id}
                href={`/products/${product.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-w-1 aspect-h-1">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 group-hover:text-nigerian-green transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-nigerian-green">
                        ₦{product.price.toLocaleString()}
                      </span>
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-sm text-gray-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
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