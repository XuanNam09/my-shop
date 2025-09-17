import React, { useState } from 'react';

function CheckoutModal({ cart, closeModal, showNotification, user, clearCart }) {
  const [shippingAddress, setShippingAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!shippingAddress.trim() || !phoneNumber.trim()) {
      showNotification('Vui lòng nhập đầy đủ thông tin giao hàng', 'error');
      return;
    }
    setLoading(true);
    try {
      const orderId = 'ORDER-' + Date.now();
      const mockOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
      mockOrders.push({
        id: orderId,
        cart: cart.map(item => ({
          product_id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        shippingAddress,
        phoneNumber,
        totalAmount,
        status: 'pending',
        userId: user.username,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('mockOrders', JSON.stringify(mockOrders));
      showNotification(`Đặt hàng thành công! Mã đơn: ${orderId} 📦`, 'success');
      clearCart();
      closeModal();
    } catch (error) {
      showNotification(`Lỗi: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 text-3xl font-bold float-right" aria-label="Close">&times;</button>
        <h2 className="text-2xl font-bold mb-4">Thông tin giao hàng</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Địa chỉ giao hàng</label>
            <input
              type="text"
              value={shippingAddress}
              onChange={e => setShippingAddress(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Nhập địa chỉ giao hàng"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Số điện thoại</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div className="text-right font-semibold text-lg text-orange-500">
            Tổng tiền: {totalAmount.toLocaleString('vi-VN')} VNĐ
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3"
          >
            {loading ? 'Đang xử lý...' : 'Đặt hàng'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;