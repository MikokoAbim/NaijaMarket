from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import uvicorn
import pickle
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
import spacy

# Product categories for the marketplace
PRODUCT_CATEGORIES = [
    "Food & Groceries",      # Traditional foods, spices, grains
    "Fashion & Accessories", # Traditional clothing, jewelry, bags
    "Arts & Crafts",        # Handmade items, paintings, sculptures
    "Home & Living",        # Home decor, furniture, kitchenware
    "Beauty & Wellness",    # Natural cosmetics, traditional medicine
    "Electronics",          # Mobile phones, accessories, gadgets
    "Books & Education",    # Educational materials, textbooks
    "Sports & Recreation"   # Sports equipment, games
]

app = FastAPI(title="NaijaMarket API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models and tokenizers
try:
    # Load intent recognition model and tokenizers
    with open('tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)
    
    with open('label_encoder.pickle', 'rb') as f:
        label_encoder = pickle.load(f)
    
    intent_model = load_model('intent_recognition_model')
    
    # Load NER model
    nlp_ner = spacy.load("model-best")
except Exception as e:
    print(f"Error loading models: {e}")
    raise

# BaseModel from Pydantic provides:
# 1. Data validation - ensures all fields have correct types
# 2. JSON serialization/deserialization - converts between Python objects and JSON
# 3. Schema generation - creates OpenAPI documentation automatically
# 4. Type checking - provides runtime type checking for all fields
class Product(BaseModel):
    id: int
    product: str
    price: float
    image: str
    categories: List[str]
    rating: Optional[float] = None
    store: Optional[str] = None
    badge: Optional[str] = None
    description: Optional[str] = None

class CartItem(BaseModel):
    id: int
    product: str
    price: float
    quantity: int
    image: str
    store: str

class CartUpdate(BaseModel):
    product_id: int
    quantity: int

class SearchQuery(BaseModel):
    query: str
    category: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    sort_by: Optional[str] = None

class AIAssistantRequest(BaseModel):
    message: str

class AIAssistantResponse(BaseModel):
    message: str
    intent: Optional[str] = None
    entities: Optional[List[Dict[str, str]]] = None
    navigation: Optional[Dict[str, str]] = None

# Sample product database
products_db = [
    {
        "id": 1,
        "product": "Garri",
        "price": 4500,
        "image": "/images/products/garri.jpg",  # Updated path to match Next.js public directory structure
        "categories": ["Food & Groceries"],
        "rating": 4.5,
        "store": "Mama Nkechi's Groceries",
        "description": "Premium quality Garri from local farms"
    },
    {
        "id": 2,
        "product": "Local beans",
        "price": 3500,
        "image": "/images/products/local-beans.jpg",  # Updated path to match Next.js public directory structure
        "categories": ["Food & Groceries"],
        "rating": 4.8,
        "store": "Lagos Crafts",
        "description": "Beautiful handcrafted Ankara tote bag"
    },
    {
        "id": 3,
        "product": "Traditional Beaded Necklace",
        "price": 2500,
        "image": "/images/products/beaded-necklace.jpg",  # Updated path to match Next.js public directory structure
        "categories": ["Fashion & Accessories", "Arts & Crafts"],
        "rating": 4.6,
        "store": "African Treasures",
        "description": "Handmade traditional beaded necklace"
    }
]

# In-memory cart storage (in production, use a database)
carts = {}

@app.get("/")
async def root():
    return {"message": "Welcome to NaijaMarket API"}

@app.get("/categories")
async def get_categories():
    """Get list of all available product categories"""
    return PRODUCT_CATEGORIES

@app.get("/products", response_model=List[Product])
async def get_products(
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    sort_by: Optional[str] = None
):
    filtered_products = products_db
    
    if category:
        if category not in PRODUCT_CATEGORIES:
            raise HTTPException(status_code=400, detail=f"Invalid category. Must be one of: {', '.join(PRODUCT_CATEGORIES)}")
        filtered_products = [p for p in filtered_products if category in p["categories"]]
    
    if min_price is not None:
        filtered_products = [p for p in filtered_products if p["price"] >= min_price]
    
    if max_price is not None:
        filtered_products = [p for p in filtered_products if p["price"] <= max_price]
    
    if sort_by:
        if sort_by == "price-low":
            filtered_products.sort(key=lambda x: x["price"])
        elif sort_by == "price-high":
            filtered_products.sort(key=lambda x: x["price"], reverse=True)
    
    return filtered_products

@app.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: int):
    product = next((p for p in products_db if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.get("/products_with_Ai_Assitant/{product_name}", response_model=Product)
async def get_product_with_Ai_Assitant(product_name: str):
    product = next((p for p in products_db if p["product"] == product_name), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.post("/cart/{user_id}/add", response_model=List[CartItem])
async def add_to_cart(user_id: str, cart_item: CartItem):
    if user_id not in carts:
        carts[user_id] = []
    
    existing_item = next((item for item in carts[user_id] if item["id"] == cart_item.id), None)
    
    if existing_item:
        existing_item["quantity"] += cart_item.quantity
    else:
        carts[user_id].append(cart_item.dict())
    
    return carts[user_id]

@app.get("/cart/{user_id}", response_model=List[CartItem])
async def get_cart(user_id: str):
    return carts.get(user_id, [])

@app.put("/cart/{user_id}/update", response_model=List[CartItem])
async def update_cart(user_id: str, update: CartUpdate):
    if user_id not in carts:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    cart = carts[user_id]
    item = next((item for item in cart if item["id"] == update.product_id), None)
    
    if not item:
        raise HTTPException(status_code=404, detail="Item not found in cart")
    
    if update.quantity <= 0:
        cart.remove(item)
    else:
        item["quantity"] = update.quantity
    
    return cart

@app.delete("/cart/{user_id}/remove/{product_id}", response_model=List[CartItem])
async def remove_from_cart(user_id: str, product_id: int):
    if user_id not in carts:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    cart = carts[user_id]
    cart = [item for item in cart if item["id"] != product_id]
    carts[user_id] = cart
    
    return cart

@app.delete("/cart/{user_id}/clear", response_model=List[CartItem])
async def clear_cart(user_id: str):
    if user_id in carts:
        carts[user_id] = []
    return []

@app.post("/search", response_model=List[Product])
async def search_products(search_query: SearchQuery):
    filtered_products = products_db
    
    # Search by query
    if search_query.query:
        query = search_query.query.lower()
        filtered_products = [
            p for p in filtered_products
            if query in p["product"].lower() or
            query in p.get("description", "").lower() or
            any(query in cat.lower() for cat in p["categories"])
        ]
    
    # Apply filters
    if search_query.category:
        if search_query.category not in PRODUCT_CATEGORIES:
            raise HTTPException(status_code=400, detail=f"Invalid category. Must be one of: {', '.join(PRODUCT_CATEGORIES)}")
        filtered_products = [p for p in filtered_products if search_query.category in p["categories"]]
    
    if search_query.min_price is not None:
        filtered_products = [p for p in filtered_products if p["price"] >= search_query.min_price]
    
    if search_query.max_price is not None:
        filtered_products = [p for p in filtered_products if p["price"] <= search_query.max_price]
    
    # Apply sorting
    if search_query.sort_by:
        if search_query.sort_by == "price-low":
            filtered_products.sort(key=lambda x: x["price"])
        elif search_query.sort_by == "price-high":
            filtered_products.sort(key=lambda x: x["price"], reverse=True)
        elif search_query.sort_by == "rating":
            filtered_products.sort(key=lambda x: x.get("rating", 0), reverse=True)
    
    return filtered_products

def prepare_sentence(sentence: str, max_seq_len: int = 35) -> np.ndarray:
    input_seq = tokenizer.texts_to_sequences([sentence])
    input_features = pad_sequences(input_seq, maxlen=max_seq_len, padding='post')
    return input_features

@app.post("/personal_assistant", response_model=AIAssistantResponse)
async def process_ai_request(request: AIAssistantRequest):
    message = request.message.strip()
    
    try:
        navigation = None
        # Get intent prediction
        input_features = prepare_sentence(message)
        probs = intent_model.predict(input_features)
        predicted_y = probs.argmax(axis=-1)
        intent = label_encoder.classes_[predicted_y][0]
        
        # Get entity recognition
        doc = nlp_ner(message)
        entities = [{"text": ent.text, "label": ent.label_} for ent in doc.ents]
        
        # Generate response based on intent and entities
        if intent == "addToCart":
            # Filter entities to get only products and stores
            product_entities = [e for e in entities if e["label"] == "product"]
            store_entities = [e for e in entities if e["label"] == "store"]
            
            if product_entities and store_entities:
                # Get the first product and store found in the message
                # [0] gets the first item in the list, ["text"] gets the actual text content
                product_name = product_entities[0]["text"]
                store = store_entities[0]["text"]
                
                try:
                    # First check if product exists
                    product = await get_product_with_Ai_Assitant(product_name)
                    
                    # If product exists, create cart item and add to cart
                    cart_item = CartItem(
                        id=product["id"],
                        product=product["product"],
                        price=product["price"],
                        quantity=1,  # Default quantity
                        image=product["image"],
                        store=product["store"]
                    )
                    
                    # Add to cart
                    await add_to_cart("default_user", cart_item)
                    response = f"I've added {product_name} from {store} to your cart. Would you like to view your cart or continue shopping?"
                except HTTPException as e:
                    if e.status_code == 404:
                        response = f"I couldn't find {product_name} in our catalog. Would you like to search for similar products?"
                    else:
                        print(f"HTTPException during addToCart: {e}")  # Log the exception
                        response = "Sorry, I encountered an error while adding the item to your cart. Please try again."
                except Exception as e:
                    print(f"Unexpected exception during addToCart: {e}")  # Log unexpected exceptions
                    response = "Sorry, I encountered an error while adding the item to your cart. Please try again."
            else:
                response = "Could you please specify the product and store you'd like to add? For example: 'Add Garri from Mama Nkechi's Groceries'"

        elif intent == "removeFromCart":
            product_entities = [e for e in entities if e["label"] == "product"]
            if product_entities:
                product_name = product_entities[0]["text"]
                try:
                    product = await get_product_with_Ai_Assitant(product_name)
                    await remove_from_cart("default_user", product["id"])
                    response = f"I've removed {product_name} from your cart. Would you like to view your updated cart?"
                except HTTPException as e:
                    if e.status_code == 404:
                        response = f"I couldn't find {product_name} in your cart. Would you like to view your cart to see what's there?"
                    else:
                        response = "Sorry, I encountered an error while removing the item. Please try again."
            else:
                response = "Could you please specify which product you'd like to remove from your cart?"

        elif intent == "searchProduct":
            product_entities = [e for e in entities if e["label"] == "product"]
            
            if product_entities:
                product_name = product_entities[0]["text"]
                try:
                    product = await get_product_with_Ai_Assitant(product_name)
                    response = f"I found {product['product']} for ₦{product['price']} at {product['store']}. Would you like to add it to your cart?"
                except HTTPException:
                    # If exact product not found, search for similar products
                    search_results = await search_products(SearchQuery(query=product_name))
                    if search_results:
                        response = f"I found similar products: {', '.join([p['product'] for p in search_results[:3]])}. Would you like to see more details about any of these?"
                    else:
                        response = f"I couldn't find {product_name}. Would you like to try a different search term?"
            else:
                response = "Could you please specify what you're looking for? You can search by product name."

        elif intent == "viewCart":
            cart_items = await get_cart("default_user")
            if cart_items:
                response = f"Here is your cart, Would you like to remove any items or proceed to checkout?"
                # Add navigation to cart page
                navigation = {"path": "/cart", "action": "navigate"}
            else:
                response = "Your cart is empty. Would you like to browse some products?"
        elif intent == "greeting":
            response = "Hello! I'm your NaijaMarket shopping assistant. How can I help you today? You can ask me to:\n- Add items to your cart\n- Search for products\n- View your cart\n- Remove items from cart"

        return AIAssistantResponse(
            message=response,
            intent=intent,
            entities=entities,
            navigation=navigation
        )
        
    except Exception as e:
        print(f"Error processing request: {e}")
        return AIAssistantResponse(
            message="Sorry, I encountered an error processing your request. Please try again."
        )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 