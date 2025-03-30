import { getQueryBasedRecommendations } from '../components/RecommendationEngine';

interface CommandIntent {
  type: 'navigation' | 'product_search' | 'product_action' | 'checkout' | 'multi_step';
  confidence: number;
  entities?: {
    [key: string]: string;
  };
  steps?: {
    action: string;
    completed: boolean;
    data?: any;
  }[];
}

// This is a simple NLP-like intent detection system
export const detectIntent = (message: string): CommandIntent | null => {
  const lowerMessage = message.toLowerCase();
  
  // Multi-step command patterns
  if (
    lowerMessage.includes('find') && 
    lowerMessage.includes('add to cart') || 
    (lowerMessage.includes('buy') && lowerMessage.includes('checkout'))
  ) {
    let steps = [];
    let entities: {[key: string]: string} = {};
    
    // Extract product keywords
    const productKeywords = extractProductKeywords(lowerMessage);
    if (productKeywords) {
      entities['product'] = productKeywords;
    }
    
    // Extract vendor if mentioned
    const vendorMatch = lowerMessage.match(/from\s+([a-z\s]+)/i);
    if (vendorMatch && vendorMatch[1]) {
      entities['vendor'] = vendorMatch[1].trim();
    }
    
    // Extract quantity if mentioned
    const quantityMatch = lowerMessage.match(/(\d+)\s+(item|piece|product)/i);
    if (quantityMatch && quantityMatch[1]) {
      entities['quantity'] = quantityMatch[1];
    }
    
    // Build the steps based on the command
    if (lowerMessage.includes('find') || lowerMessage.includes('search')) {
      steps.push({ action: 'find_product', completed: false });
    }
    
    if (lowerMessage.includes('add to cart')) {
      steps.push({ action: 'add_to_cart', completed: false });
    }
    
    if (lowerMessage.includes('checkout') || lowerMessage.includes('buy')) {
      if (!steps.some(step => step.action === 'add_to_cart')) {
        steps.push({ action: 'add_to_cart', completed: false });
      }
      steps.push({ action: 'checkout', completed: false });
    }
    
    if (steps.length > 1) {
      return {
        type: 'multi_step',
        confidence: 0.9,
        entities,
        steps
      };
    }
  }
  
  // Navigation intent
  if (
    lowerMessage.includes('go to') || 
    lowerMessage.includes('navigate to') || 
    lowerMessage.includes('take me to') || 
    lowerMessage.includes('show me the') ||
    lowerMessage.includes('open the')
  ) {
    const navigationMatches = [
      { pattern: /home\s*page/i, entity: 'home' },
      { pattern: /product\s*page/i, entity: 'products' },
      { pattern: /about\s*(page|us)/i, entity: 'about' },
      { pattern: /contact\s*(page|us)/i, entity: 'contact' },
      { pattern: /cart/i, entity: 'cart' },
      { pattern: /checkout/i, entity: 'checkout' },
      { pattern: /account/i, entity: 'account' },
      { pattern: /login/i, entity: 'login' },
      { pattern: /register/i, entity: 'register' },
      { pattern: /vendor/i, entity: 'vendor' }
    ];
    
    for (const match of navigationMatches) {
      if (match.pattern.test(lowerMessage)) {
        return {
          type: 'navigation',
          confidence: 0.8,
          entities: {
            page: match.entity
          }
        };
      }
    }
  }
  
  // Product search intent
  if (
    lowerMessage.includes('find') || 
    lowerMessage.includes('search') || 
    lowerMessage.includes('show me') || 
    lowerMessage.includes('looking for') ||
    lowerMessage.includes('products') ||
    lowerMessage.includes('items')
  ) {
    const productKeywords = extractProductKeywords(lowerMessage);
    if (productKeywords) {
      return {
        type: 'product_search',
        confidence: 0.75,
        entities: {
          product: productKeywords
        }
      };
    }
  }
  
  // Product action intent (like adding to cart)
  if (
    lowerMessage.includes('add to cart') || 
    lowerMessage.includes('buy') || 
    lowerMessage.includes('purchase')
  ) {
    const productKeywords = extractProductKeywords(lowerMessage);
    return {
      type: 'product_action',
      confidence: 0.7,
      entities: {
        product: productKeywords || '',
        action: lowerMessage.includes('add to cart') ? 'add_to_cart' : 'buy'
      }
    };
  }
  
  // Checkout intent
  if (
    lowerMessage.includes('checkout') || 
    lowerMessage.includes('complete purchase') || 
    lowerMessage.includes('place order') ||
    lowerMessage.includes('pay for')
  ) {
    return {
      type: 'checkout',
      confidence: 0.85,
      entities: {}
    };
  }
  
  return null;
};

