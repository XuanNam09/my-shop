import React from 'react';

function CartSidebar({ isOpen, cart, toggleCart, removeFromCart, updateQuantity, showNotification }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const checkout = () => {
        if (cart.length === 0) {
            showNotification('Giỏ hàng trống! Hãy thêm sản phẩm trước khi thanh toán 🛒', 'error');
            return;
        }
        showNotification(`🎉 Đặt hàng thành công! Tổng: ${formatPrice(totalPrice)}. Cảm ơn bạn đã mua sắm tại Kikuu Store!`, 'success');
        toggleCart();
    };

    return (
        <>
            <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 z-50 rounded-l-3xl`}>
                <div className="p-6 bg-orange-500 text-white rounded-tl-3xl">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold">Giỏ hàng</h3>
                        <button onClick={toggleCart} className="text-white hover:text-gray-200 text-2xl">✕</button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6 h-96">
                    {cart.length === 0 ? (
                        <div className="text-center text-gray-500 mt-20">
                            <div className="text-6xl mb-4">🛒</div>
                            <p className="text-lg">Giỏ hàng trống</p>
                            <p className="text-sm">Hãy thêm sản phẩm yêu thích!</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-2xl">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                                    <p className="text-orange-500 font-bold">{formatPrice(item.price)}</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center justify-center font-bold text-gray-600">-</button>
                                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center justify-center font-bold text-gray-600">+</button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-xl">🗑️</button>
                            </div>
                        ))
                    )}
                </div>
                {cart.length > 0 && (
                    <div className="border-t p-6 bg-gray-50 rounded-bl-3xl">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xl font-semibold text-gray-800">Tổng cộng:</span>
                            <span className="text-2xl font-bold text-orange-500">{formatPrice(totalPrice)}</span>
                        </div>
                        <button onClick={checkout} className="w-full btn-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg">
                            Thanh toán ngay
                        </button>
                    </div>
                )}
            </div>
            <div className={`fixed inset-0 bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'} z-40 backdrop-blur-sm`} onClick={toggleCart}></div>
        </>
    );
}

export default CartSidebar;