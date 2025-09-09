from pydantic import BaseModel
from typing import List

class Product(BaseModel):
    id: int
    name: str
    price: float
    category: str
    image: str
    description: str
    specs: List[str]

class User(BaseModel):
    id: int
    username: str
    email: str
    password: str