// Helper to extract product keywords from a message
const extractProductKeywords = (message: string): string => {
  // Common patterns for product queries
  const patterns = [
    /(?:find|show|search for|looking for|get)\s+(?:an?|some|the)?\s+(.+?)(?:from|in|by|that|for|with|$)/i,
    /(?:add|put)\s+(?:an?|some|the)?\s+(.+?)\s+(?:to cart|to my cart|to the cart|$)/i,
    /(?:buy|purchase)\s+(?:an?|some|the)?\s+(.+?)(?:from|by|$)/i
  ];
  
  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match && match[1]) {
      // Clean up the extracted text
      let extracted = match[1].trim();
      // Remove common filler words
      extracted = extracted.replace(/(?:a|an|the|some|this|that)\s+/gi, '');
      if (extracted.length > 0) {
        return extracted;
      }
    }
  }
  
  // If no clear pattern matched, use some heuristic
  const words = message.toLowerCase().split(/\s+/);
  const stopWords = ['find', 'search', 'for', 'show', 'me', 'get', 'buy', 'purchase', 'add', 'to', 'cart'];
  const productWords = words.filter(word => !stopWords.includes(word) && word.length > 2);
  
  return productWords.join(' ');
};

// Generate a response based on the detected intent
export const generateResponse = (intent: CommandIntent | null, message: string): string => {
  if (!intent) {
    const generalResponses = [
      "I can help you navigate our website or find products. Try asking me to go to a specific page or find products.",
      "Feel free to ask me about our Nigerian products, or I can help you navigate to different pages.",
      "I'm here to assist with finding products or navigating the website. What are you looking for today?",
      "You can ask me to find specific products or direct you to pages like contact, about us, or categories.",
      "Need help finding something? Ask me to search for products or navigate to different sections of our site."
    ];
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }
  
  switch (intent.type) {
    case 'navigation':
      return `I'll take you to the ${intent.entities?.page || 'requested'} page...`;
    
    case 'product_search':
      if (intent.entities?.product) {
        return `I'm finding ${intent.entities.product} products for you...`;
      }
      return "I'll show you some products that might interest you...";
    
    case 'product_action':
      if (intent.entities?.product) {
        return `I'll ${intent.entities.action === 'add_to_cart' ? 'add' : 'help you buy'} ${intent.entities.product}...`;
      }
      return "Please specify which product you'd like to add to your cart.";
    
    case 'checkout':
      return "I'll take you to checkout to complete your purchase...";
    
    case 'multi_step':
      const steps = intent.steps?.map(step => {
        switch (step.action) {
          case 'find_product':
            return 'find products';
          case 'add_to_cart':
            return 'add to cart';
          case 'checkout':
            return 'checkout';
          default:
            return step.action;
        }
      }).join(', then ');
      
      return `I'll help you ${steps}. Let's start with the first step...`;
    
    default:
      return "I'm not sure how to help with that. Can you rephrase your request?";
  }
};

// Process product search results based on query
export const processProductSearch = (query: string, maxResults = 3) => {
  return getQueryBasedRecommendations(query, maxResults);
};

export default {
  detectIntent,
  generateResponse,
  processProductSearch
}; 