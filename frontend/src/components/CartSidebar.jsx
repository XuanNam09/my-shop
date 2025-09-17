import React from 'react';

function CartSidebar({ isOpen, cart, toggleCart, removeFromCart, updateQuantity, openCheckout, showNotification }) {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl z-50 p-6 flex flex-col">
      <button onClick={toggleCart} className="self-end text-3xl font-bold text-gray-500 hover:text-gray-800">&times;</button>
      <h2 className="text-2xl font-bold mb-6">Giỏ hàng ({cart.length})</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">Giỏ hàng trống. Hãy thêm sản phẩm!</p>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center p-4 border rounded-2xl bg-gray-50">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-orange-500 font-semibold">{item.price.toLocaleString('vi-VN')} VNĐ</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 bg-white border rounded-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        showNotification(`Đã xóa ${item.name} khỏi giỏ hàng`, 'success');
                      }}
                      className="ml-4 text-red-500 hover:text-red-700 font-semibold"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-2xl">
            <div className="font-semibold text-lg text-gray-800 mb-2">Tổng tiền: {totalAmount.toLocaleString('vi-VN')} VNĐ</div>
            <button
              onClick={() => {
                toggleCart();
                openCheckout();
              }}
              className="btn-primary w-full py-3"
            >
              Thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartSidebar;