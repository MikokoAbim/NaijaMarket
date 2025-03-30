import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  categories: string[];
  keywords: string[];
  rating?: number;
  vendor?: string;
}

interface RecommendationProps {
  userPreferences?: string[];
  viewedProducts?: number[];
  currentProduct?: number;
  userHistory?: {
    purchases: number[];
    views: number[];
    searches: string[];
  };
  maxRecommendations?: number;
}

// This is a mock product database
const productDatabase: Product[] = [
  {
    id: 1,
    name: 'Ankara Fabric Tote Bag',
    price: 4500,
    image: '/images/product-tote.jpg',
    categories: ['accessories', 'fashion'],
    keywords: ['ankara', 'bag', 'tote', 'fabric', 'accessory'],
    rating: 4.5,
    vendor: 'Lagos Crafts'
  },
  {
    id: 2,
    name: 'Handcrafted Adire Wall Art',
    price: 15000,
    image: '/images/product-adire.jpg',
    categories: ['art', 'home-decor'],
    keywords: ['adire', 'art', 'wall', 'decor', 'handcrafted'],
    rating: 5.0,
    vendor: 'Yoruba Artisans'
  },
  {
    id: 3,
    name: 'Premium Shea Butter (100g)',
    price: 3000,
    image: '/images/product-shea.jpg',
    categories: ['beauty', 'wellness'],
    keywords: ['shea', 'butter', 'beauty', 'skincare', 'natural', 'premium'],
    rating: 4.8,
    vendor: 'Natural Glow Nigeria'
  },
  {
    id: 4,
    name: 'Modern Ankara Shirt - Men',
    price: 8500,
    image: '/images/product-shirt.jpg',
    categories: ['fashion', 'clothing'],
    keywords: ['ankara', 'shirt', 'clothing', 'fashion', 'men', 'modern'],
    rating: 4.2,
    vendor: 'AfriThreads'
  },
  {
    id: 5,
    name: 'Handwoven Raffia Slippers',
    price: 5500,
    image: '/images/product-slippers.jpg',
    categories: ['fashion', 'accessories'],
    keywords: ['raffia', 'slippers', 'shoes', 'handwoven', 'footwear'],
    rating: 4.6,
    vendor: 'Artisan Footwear'
  },
  {
    id: 6,
    name: 'Nigerian Spice Mix Set',
    price: 3800,
    image: '/images/product-spices.jpg',
    categories: ['food', 'groceries'],
    keywords: ['spice', 'food', 'cooking', 'nigerian', 'kitchen', 'groceries'],
    rating: 4.9,
    vendor: 'Naija Flavors'
  },
  {
    id: 7,
    name: 'Beaded Statement Necklace',
    price: 7200,
    image: '/images/product-necklace.jpg',
    categories: ['accessories', 'fashion'],
    keywords: ['beaded', 'necklace', 'jewelry', 'statement', 'fashion'],
    rating: 4.7,
    vendor: 'Bead Culture'
  },
  {
    id: 8,
    name: 'Contemporary African Art Print',
    price: 12000,
    image: '/images/product-art.jpg',
    categories: ['art', 'home-decor'],
    keywords: ['art', 'print', 'contemporary', 'african', 'decor'],
    rating: 4.4,
    vendor: 'Nigerian Canvas'
  },
  {
    id: 9,
    name: 'Traditional Ogene Instrument',
    price: 22000,
    image: '/images/product-ogene.jpg',
    categories: ['music', 'traditional'],
    keywords: ['ogene', 'instrument', 'music', 'traditional', 'cultural'],
    rating: 4.9,
    vendor: 'Cultural Artifacts'
  },
  {
    id: 10,
    name: 'Organic Hibiscus Tea (50g)',
    price: 1800,
    image: '/images/product-tea.jpg',
    categories: ['food', 'beverages'],
    keywords: ['hibiscus', 'tea', 'organic', 'drink', 'beverage', 'herbal'],
    rating: 4.7,
    vendor: 'Organic Farms Nigeria'
  },
  {
    id: 11,
    name: 'Hand-carved Wooden Bowl',
    price: 7500,
    image: '/images/product-bowl.jpg',
    categories: ['home-decor', 'kitchenware'],
    keywords: ['wooden', 'bowl', 'hand-carved', 'kitchenware', 'decor'],
    rating: 4.6,
    vendor: 'Wood Masters'
  },
  {
    id: 12,
    name: 'Nigerian Folklore Book Collection',
    price: 9000,
    image: '/images/product-books.jpg',
    categories: ['books', 'media'],
    keywords: ['book', 'folklore', 'nigerian', 'stories', 'literature'],
    rating: 4.8,
    vendor: 'Heritage Publishers'
  }
];

