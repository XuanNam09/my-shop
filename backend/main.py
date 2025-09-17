from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from typing import List, Optional
from database import get_db
from schemas import ProductSchema, UserCreate, LoginSchema, CheckoutSchema, OrderResponse, CategorySchema
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mật khẩu mã hóa
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Bí mật và thuật toán mã hóa JWT (bạn nên đổi bí mật này)
SECRET_KEY = "your_secret_key_here_change_it"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 ngày

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            return None
        return username
    except JWTError:
        return None

# Khởi tạo bảng users nếu chưa có
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

# API lấy danh sách sản phẩm
@app.get("/products", response_model=List[ProductSchema])
async def get_products(category: Optional[str] = None):
    conn = get_db()
    cursor = conn.cursor()
    if category:
        cursor.execute("SELECT * FROM products WHERE category = ?", (category,))
    else:
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

# API lấy chi tiết sản phẩm
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

# API lấy danh sách danh mục sản phẩm
@app.get("/categories", response_model=List[CategorySchema])
async def get_categories():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT category FROM products")
    categories = cursor.fetchall()
    conn.close()
    return [{"name": row[0]} for row in categories]

# API đăng ký người dùng với mã hóa mật khẩu
@app.post("/register")
async def register(user: UserCreate):
    conn = get_db()
    cursor = conn.cursor()
    hashed_password = get_password_hash(user.password)
    try:
        cursor.execute(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            (user.username, user.email, hashed_password)
        )
        conn.commit()
        conn.close()
        return {"success": True, "username": user.username}
    except sqlite3.IntegrityError:
        conn.close()
        raise HTTPException(status_code=400, detail="Tên người dùng hoặc email đã tồn tại")

# API đăng nhập người dùng, trả về token JWT
@app.post("/login")
async def login(user: LoginSchema):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT * FROM users WHERE username = ?",
        (user.username,)
    )
    db_user = cursor.fetchone()
    conn.close()
    if not db_user or not verify_password(user.password, db_user[3]):
        raise HTTPException(status_code=401, detail="Tên người dùng hoặc mật khẩu không đúng")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user[1]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "username": db_user[1]}

# Dependency xác thực token
def get_current_user(authorization: Optional[str] = Header(None)):
    if authorization is None or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token không hợp lệ")
    token = authorization.split(" ")[1]
    username = decode_access_token(token)
    if username is None:
        raise HTTPException(status_code=401, detail="Token không hợp lệ hoặc hết hạn")
    return username

# API thanh toán - tạo đơn hàng mới
@app.post("/checkout")
async def checkout(order: CheckoutSchema, current_user: str = Depends(get_current_user)):
    conn = get_db()
    cursor = conn.cursor()

    # Lấy user_id từ username hiện tại
    cursor.execute("SELECT id FROM users WHERE username = ?", (current_user,))
    user_row = cursor.fetchone()
    user_id = user_row[0] if user_row else None

    # Nếu user_id không khớp với order.user_id (nếu có), từ chối
    if order.user_id and order.user_id != user_id:
        conn.close()
        raise HTTPException(status_code=403, detail="Không có quyền tạo đơn hàng cho người dùng khác")

    # Tạo đơn hàng
    order_date = datetime.utcnow().isoformat()
    cursor.execute(
        "INSERT INTO orders (user_id, total_amount, shipping_address, phone_number, order_date, status) VALUES (?, ?, ?, ?, ?, ?)",
        (user_id, order.total_amount, order.shipping_address, order.phone_number, order_date, "Pending")
    )
    order_id = cursor.lastrowid

    # Thêm các sản phẩm vào order_items
    for item in order.cart_items:
        cursor.execute(
            "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
            (order_id, item.product_id, item.quantity, item.price)
        )

    conn.commit()
    conn.close()

    return {"success": True, "order_id": order_id, "message": "Đơn hàng đã được tạo thành công"}

# API lấy đơn hàng của người dùng (tùy chọn)
@app.get("/orders", response_model=List[OrderResponse])
async def get_orders(current_user: str = Depends(get_current_user)):
    conn = get_db()
    cursor = conn.cursor()

    # Lấy user_id
    cursor.execute("SELECT id FROM users WHERE username = ?", (current_user,))
    user_row = cursor.fetchone()
    if not user_row:
        conn.close()
        raise HTTPException(status_code=404, detail="Người dùng không tồn tại")
    user_id = user_row[0]

    # Lấy đơn hàng của user
    cursor.execute("SELECT * FROM orders WHERE user_id = ?", (user_id,))
    orders = cursor.fetchall()

    result = []
    for order in orders:
        order_id = order[0]
        cursor.execute("SELECT product_id, quantity, price FROM order_items WHERE order_id = ?", (order_id,))
        items = cursor.fetchall()
        item_list = []
        for item in items:
            # Lấy tên sản phẩm
            cursor.execute("SELECT name FROM products WHERE id = ?", (item[0],))
            product_name = cursor.fetchone()
            item_list.append({
                "product_id": item[0],
                "name": product_name[0] if product_name else "Unknown",
                "quantity": item[1],
                "price": item[2]
            })
        result.append({
            "id": order[0],
            "user_id": order[1],
            "total_amount": order[2],
            "shipping_address": order[3],
            "phone_number": order[4],
            "order_date": order[5],
            "status": order[6],
            "items": item_list
        })

    conn.close()
    return result