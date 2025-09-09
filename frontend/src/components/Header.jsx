import React from 'react';

function Header({ showSection, toggleCart, toggleAuth, cartCount, user, handleLogout }) {
    return (
        <header className="fixed top-0 w-full z-50 glass-effect">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">K</div>
                            <h1 className="text-2xl font-bold text-orange-500">Kikuu Store</h1>
                        </div>
                        <nav className="hidden lg:flex space-x-8">
                            <a href="#" onClick={() => showSection('home')} className="nav-link text-gray-700 hover:text-orange-500 font-medium py-2 transition-colors">Trang chủ</a>
                            <a href="#" onClick={() => showSection('products')} className="nav-link text-gray-700 hover:text-orange-500 font-medium py-2 transition-colors">Sản phẩm</a>
                            <a href="#" onClick={() => showSection('categories')} className="nav-link text-gray-700 hover:text-orange-500 font-medium py-2 transition-colors">Danh mục</a>
                            <a href="#" onClick={() => showSection('about')} className="nav-link text-gray-700 hover:text-orange-500 font-medium py-2 transition-colors">Về chúng tôi</a>
                            <a href="#" onClick={() => showSection('contact')} className="nav-link text-gray-700 hover:text-orange-500 font-medium py-2 transition-colors">Liên hệ</a>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                className="pl-12 pr-4 py-3 w-80 bg-white/80 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg backdrop-blur-sm"
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                        </div>
                        <button onClick={toggleCart} className="relative btn-primary text-white px-6 py-3 rounded-2xl font-semibold shadow-lg">
                            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"></path>
                            </svg>
                            Giỏ hàng
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 text-sm flex items-center justify-center font-bold pulse-glow">{cartCount}</span>
                        </button>
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700 font-medium">Xin chào, {user.username}</span>
                                <button onClick={handleLogout} className="btn-primary text-white px-6 py-3 rounded-2xl font-semibold shadow-lg">
                                    Đăng xuất
                                </button>
                            </div>
                        ) : (
                            <button onClick={toggleAuth} className="btn-primary text-white px-6 py-3 rounded-2xl font-semibold shadow-lg">
                                Đăng nhập / Đăng ký
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;