export const getRecommendations = ({
  userPreferences = [],
  viewedProducts = [],
  currentProduct,
  userHistory = { purchases: [], views: [], searches: [] },
  maxRecommendations = 3
}: RecommendationProps): Product[] => {
  // Create a scoring system for products
  const scoredProducts = productDatabase.map(product => {
    // Skip currently viewed product and products in cart
    if (currentProduct === product.id || userHistory.purchases.includes(product.id)) {
      return { ...product, score: -1 };
    }
    
    let score = 0;
    
    // Score based on user preferences (categories they're interested in)
    userPreferences.forEach(preference => {
      if (product.categories.includes(preference)) {
        score += 10;
      }
      if (product.keywords.includes(preference)) {
        score += 5;
      }
    });
    
    // Score based on current viewed product (similar categories/vendors)
    if (currentProduct) {
      const currentProductData = productDatabase.find(p => p.id === currentProduct);
      if (currentProductData) {
        // Same categories score higher
        product.categories.forEach(category => {
          if (currentProductData.categories.includes(category)) {
            score += 15;
          }
        });
        
        // Same vendor scores higher
        if (product.vendor === currentProductData.vendor) {
          score += 8;
        }
        
        // Similar price range (within 30% difference)
        const priceDiff = Math.abs(product.price - currentProductData.price) / currentProductData.price;
        if (priceDiff < 0.3) {
          score += 5;
        }
        
        // Similar keywords
        product.keywords.forEach(keyword => {
          if (currentProductData.keywords.includes(keyword)) {
            score += 2;
          }
        });
      }
    }
    
    // Score based on user history
    userHistory.views.forEach(viewedId => {
      const viewedProduct = productDatabase.find(p => p.id === viewedId);
      if (viewedProduct) {
        // Products in same category as previously viewed
        product.categories.forEach(category => {
          if (viewedProduct.categories.includes(category)) {
            score += 3;
          }
        });
      }
    });
    
    // Score based on search history
    userHistory.searches.forEach(search => {
      const searchLower = search.toLowerCase();
      // Product matches search terms
      if (product.name.toLowerCase().includes(searchLower)) {
        score += 5;
      }
      product.keywords.forEach(keyword => {
        if (keyword.includes(searchLower) || searchLower.includes(keyword)) {
          score += 2;
        }
      });
    });
    
    // Add some randomness to avoid always showing the same recommendations
    score += Math.random() * 3;
    
    return { ...product, score };
  });
  
  // Sort by score and return top N products
  return scoredProducts
    .filter(product => product.score > 0)
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, maxRecommendations);
};

// Function to generate recommendations based on a product query
export const getQueryBasedRecommendations = (query: string, maxRecommendations = 3): Product[] => {
  const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 2);
  
  if (queryWords.length === 0) {
    // Return random top-rated products if no valid query words
    return productDatabase
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, maxRecommendations);
  }
  
  const scoredProducts = productDatabase.map(product => {
    let score = 0;
    
    // Score based on product name
    queryWords.forEach(word => {
      if (product.name.toLowerCase().includes(word)) {
        score += 10;
      }
    });
    
    // Score based on categories
    product.categories.forEach(category => {
      queryWords.forEach(word => {
        if (category.includes(word) || word.includes(category)) {
          score += 8;
        }
      });
    });
    
    // Score based on keywords
    product.keywords.forEach(keyword => {
      queryWords.forEach(word => {
        if (keyword.includes(word) || word.includes(keyword)) {
          score += 6;
        }
      });
    });
    
    // Score based on vendor name
    if (product.vendor) {
      queryWords.forEach(word => {
        if (product.vendor!.toLowerCase().includes(word)) {
          score += 5;
        }
      });
    }
    
    // Add a slight boost to highly rated products
    if (product.rating && product.rating > 4.5) {
      score += 2;
    }
    
    return { ...product, score };
  });
  
  // Sort by score and return top N products
  return scoredProducts
    .filter(product => product.score > 0)
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, maxRecommendations);
};

export default getRecommendations; 