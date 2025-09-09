from pydantic import BaseModel
from typing import List

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

# 👇 Thêm schema cho đăng nhập
class LoginSchema(BaseModel):
    username: str
    password: str
