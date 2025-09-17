import React from 'react';

function ProductModal({ product, closeModal, addToCart }) {
  if (!product) return null;

  const specs = product.specs || ['Không có thông số chi tiết'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 text-3xl font-bold float-right" aria-label="Close">&times;</button>
        <div className="flex flex-col md:flex-row gap-6">
          <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-auto rounded-lg object-cover" />
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="text-xl text-orange-500 font-semibold mb-4">{product.price.toLocaleString('vi-VN')} VNĐ</p>
            <p className="mb-4">{product.description}</p>
            <h3 className="font-semibold mb-2">Thông số kỹ thuật:</h3>
            <ul className="list-disc list-inside mb-6">
              {specs.map((spec, idx) => (
                <li key={idx}>{spec}</li>
              ))}
            </ul>
            <button
              onClick={() => {
                addToCart(product);
                closeModal();
              }}
              className="btn-primary w-full py-3 rounded-2xl text-white font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;