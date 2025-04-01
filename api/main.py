from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import uvicorn

app = FastAPI(title="NaijaMarket API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class Product(BaseModel):
    id: int
    name: str
    price: float
    image: str
    categories: List[str]
    rating: Optional[float] = None
    vendor: Optional[str] = None
    badge: Optional[str] = None
    description: Optional[str] = None

class CartItem(BaseModel):
    id: int
    name: str
    price: float
    quantity: int
    image: str
    vendor: str

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

# Sample product database
products_db = [
    {
        "id": 1,
        "name": "Ankara Fabric Tote Bag",
        "price": 4500,
        "image": "/images/product-tote.jpg",
        "categories": ["accessories", "fashion"],
        "rating": 4.5,
        "vendor": "Lagos Crafts",
        "description": "Beautiful handcrafted Ankara tote bag"
    },
    # ... Add more products
]

# In-memory cart storage (in production, use a database)
carts = {}

@app.get("/")
async def root():
    return {"message": "Welcome to NaijaMarket API"}

@app.get("/products", response_model=List[Product])
async def get_products(
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    sort_by: Optional[str] = None
):
    filtered_products = products_db
    
    if category:
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
            if query in p["name"].lower() or
            query in p.get("description", "").lower() or
            any(query in cat.lower() for cat in p["categories"])
        ]
    
    # Apply filters
    if search_query.category:
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

@app.post("/personal_assistant", response_model=AIAssistantResponse)
async def process_ai_request(request: AIAssistantRequest):
    message = request.message.lower().strip()
    
    # Simple greeting detection
    greetings = ["hi", "hello", "hey"]
    if message in greetings:
        return AIAssistantResponse(
            message="Hello! I'm your AI shopping assistant. How can I help you today?"
        )
    
    # Default response for unrecognized messages
    return AIAssistantResponse(
        message="I'm not sure how to help with that. Could you please rephrase your request?"
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 