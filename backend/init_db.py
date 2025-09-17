import sqlite3

def init_db():
    conn = sqlite3.connect("kikuu_store.db")
    cursor = conn.cursor()
    
    # Tạo bảng products
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            category TEXT NOT NULL,
            image TEXT NOT NULL,
            description TEXT NOT NULL,
            specs TEXT NOT NULL
        )
    """)
    
    # Tạo bảng users
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    """)

    # Tạo bảng orders (đơn hàng)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            total_amount REAL NOT NULL,
            shipping_address TEXT NOT NULL,
            phone_number TEXT NOT NULL,
            order_date TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'Pending',
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)

    # Tạo bảng order_items (chi tiết sản phẩm trong đơn hàng)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
    """)
    
    # Dữ liệu mẫu cho products (giữ nguyên hoặc cập nhật nếu muốn)
    products = [
        # Quần áo
        ("Áo vest nam", 150000, "clothing", "https://global2019-static-cdn.kikuu.com/k-s-oss-16470779199493TmQtEMTwM.jpg?x-oss-process=style/p_list", "Áo vest nam thời trang, phong cách lịch lãm", "Chất liệu vải cao cấp;Phù hợp công sở;Kích cỡ M,L,XL"),
        ("Quần jeans nữ", 250000, "clothing", "https://global2019-static-cdn.kikuu.com/k-s-oss-1744443999259NZFH5wsNx4.jpg?x-oss-process=style/p_list", "Quần jeans nữ dáng ôm, trẻ trung", "Vải jeans co giãn;Kích cỡ 26-30;Thiết kế hiện đại"),
        ("Áo sơ mi nam", 200000, "clothing", "https://global2019-static-cdn.kikuu.com/k-s-oss-1684914694527KYN6cMpcTz.jpg?x-oss-process=style/p_list", "Áo sơ mi nam chất liệu thoáng mát", "Vải cotton;Kích cỡ M,L,XL;Màu sắc đa dạng"),
        ("Váy nữ xòe", 300000, "clothing", "https://global2019-static-cdn.kikuu.com/k-s-oss-1729823900155z3Jn6Brrxy.jpg?x-oss-process=style/p_list", "Váy nữ dáng xòe, phù hợp dự tiệc", "Chất liệu voan;Kích cỡ S,M,L;Thiết kế thanh lịch"),
        ("Áo khoác nam", 400000, "clothing", "https://global2019-static-cdn.kikuu.com/upload-productImg-1629887679039.jpeg?x-oss-process=style/p_list", "Áo khoác nam phong cách năng động", "Chất liệu dù;Chống thấm nhẹ;Kích cỡ M,L,XL"),
        ("Quần jeans nam", 180000, "clothing", "https://global2019-static-cdn.kikuu.com/upload-productImg-89429416307162743.jpg?x-oss-process=style/p_list", "Quần jeans nam dáng slim fit", "Vải jeans bền;Kích cỡ 28-34;Phong cách trẻ trung"),
        ("Áo khoác nữ", 550000, "clothing", "https://global2019-static-cdn.kikuu.com/upload-productImg-63696501604434258.jpg?x-oss-process=style/p_list", "Áo khoác nữ thời trang, giữ ấm tốt", "Chất liệu len cao cấp;Kích cỡ S,M,L;Thiết kế hiện đại"),
        ("Đồ bộ thể thao nam", 350000, "clothing", "https://global2019-static-cdn.kikuu.com/upload-productImg-27499357381097741.jpg?x-oss-process=style/p_list", "Đồ bộ thể thao nam thoải mái", "Vải thun co giãn;Kích cỡ M,L,XL;Thoáng khí"),
        ("Quần tây nam", 270000, "clothing", "https://global2019-static-cdn.kikuu.com/upload-productImg-1634276995281.jpeg?x-oss-process=style/p_list", "Quần tây nam lịch sự, phù hợp công sở", "Chất liệu vải cao cấp;Kích cỡ 28-34;Thiết kế thanh lịch"),
        ("Áo len nam", 320000, "clothing", "https://global2019-static-cdn.kikuu.com/upload-productImg-87508149090466335.jpg?x-oss-process=style/p_list", "Áo len nam ấm áp, thời trang", "Chất liệu len mềm;Kích cỡ M,L,XL;Màu sắc trung tính"),
        # Giày
        ("Giày thể thao nam", 300000, "shoes", "https://global2019-static-cdn.kikuu.com/upload-productImg-45103808106168598.jpg?x-oss-process=style/p_list", "Giày thể thao nam năng động", "Đế cao su chống trượt;Kích cỡ 39-43;Thoáng khí"),
        ("Giày cao gót nữ", 400000, "shoes", "https://global2019-static-cdn.kikuu.com/upload-productImg-29710838965573851.jpg?x-oss-process=style/p_list", "Giày cao gót nữ thanh lịch", "Chiều cao gót 7cm;Chất liệu da tổng hợp;Kích cỡ 35-39"),
        ("Giày thể thao nữ", 220000, "shoes", "https://global2019-static-cdn.kikuu.com/upload-productImg-1622702504037.jpeg?x-oss-process=style/p_list", "Giày thể thao nữ nhẹ nhàng", "Đế cao su mềm;Kích cỡ 35-39;Phong cách trẻ trung"),
        ("Giày lười nam", 350000, "shoes", "https://global2019-static-cdn.kikuu.com/upload-productImg-29643520629230151.jpg?x-oss-process=style/p_list", "Giày lười nam tiện lợi", "Chất liệu da tổng hợp;Kích cỡ 39-43;Dễ phối đồ"),
        ("Giày vải nam", 500000, "shoes", "https://global2019-static-cdn.kikuu.com/k-s-oss-1710400107612PfFEYDAGPT.jpg?x-oss-process=style/p_list", "Giày vải nam thời trang", "Chất liệu vải thoáng khí;Kích cỡ 39-43;Thiết kế hiện đại"),
        ("Dép nam", 280000, "shoes", "https://global2019-static-cdn.kikuu.com/k-s-oss-1726563829362TSQAG2pjpY.png?x-oss-process=style/p_list", "Dép nam thoải mái", "Chất liệu cao su;Kích cỡ 39-43;Chống trượt"),
        ("Giày da nam", 450000, "shoes", "https://global2019-static-cdn.kikuu.com/upload-productImg-71458708945690809.jpeg?x-oss-process=style/p_list", "Giày da nam lịch lãm", "Chất liệu da cao cấp;Kích cỡ 39-43;Thiết kế cổ điển"),
        ("Dép nữ", 260000, "shoes", "https://global2019-static-cdn.kikuu.com/k-s-oss-17370077153447PfGF34sW5.jpg?x-oss-process=style/p_list", "Dép nữ thời trang", "Chất liệu cao su mềm;Kích cỡ 35-39;Phong cách trẻ trung"),
        ("Giày thể thao nữ", 330000, "shoes", "https://global2019-static-cdn.kikuu.com/k-s-oss-1679298949949HzQrzJ4WeA.jpg?x-oss-process=style/p_list", "Giày thể thao nữ năng động", "Đế cao su chống trượt;Kích cỡ 35-39;Thoáng khí"),
        ("Giày nam", 400000, "shoes", "https://global2019-static-cdn.kikuu.com/upload-productImg-1635238057620.jpeg?x-oss-process=style/p_list", "Giày nam đa phong cách", "Chất liệu da tổng hợp;Kích cỡ 39-43;Dễ phối đồ"),
        # Túi xách
        ("Túi xách nữ thời trang", 350000, "bags", "https://global2019-static-cdn.kikuu.com/upload-productImg-1555842103413.jpeg?x-oss-process=style/p_list", "Túi xách nữ phong cách hiện đại", "Chất liệu da tổng hợp;Dung tích vừa;Có dây đeo"),
        ("Balo nam đi học", 280000, "bags", "https://global2019-static-cdn.kikuu.com/upload-productImg-1554731863751.jpeg?x-oss-process=style/p_list", "Balo nam tiện lợi cho học tập", "Chất liệu vải dù;Ngăn đựng laptop;Khóa kéo chắc chắn"),
        ("Túi đeo chéo nữ", 220000, "bags", "https://global2019-static-cdn.kikuu.com/k-s-oss-16485241352152fe3DXyJPn.jpg?x-oss-process=style/p_list", "Túi đeo chéo nữ nhỏ gọn", "Chất liệu da tổng hợp;Kích thước nhỏ;Phong cách trẻ trung"),
        ("Balo du lịch", 450000, "bags", "https://global2019-static-cdn.kikuu.com/upload-productImg-46072512382553549.jpg?x-oss-process=style/p_list", "Balo du lịch bền bỉ", "Chất liệu vải chống thấm;Dung tích lớn;Có ngăn đa năng"),
        ("Túi xách nữ", 300000, "bags", "https://global2019-static-cdn.kikuu.com/upload-productImg-1604911990283.jpeg?x-oss-process=style/p_list", "Túi xách nữ thanh lịch", "Chất liệu da tổng hợp;Thiết kế tối giản;Có dây đeo"),
        ("Túi đeo vai nữ", 180000, "bags", "https://global2019-static-cdn.kikuu.com/k-s-oss-1716390115060A7XZhnnCPh.jpg?x-oss-process=style/p_list", "Túi đeo vai nữ thời trang", "Chất liệu vải canvas;Kích thước vừa;Phong cách năng động"),
        ("Ví nam", 500000, "bags", "https://global2019-static-cdn.kikuu.com/upload-productImg-18662617502199927.jpg?x-oss-process=style/p_list", "Ví nam cao cấp", "Chất liệu da thật;Ngăn đựng thẻ;Thiết kế nhỏ gọn"),
        ("Túi xách nữ", 260000, "bags", "https://global2019-static-cdn.kikuu.com/upload-productImg-30267582874769652.jpg?x-oss-process=style/p_list", "Túi xách nữ phong cách", "Chất liệu da tổng hợp;Thiết kế thời trang;Có dây đeo"),
        ("Túi xách nam", 210000, "bags", "https://global2019-static-cdn.kikuu.com/upload-productImg-29060445527628915.jpg?x-oss-process=style/p_list", "Túi xách nam đa năng", "Chất liệu vải dù;Ngăn đựng laptop;Phong cách lịch lãm"),
        ("Túi du lịch nữ", 600000, "bags", "https://global2019-static-cdn.kikuu.com/k-s-oss-1658474668731AhpSXpsSfB.jpg?x-oss-process=style/p_list", "Túi du lịch nữ thời trang", "Chất liệu vải chống thấm;Dung tích lớn;Thiết kế hiện đại"),
        # Phụ kiện
        ("Đồng hồ nữ", 120000, "accessories", "https://global2019-static-cdn.kikuu.com/k-s-oss-1713544788079HBmjS6zYWE.jpg?x-oss-process=style/p_list", "Đồng hồ nữ thời trang", "Chất liệu thép không gỉ;Mặt kính chống xước;Thiết kế thanh lịch"),
        ("Đồng hồ nam", 90000, "accessories", "https://global2019-static-cdn.kikuu.com/upload-productImg-77245117381527466.jpg?x-oss-process=style/p_list", "Đồng hồ nam phong cách", "Chất liệu dây da;Mặt kính cường lực;Chống nước nhẹ"),
        ("Đồng hồ nữ", 80000, "accessories", "https://global2019-static-cdn.kikuu.com/upload-productImg-13897595275054834.jpg?x-oss-process=style/p_list", "Đồng hồ nữ nhỏ gọn", "Chất liệu dây da;Mặt kính chống xước;Phong cách tối giản"),
        ("Đồng hồ nam", 70000, "accessories", "https://global2019-static-cdn.kikuu.com/k-s-oss-1697963749950we4aNaf3mw.jpg?x-oss-process=style/p_list", "Đồng hồ nam năng động", "Chất liệu dây vải;Chống nước;Thiết kế thể thao"),
        ("Vòng tay nữ", 130000, "accessories", "https://global2019-static-cdn.kikuu.com/k-s-oss-1726105769246SjKKWZzXR6.jpg?x-oss-process=style/p_list", "Vòng tay nữ thời trang", "Chất liệu hợp kim;Thiết kế tinh tế;Phù hợp mọi dịp"),
        ("Bông tai nữ", 60000, "accessories", "https://global2019-static-cdn.kikuu.com/upload-productImg-1596598826229.jpeg?x-oss-process=style/p_list", "Bông tai nữ thanh lịch", "Chất liệu hợp kim;Thiết kế nhỏ gọn;Phong cách tối giản"),
        ("Đồng hồ nữ", 110000, "accessories", "https://global2019-static-cdn.kikuu.com/upload-productImg-74150899822205090.jpg?x-oss-process=style/p_list", "Đồng hồ nữ phong cách", "Chất liệu dây da;Mặt kính cường lực;Thiết kế hiện đại"),
        ("Dây chuyền", 150000, "accessories", "https://global2019-static-cdn.kikuu.com/upload-productImg-1633692759264.jpeg?x-oss-process=style/p_list", "Dây chuyền thời trang", "Chất liệu hợp kim;Thiết kế tinh tế;Phù hợp dự tiệc"),
        ("Vòng tay nữ", 90000, "accessories", "https://global2019-static-cdn.kikuu.com/upload-productImg-1599126869111.jpeg?x-oss-process=style/p_list", "Vòng tay nữ nhẹ nhàng", "Chất liệu hợp kim;Thiết kế tối giản;Phù hợp hàng ngày"),
        ("Bộ trang sức nữ", 140000, "accessories", "https://global2019-static-cdn.kikuu.com/k-s-oss-1714060627913tPhPeheQ7W.jpg?x-oss-process=style/p_list", "Bộ trang sức nữ sang trọng", "Chất liệu hợp kim;Bông tai và dây chuyền;Thiết kế thanh lịch"),
    ]
    
    cursor.executemany(
        "INSERT OR REPLACE INTO products (name, price, category, image, description, specs) VALUES (?, ?, ?, ?, ?, ?)",
        products
    )
    
    conn.commit()
    conn.close()
    print("Khởi tạo cơ sở dữ liệu thành công!")

if __name__ == "__main__":
    init_db()