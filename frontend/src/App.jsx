import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import ProductsSection from './components/ProductsSection';
import CategoriesSection from './components/CategoriesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import CartSidebar from './components/CartSidebar';
import ProductModal from './components/ProductModal';
import AuthModal from './components/AuthModal';

function RockyApp() {
    const [currentSection, setCurrentSection] = useState('home');
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Lỗi khi lấy sản phẩm:', error));
    }, []);

    const showSection = (section) => {
        setCurrentSection(section);
    };

    const addToCart = (product) => {
        setCart(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        showNotification(`Đã thêm ${product.name} vào giỏ hàng! 🎉`, 'success');
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, change) => {
        setCart(prev => {
            const item = prev.find(item => item.id === productId);
            if (!item) return prev;
            const newQuantity = item.quantity + change;
            if (newQuantity <= 0) {
                return prev.filter(item => item.id !== productId);
            }
            return prev.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            );
        });
    };

    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };

    const toggleAuth = () => {
        setIsAuthOpen(prev => !prev);
    };

    const showProductModal = (product) => {
        setSelectedProduct(product);
    };

    const closeProductModal = () => {
        setSelectedProduct(null);
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    const handleLogin = (username) => {
        setUser({ username });
        setIsAuthOpen(false);
        showNotification(`Chào mừng ${username}! 🎉`, 'success');
    };

    const handleLogout = () => {
        setUser(null);
        showNotification('Đã đăng xuất! 👋', 'success');
    };

    return (
        <div className="bg-gray-50 overflow-x-hidden">
            <Header
                showSection={showSection}
                toggleCart={toggleCart}
                toggleAuth={toggleAuth}
                cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
                user={user}
                handleLogout={handleLogout}
            />
            <main className="pt-20">
                <HomeSection isVisible={currentSection === 'home'} />
                <ProductsSection
                    isVisible={currentSection === 'products'}
                    products={products}
                    addToCart={addToCart}
                    showProductModal={showProductModal}
                />
                <CategoriesSection isVisible={currentSection === 'categories'} showSection={showSection} />
                <AboutSection isVisible={currentSection === 'about'} />
                <ContactSection isVisible={currentSection === 'contact'} showNotification={showNotification} />
            </main>
            <CartSidebar
                isOpen={isCartOpen}
                cart={cart}
                toggleCart={toggleCart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                showNotification={showNotification}
            />
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    closeModal={closeProductModal}
                    addToCart={addToCart}
                />
            )}
            {isAuthOpen && (
                <AuthModal
                    toggleAuth={toggleAuth}
                    showNotification={showNotification}
                    handleLogin={handleLogin}
                />
            )}
            {notification && (
                <div className={`fixed top-24 right-6 z-50 p-6 rounded-2xl text-white font-semibold max-w-md shadow-2xl transform transition-all duration-500 ${notification.type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-pink-500'}`}>
                    <div className="flex items-center space-x-3">
                        <div className="text-2xl">{notification.type === 'success' ? '✅' : '❌'}</div>
                        <div>{notification.message}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RockyApp;