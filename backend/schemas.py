from pydantic import BaseModel
from typing import List, Optional

class ProductSchema(BaseModel):
    id: int
    name: str
    price: float
    category: str
    image: str
    description: str
    specs: List[str]

    class Config:
        orm_mode = True

class UserSchema(BaseModel):
    id: int
    username: str
    email: str
    password: str

    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class LoginSchema(BaseModel):
    username: str
    password: str

# --- Schemas mới cho chức năng đặt hàng và thanh toán ---

class CartItemSchema(BaseModel):
    product_id: int
    name: str
    price: float
    quantity: int

class CheckoutSchema(BaseModel):
    user_id: Optional[int] = None  # Có thể là None nếu là khách vãng lai
    cart_items: List[CartItemSchema]
    shipping_address: str
    phone_number: str
    total_amount: float

class OrderItemResponse(BaseModel):
    product_id: int
    name: str
    quantity: int
    price: float

class OrderResponse(BaseModel):
    id: int
    user_id: Optional[int]
    total_amount: float
    shipping_address: str
    phone_number: str
    order_date: str
    status: str
    items: List[OrderItemResponse] = [] # Danh sách các sản phẩm trong đơn hàng

    class Config:
        orm_mode = True

class CategorySchema(BaseModel):
    name: str