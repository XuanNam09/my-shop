from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from typing import List
from database import get_db
from schemas import ProductSchema, UserSchema, UserCreate, LoginSchema

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🚀 Tạo bảng nếu chưa có
def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

init_db()

@app.get("/products", response_model=List[ProductSchema])
async def get_products():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()
    conn.close()
    return [ProductSchema(
        id=row[0],
        name=row[1],
        price=row[2],
        category=row[3],
        image=row[4],
        description=row[5],
        specs=row[6].split(";")
    ) for row in products]

@app.get("/products/{product_id}", response_model=ProductSchema)
async def get_product(product_id: int):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products WHERE id = ?", (product_id,))
    product = cursor.fetchone()
    conn.close()
    if not product:
        raise HTTPException(status_code=404, detail="Không tìm thấy sản phẩm")
    return ProductSchema(
        id=product[0],
        name=product[1],
        price=product[2],
        category=product[3],
        image=product[4],
        description=product[5],
        specs=product[6].split(";")
    )

@app.post("/register")
async def register(user: UserCreate):
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            (user.username, user.email, user.password)  # ⚠️ Demo: chưa hash password
        )
        conn.commit()
        conn.close()
        return {"success": True, "username": user.username}
    except sqlite3.IntegrityError:
        conn.close()
        raise HTTPException(status_code=400, detail="Tên người dùng hoặc email đã tồn tại")

@app.post("/login")
async def login(user: LoginSchema):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        (user.username, user.password)
    )
    db_user = cursor.fetchone()
    conn.close()
    if not db_user:
        raise HTTPException(status_code=401, detail="Tên người dùng hoặc mật khẩu không đúng")
    return {"success": True, "username": db_user[1]}
