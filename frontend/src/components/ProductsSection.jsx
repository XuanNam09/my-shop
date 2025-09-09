import React, { useState } from 'react';

function ProductsSection({ isVisible, addToCart, showProductModal }) {
    const [category, setCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const products_by_category = {
        "Quần áo": [
            {"id": "1", "name": "Áo vest nam", "price": 150000, "imageUrl": "https://global2019-static-cdn.kikuu.com/k-s-oss-16470779199493TmQtEMTwM.jpg?x-oss-process=style/p_list"},
            {"id": "2", "name": "Quần jeans nữ", "price": 250000, "imageUrl": "https://global2019-static-cdn.kikuu.com/k-s-oss-1744443999259NZFH5wsNx4.jpg?x-oss-process=style/p_list"},
            {"id": "3", "name": "Áo sơ mi nam", "price": 200000, "imageUrl": "https://global2019-static-cdn.kikuu.com/k-s-oss-1684914694527KYN6cMpcTz.jpg?x-oss-process=style/p_list"},
            {"id": "4", "name": "Váy nữ xòe", "price": 300000, "imageUrl": "https://global2019-static-cdn.kikuu.com/k-s-oss-1729823900155z3Jn6Brrxy.jpg?x-oss-process=style/p_list"},
            {"id": "5", "name": "Áo khoác nam", "price": 400000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-1629887679039.jpeg?x-oss-process=style/p_list"},
            {"id": "6", "name": "Quần jeans nam", "price": 180000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-89429416307162743.jpg?x-oss-process=style/p_list"},
            {"id": "7", "name": "Áo khoác nữ", "price": 550000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-63696501604434258.jpg?x-oss-process=style/p_list"},
            {"id": "8", "name": "Đồ bộ thể thao nam", "price": 350000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-27499357381097741.jpg?x-oss-process=style/p_list"},
            {"id": "9", "name": "Quần tây nam", "price": 270000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-1634276995281.jpeg?x-oss-process=style/p_list"},
            {"id": "10", "name": "Áo len nam", "price": 320000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-87508149090466335.jpg?x-oss-process=style/p_list"},
        ],
        "Giày": [
            {"id": "11", "name": "Giày thể thao nam", "price": 300000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-45103808106168598.jpg?x-oss-process=style/p_list"},
            {"id": "12", "name": "Giày cao gót nữ", "price": 400000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-29710838965573851.jpg?x-oss-process=style/p_list"},
            {"id": "13", "name": "Giày thể thao nữ", "price": 220000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-1622702504037.jpeg?x-oss-process=style/p_list"},
            {"id": "14", "name": "Giày lười nam", "price": 350000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-29643520629230151.jpg?x-oss-process=style/p_list"},
            {"id": "15", "name": "Giày vải nam", "price": 500000, "imageUrl": "https://global2019-static-cdn.kikuu.com/k-s-oss-1710400107612PfFEYDAGPT.jpg?x-oss-process=style/p_list"},
            {"id": "16", "name": "Dép nam", "price": 280000, "imageUrl": "https://global2019-static-cdn.kikuu.com/k-s-oss-1726563829362TSQAG2pjpY.png?x-oss-process=style/p_list"},
            {"id": "17", "name": "Giày da nam", "price": 450000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-71458708945690809.jpeg?x-oss-process=style/p_list"},
            {"id": "18", "name": "Dép nữ", "price": 260000, "imageUrl": "https://global2019-static-cdn.kikuu.com/k-s-oss-17370077153447PfGF34sW5.jpg?x-oss-process=style/p_list"},
            {"id": "19", "name": "Giày thể thao nữ", "price": 330000, "imageUrl": "https://global2019-static-cdn.kikuu.com/k-s-oss-1679298949949HzQrzJ4WeA.jpg?x-oss-process=style/p_list"},
            {"id": "20", "name": "Giày nam", "price": 400000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-1635238057620.jpeg?x-oss-process=style/p_list"},
        ],
        "Túi xách": [
            {"id": "21", "name": "Túi xách nữ thời trang", "price": 350000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-1555842103413.jpeg?x-oss-process=style/p_list"},
            {"id": "22", "name": "Balo nam đi học", "price": 280000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-1554731863751.jpeg?x-oss-process=style/p_list"},
            {"id": "23", "name": "Túi đeo chéo nữ", "price": 220000, "imageUrl": "https://global2019-static-cdn.kikuu.com/k-s-oss-16485241352152fe3DXyJPn.jpg?x-oss-process=style/p_list"},
            {"id": "24", "name": "Balo du lịch", "price": 450000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-46072512382553549.jpg?x-oss-process=style/p_list"},
            {"id": "25", "name": "Túi xách nữ", "price": 300000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-1604911990283.jpeg?x-oss-process=style/p_list"},
            {"id": "26", "name": "Túi đeo vai nữ", "price": 180000, "imageUrl": "https://global2019-static-cdn.kikuu.com/k-s-oss-1716390115060A7XZhnnCPh.jpg?x-oss-process=style/p_list"},
            {"id": "27", "name": "Ví nam", "price": 500000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-18662617502199927.jpg?x-oss-process=style/p_list"},
            {"id": "28", "name": "Túi xách nữ", "price": 260000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-30267582874769652.jpg?x-oss-process=style/p_list"},
            {"id": "29", "name": "Túi xách nam", "price": 210000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-29060445527628915.jpg?x-oss-process=style/p_list"},
            {"id": "30", "name": "Túi du lịch nữ", "price": 600000, "imageUrl": "https://global2019-static-cdn.kikuu.com/k-s-oss-1658474668731AhpSXpsSfB.jpg?x-oss-process=style/p_list"},
        ],
        "Phụ kiện": [
            {"id": "31", "name": "Đồng hồ nữ", "price": 120000, "imageUrl": "https://global2019-static-cdn.kikuu.com/k-s-oss-1713544788079HBmjS6zYWE.jpg?x-oss-process=style/p_list"},
            {"id": "32", "name": "Đồng hồ nam", "price": 90000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-77245117381527466.jpg?x-oss-process=style/p_list"},
            {"id": "33", "name": "Đồng hồ nữ", "price": 80000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-13897595275054834.jpg?x-oss-process=style/p_list"},
            {"id": "34", "name": "Đồng hồ nam", "price": 70000, "imageUrl": "https://global2019-static-cdn.kikuu.com/k-s-oss-1697963749950we4aNaf3mw.jpg?x-oss-process=style/p_list"},
            {"id": "35", "name": "Vòng tay nữ", "price": 130000, "imageUrl": "https://global2019-static-cdn.kikuu.com/k-s-oss-1726105769246SjKKWZzXR6.jpg?x-oss-process=style/p_list"},
            {"id": "36", "name": "Bông tai nữ", "price": 60000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-1596598826229.jpeg?x-oss-process=style/p_list"},
            {"id": "37", "name": "Đồng hồ nữ", "price": 110000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-74150899822205090.jpg?x-oss-process=style/p_list"},
            {"id": "38", "name": "Dây chuyền", "price": 150000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-1633692759264.jpeg?x-oss-process=style/p_list"},
            {"id": "39", "name": "Vòng tay nữ", "price": 90000, "imageUrl": "https://global2019-static-cdn.kikuu.com/upload-productImg-1599126869111.jpeg?x-oss-process=style/p_list"},
            {"id": "40", "name": "Bộ trang sức nữ", "price": 140000, "imageUrl": "https://global2019-static-cdn.kikuu.com/k-s-oss-1714060627913tPhPeheQ7W.jpg?x-oss-process=style/p_list"},
        ],
    };

    // Chuyển đổi products_by_category thành mảng phẳng với category và description
    const products = Object.keys(products_by_category).flatMap(categoryKey =>
        products_by_category[categoryKey].map(product => ({
            ...product,
            category: categoryKey === "Quần áo" ? "clothing" :
                     categoryKey === "Giày" ? "shoes" :
                     categoryKey === "Túi xách" ? "bags" :
                     categoryKey === "Phụ kiện" ? "accessories" : "",
            description: `${product.name} - Sản phẩm thời trang chất lượng cao`,
            image: product.imageUrl
        }))
    );

    const filteredProducts = products.filter(product => 
        (category ? product.category === category : true) &&
        (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
         product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <section id="productsSection" className={`py-20 bg-gray-50 ${isVisible ? '' : 'hidden'}`}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Sản phẩm thời trang</h2>
                        <p className="text-xl text-gray-600">Khám phá các sản phẩm thời thượng</p>
                    </div>
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            className="px-6 py-3 border-0 rounded-2xl bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <select
                            id="categoryFilter"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="px-6 py-3 border-0 rounded-2xl bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                        >
                            <option value="">Tất cả danh mục</option>
                            <option value="clothing">Quần áo</option>
                            <option value="shoes">Giày</option>
                            <option value="bags">Túi xách</option>
                            <option value="accessories">Phụ kiện</option>
                        </select>
                    </div>
                </div>
                <div id="productsGrid" className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className="bg-white rounded-3xl shadow-lg overflow-hidden product-card cursor-pointer group"
                                onClick={() => setSelectedCategory(product.category)}
                            >
                                <div className="p-6">
                                    <div className="text-center mb-4">
                                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" />
                                        <div className="h-1 w-16 bg-orange-500 rounded-full mx-auto mb-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-orange-500 transition-colors">{product.name}</h3>
                                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="price-tag text-lg font-bold">{formatPrice(product.price)}</span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                                            className="btn-primary text-white px-6 py-2 rounded-xl font-semibold text-sm shadow-lg"
                                        >
                                            Thêm vào giỏ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Không tìm thấy sản phẩm nào.</p>
                    )}
                </div>
                {selectedCategory && (
                    <div className="py-10 bg-white">
                        <h3 className="text-4xl font-bold text-gray-800 text-center mb-12"># Danh sách sản phẩm theo danh mục</h3>
                        <h4 className="text-2xl font-semibold text-orange-500 mb-6 text-center">
                            {selectedCategory === "clothing" ? "Quần áo" :
                             selectedCategory === "shoes" ? "Giày" :
                             selectedCategory === "bags" ? "Túi xách" :
                             selectedCategory === "accessories" ? "Phụ kiện" : ""}
                        </h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {products
                                .filter(p => p.category === selectedCategory)
                                .map(product => (
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-3xl shadow-lg overflow-hidden product-card cursor-pointer group"
                                        onClick={() => showProductModal(product)}
                                    >
                                        <div className="p-6">
                                            <div className="text-center mb-4">
                                                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" />
                                                <div className="h-1 w-16 bg-orange-500 rounded-full mx-auto mb-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-orange-500 transition-colors">{product.name}</h3>
                                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="price-tag text-lg font-bold">{formatPrice(product.price)}</span>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                                                    className="btn-primary text-white px-6 py-2 rounded-xl font-semibold text-sm shadow-lg"
                                                >
                                                    Thêm vào giỏ
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="mt-8 bg-orange-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-orange-600 transition-all mx-auto block"
                        >
                            Đóng
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ProductsSection;