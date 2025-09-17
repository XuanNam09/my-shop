import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import ProductsSection from './components/ProductsSection';
import CategoriesSection from './components/CategoriesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import CartSidebar from './components/CartSidebar';
import ProductModal from './components/ProductModal';
import CheckoutModal from './components/CheckoutModal';
import AuthModal from './components/AuthModal';

function App() {
  // Trạng thái điều hướng
  const [currentSection, setCurrentSection] = useState('home');

  // Dữ liệu sản phẩm, danh mục
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Giỏ hàng
  const [cart, setCart] = useState([]);

  // Modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Người dùng
  const [user, setUser] = useState(null);

  // Tìm kiếm và lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Thông báo
  const [notification, setNotification] = useState(null);

  // Load danh mục khi mount
  useEffect(() => {
    // Thử fetch API, nếu lỗi thì dùng mock data
    fetch('http://localhost:8000/categories')
      .then(res => res.json())
      .then(setCategories)
      .catch(() => {
        const mockCategories = ['clothing', 'shoes', 'bags', 'accessories'];
        setCategories(mockCategories);
        showNotification('Sử dụng dữ liệu mẫu cho danh mục', 'info');
      });
  }, []);

  // Load sản phẩm khi thay đổi danh mục
  useEffect(() => {
    let url = 'http://localhost:8000/products';
    if (selectedCategory) {
      url += `?category=${encodeURIComponent(selectedCategory)}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(setProducts)
      .catch(() => {
        // Mock data sản phẩm
        const mockProducts = [
          {"id": "1", "name": "Áo vest nam", "price": 150000, "image": "https://global2019-static-cdn.kikuu.com/k-s-oss-16470779199493TmQtEMTwM.jpg?x-oss-process=style/p_list", "description": "Áo vest nam cao cấp.", "specs": ["Chất liệu: Wool"], "category": "clothing"},
          {"id": "2", "name": "Quần jeans nữ", "price": 250000, "image": "https://global2019-static-cdn.kikuu.com/k-s-oss-1744443999259NZFH5wsNx4.jpg?x-oss-process=style/p_list", "description": "Quần jeans nữ slim fit.", "specs": ["Chất liệu: Denim"], "category": "clothing"},
          {"id": "3", "name": "Áo sơ mi nam", "price": 200000, "image": "https://global2019-static-cdn.kikuu.com/k-s-oss-1684914694527KYN6cMpcTz.jpg?x-oss-process=style/p_list", "description": "Áo sơ mi nam cotton.", "specs": ["Chất liệu: Cotton"], "category": "clothing"},
          {"id": "4", "name": "Váy nữ xòe", "price": 300000, "image": "https://global2019-static-cdn.kikuu.com/k-s-oss-1729823900155z3Jn6Brrxy.jpg?x-oss-process=style/p_list", "description": "Váy xòe nữ thanh lịch.", "specs": ["Chất liệu: Polyester"], "category": "clothing"},
          {"id": "5", "name": "Áo khoác nam", "price": 400000, "image": "https://global2019-static-cdn.kikuu.com/upload-productImg-1629887679039.jpeg?x-oss-process=style/p_list", "description": "Áo khoác nam ấm áp.", "specs": ["Chất liệu: Fleece"], "category": "clothing"},
          {"id": "6", "name": "Quần jeans nam", "price": 180000, "image": "https://global2019-static-cdn.kikuu.com/upload-productImg-89429416307162743.jpg?x-oss-process=style/p_list", "description": "Quần jeans nam casual.", "specs": ["Chất liệu: Denim"], "category": "clothing"},
          {"id": "7", "name": "Áo khoác nữ", "price": 550000, "image": "https://global2019-static-cdn.kikuu.com/upload-productImg-63696501604434258.jpg?x-oss-process=style/p_list", "description": "Áo khoác nữ thời trang.", "specs": ["Chất liệu: Wool"], "category": "clothing"},
          {"id": "8", "name": "Đồ bộ thể thao nam", "price": 350000, "image": "https://global2019-static-cdn.kikuu.com/upload-productImg-27499357381097741.jpg?x-oss-process=style/p_list", "description": "Đồ bộ thể thao nam.", "specs": ["Chất liệu: Cotton"], "category": "clothing"},
          {"id": "9", "name": "Quần tây nam", "price": 270000, "image": "https://global2019-static-cdn.kikuu.com/upload-productImg-1634276995281.jpeg?x-oss-process=style/p_list", "description": "Quần tây nam công sở.", "specs": ["Chất liệu: Polyester"], "category": "clothing"},
          {"id": "10", "name": "Áo len nam", "price": 320000, "image": "https://global2019-static-cdn.kikuu.com/upload-productImg-87508149090466335.jpg?x-oss-process=style/p_list", "description": "Áo len nam ấm áp.", "specs": ["Chất liệu: Wool"], "category": "clothing"},
          {"id": "11", "name": "Giày thể thao nam", "price": 300000, "image": "https://global2019-static-cdn.kikuu.com/upload-productImg-45103808106168598.jpg?x-oss-process=style/p_list", "description": "Giày thể thao nam năng động.", "specs": ["Kích cỡ: 40-44"], "category": "shoes"},
          {"id": "12", "name": "Giày cao gót nữ", "price": 450000, "image": "https://global2019-static-cdn.kikuu.com/upload-productImg-1555842103413.jpeg?x-oss-process=style/p_list", "description": "Giày cao gót nữ sang trọng.", "specs": ["Chiều cao gót: 8cm"], "category": "shoes"},
          {"id": "13", "name": "Giày lười nam", "price": 280000, "image": "https://global2019-static-cdn.kikuu.com/upload-productImg-1555842103414.jpeg?x-oss-process=style/p_list", "description": "Giày lười nam tiện lợi.", "specs": ["Kích cỡ: 39-43"], "category": "shoes"},
          {"id": "21", "name": "Túi xách nữ", "price": 350000, "image": "https://global2019-static-cdn.kikuu.com/upload-productImg-1555842103413.jpeg?x-oss-process=style/p_list", "description": "Túi xách nữ đa năng.", "specs": ["Kích thước: 25x15cm"], "category": "bags"},
          {"id": "22", "name": "Balo unisex", "price": 400000, "image": "https://global2019-static-cdn.kikuu.com/upload-productImg-1555842103415.jpeg?x-oss-process=style/p_list", "description": "Balo thời trang unisex.", "specs": ["Kích thước: 30x40cm"], "category": "bags"},
          {"id": "31", "name": "Đồng hồ nam", "price": 800000, "image": "https://global2019-static-cdn.kikuu.com/k-s-oss-1728901234567vwx.jpg?x-oss-process=style/p_list", "description": "Đồng hồ nam quartz.", "specs": ["Chống nước: 50m"], "category": "accessories"},
          {"id": "32", "name": "Vòng cổ nữ", "price": 150000, "image": "https://global2019-static-cdn.kikuu.com/upload-productImg-1555842103416.jpeg?x-oss-process=style/p_list", "description": "Vòng cổ nữ thời trang.", "specs": ["Chất liệu: Bạc"], "category": "accessories"}
        ];
        setProducts(selectedCategory ? mockProducts.filter(p => p.category === selectedCategory) : mockProducts);
        showNotification('Sử dụng dữ liệu mẫu cho sản phẩm', 'info');
      });
  }, [selectedCategory]);

  // Khôi phục user từ localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ token, username });
    }
  }, []);

  // Lưu user vào localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('token', user.token);
      localStorage.setItem('username', user.username);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  }, [user]);

  // Hàm hiển thị thông báo
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Thêm vào giỏ hàng
  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showNotification(`Đã thêm "${product.name}" vào giỏ hàng! 🛒`, 'success');
  };

  // Xóa khỏi giỏ hàng
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Cập nhật số lượng
  const updateQuantity = (id, delta) => {
    setCart(prev =>
      prev
        .map(item => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
        .filter(item => item.quantity > 0)
    );
  };

  // Đóng/mở giỏ hàng
  const toggleCart = () => setIsCartOpen(prev => !prev);

  // Mở modal thanh toán
  const openCheckout = () => {
    if (cart.length === 0) {
      showNotification('Giỏ hàng trống!', 'error');
      return;
    }
    if (!user) {
      showNotification('Vui lòng đăng nhập để thanh toán!', 'error');
      setIsAuthOpen(true);
      return;
    }
    setIsCheckoutOpen(true);
  };

  // Đóng modal thanh toán
  const closeCheckout = () => setIsCheckoutOpen(false);

  // Xem chi tiết sản phẩm
  const showProductModal = (product) => setSelectedProduct(product);

  // Đóng modal sản phẩm
  const closeProductModal = () => setSelectedProduct(null);

  // Đóng/mở modal đăng nhập
  const toggleAuth = () => setIsAuthOpen(prev => !prev);

  // Xử lý đăng nhập
  const handleLogin = (username, token) => {
    setUser({ username, token });
    setIsAuthOpen(false);
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    setUser(null);
    showNotification('Đã đăng xuất thành công.', 'info');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        showSection={setCurrentSection}
        toggleCart={toggleCart}
        toggleAuth={toggleAuth}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        user={user}
        handleLogout={handleLogout}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="pt-20 flex-grow">
        <HomeSection isVisible={currentSection === 'home'} />
        <ProductsSection
          isVisible={currentSection === 'products'}
          products={products}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          addToCart={addToCart}
          showProductModal={showProductModal}
          searchTerm={searchTerm}
        />
        <CategoriesSection
          isVisible={currentSection === 'categories'}
          categories={categories}
          showSection={setCurrentSection}
          setSelectedCategory={setSelectedCategory}
        />
        <AboutSection isVisible={currentSection === 'about'} />
        <ContactSection isVisible={currentSection === 'contact'} showNotification={showNotification} />
      </main>
      <CartSidebar
        isOpen={isCartOpen}
        cart={cart}
        toggleCart={toggleCart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        openCheckout={openCheckout}
        showNotification={showNotification}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} closeModal={closeProductModal} addToCart={addToCart} />
      )}
      {isCheckoutOpen && (
        <CheckoutModal
          cart={cart}
          closeModal={closeCheckout}
          showNotification={showNotification}
          user={user}
          clearCart={() => setCart([])}
        />
      )}
      {isAuthOpen && (
        <AuthModal toggleAuth={toggleAuth} showNotification={showNotification} handleLogin={handleLogin} />
      )}
      {notification && (
        <div
          className={`fixed top-24 right-6 z-50 p-6 rounded-2xl text-white font-semibold max-w-md shadow-2xl transition-all duration-500 ${
            notification.type === 'success'
              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
              : 'bg-gradient-to-r from-red-500 to-pink-500'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{notification.type === 'success' ? '✅' : '❌'}</div>
            <div>{notification.message}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;