import React from 'react';

function ProductModal({ product, closeModal, addToCart }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={closeModal}>
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="p-8">
                    <div className="flex justify-between items-start mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
                        <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-3xl">✕</button>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="text-center">
                            <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-xl mb-6 floating-animation" />
                            <div className="grid grid-cols-3 gap-2">
                                <img src={product.image} alt="thumbnail" className="bg-gray-100 rounded-xl h-20 object-cover" />
                                <img src={product.image} alt="thumbnail" className="bg-gray-100 rounded-xl h-20 object-cover" />
                                <img src={product.image} alt="thumbnail" className="bg-gray-100 rounded-xl h-20 object-cover" />
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>
                            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                                <h4 className="font-bold mb-4 text-lg text-gray-800">Thông số sản phẩm:</h4>
                                <ul className="space-y-2">
                                    {product.specs.map((spec, index) => (
                                        <li key={index} className="text-gray-600 flex items-center">
                                            <span className="text-green-500 mr-2">✓</span>{spec}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-4xl font-bold text-orange-500">{formatPrice(product.price)}</span>
                                <div className="flex items-center space-x-2 text-yellow-400">
                                    <span>⭐⭐⭐⭐⭐</span>
                                    <span className="text-gray-600 text-sm">(128 đánh giá)</span>
                                </div>
                            </div>
                            <button
                                onClick={() => { addToCart(product); closeModal(); }}
                                className="w-full btn-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg mb-4"
                            >
                                Thêm vào giỏ hàng
                            </button>
                            <div className="grid grid-cols-2 gap-4 text-center text-sm text-gray-600">
                                <div className="flex items-center justify-center space-x-2">
                                    <span>🚚</span>
                                    <span>Giao hàng miễn phí</span>
                                </div>
                                <div className="flex items-center justify-center space-x-2">
                                    <span>🔄</span>
                                    <span>Đổi trả 30 ngày</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;