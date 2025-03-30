import { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  categories?: string[];
  rating?: number;
  vendor?: string;
  badge?: string | null;
}

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'new', name: 'New Arrivals' },
    { id: 'trending', name: 'Trending' },
    { id: 'bestsellers', name: 'Best Sellers' }
  ];
  
  const products: Product[] = [
    {
      id: 1,
      name: 'Traditional Ankara Dress',
      description: 'Beautiful handmade Ankara dress with modern design',
      price: 29999,
      image: '/images/placeholder.jpg',
      category: 'Clothing',
      categories: ['new', 'trending'],
      rating: 4.8,
      vendor: 'Lagos Crafts',
      badge: 'New'
    },
    {
      id: 2,
      name: 'Smart LED TV',
      description: 'High-quality LED TV with smart features',
      price: 199999,
      image: '/images/placeholder.jpg',
      category: 'Electronics',
      categories: ['trending'],
      rating: 4.5,
      vendor: 'Tech Nigeria',
      badge: null
    },
    {
      id: 3,
      name: 'Handwoven Basket',
      description: 'Traditional Nigerian handwoven basket',
      price: 4999,
      image: '/images/placeholder.jpg',
      category: 'Home & Living',
      categories: ['bestsellers'],
      rating: 4.7,
      vendor: 'Artisan Crafts',
      badge: null
    },
    {
      id: 4,
      name: 'Natural Shea Butter',
      description: 'Pure and natural shea butter from Nigeria',
      price: 1999,
      image: '/images/placeholder.jpg',
      category: 'Beauty & Health',
      categories: ['bestsellers'],
      rating: 4.9,
      vendor: 'Natural Glow',
      badge: null
    },
    {
      id: 5,
      name: 'Handwoven Raffia Slippers',
      description: 'Comfortable handwoven raffia slippers made by local artisans',
      price: 5500,
      image: '/images/product-slippers.jpg',
      category: 'Footwear',
      categories: ['trending'],
      rating: 4.6,
      vendor: 'Artisan Footwear',
      badge: null
    },
    {
      id: 6,
      name: 'Nigerian Spice Mix Set',
      description: 'Traditional Nigerian spice mix set for authentic local dishes',
      price: 3800,
      image: '/images/product-spices.jpg',
      category: 'Food & Groceries',
      categories: ['bestsellers'],
      rating: 4.9,
      vendor: 'Naija Flavors',
      badge: 'Limited'
    },
    {
      id: 7,
      name: 'Beaded Statement Necklace',
      description: 'Handcrafted beaded necklace with traditional Nigerian patterns',
      price: 7200,
      image: '/images/product-necklace.jpg',
      category: 'Accessories',
      categories: ['new', 'trending'],
      rating: 4.7,
      vendor: 'Bead Culture',
      badge: 'New'
    },
    {
      id: 8,
      name: 'Contemporary African Art Print',
      description: 'Modern art print featuring contemporary African designs',
      price: 12000,
      image: '/images/product-art.jpg',
      category: 'Art & Crafts',
      categories: ['new'],
      rating: 4.4,
      vendor: 'Nigerian Canvas',
      badge: null
    },
  ];
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.categories?.includes(activeCategory));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  // Recommended products
  const recommendedProducts: Product[] = [
    {
      id: 2,
      name: 'Handcrafted Adire Wall Art',
      description: 'Beautiful handcrafted Adire wall art piece',
      price: 15000,
      image: '/images/placeholder.jpg',
      category: 'Art & Crafts',
      categories: ['bestsellers'],
      rating: 4.9,
      vendor: 'Yoruba Artisans',
      badge: null
    },
    {
      id: 7,
      name: 'Beaded Statement Necklace',
      description: 'Elegant beaded necklace with traditional patterns',
      price: 7200,
      image: '/images/placeholder.jpg',
      category: 'Fashion',
      categories: ['new', 'trending'],
      rating: 4.7,
      vendor: 'Bead Culture',
      badge: 'New'
    },
    {
      id: 10,
      name: 'Organic Hibiscus Tea',
      description: 'Premium organic hibiscus tea (50g)',
      price: 1800,
      image: '/images/placeholder.jpg',
      category: 'Food & Groceries',
      categories: ['bestsellers'],
      rating: 4.8,
      vendor: 'Naija Flavors',
      badge: null
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-display mb-3">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            AI-selected items based on popularity, quality, and cultural significance
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-10 gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-nigerian-green text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden rounded-lg bg-gray-100">
                {/* Product Badge */}
                {product.badge && (
                  <div className={`absolute top-2 right-2 z-10 px-2 py-1 rounded text-xs font-bold text-white ${
                    product.badge === 'New' ? 'bg-ankara-blue' : 
                    product.badge === 'Limited' ? 'bg-ankara-red' : 'bg-nigerian-green'
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
                    <button className="p-2 bg-nigerian-green rounded-full shadow hover:bg-opacity-90">
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
        
        <div className="mt-12 text-center">
          <Link 
            href="/products" 
            className="btn-primary inline-flex items-center"
          >
            View All Products
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 