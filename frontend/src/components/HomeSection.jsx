import React from 'react';

function HomeSection({ isVisible }) {
    return (
        <section className={`slide-in ${isVisible ? '' : 'hidden'}`}>
            <div className="gradient-bg hero-pattern min-h-screen flex items-center relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-white">
                            <h2 className="text-6xl font-bold mb-6 leading-tight">
                                <span className="text-orange-500">
                                    Khám phá
                                </span>
                                <span className="block text-orange-500">
                                    Thời trang hiện đại
                                </span>
                                <span className="text-orange-500">
                                    Kikuu Store
                                </span>
                            </h2>
                            <p className="text-xl mb-8 text-orange-500 leading-relaxed">
                                Bộ sưu tập quần áo, giày, túi xách và phụ kiện thời thượng
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button onClick={() => document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-orange-500 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
                                    <span className="text-orange-500">Mua sắm ngay</span>
                                </button>
                                <button onClick={() => document.getElementById('categoriesSection')?.scrollIntoView({ behavior: 'smooth' })} className="border-2 border-white text-orange-500 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-orange-500 transition-all">
                                    <span className="text-orange-500">Khám phá thêm</span>
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="floating-animation">
                                <img
                                    src="https://global2019-static-cdn.kikuu.com/k-s-oss-16470779199493TmQtEMTwM.jpg?x-oss-process=style/p_list"
                                    alt="Hero product"
                                    className="w-96 h-96 rounded-full object-cover border border-white/20"
                                />
                            </div>
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-400 rounded-full opacity-20 floating-animation" style={{ animationDelay: '-2s' }}></div>
                            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-orange-300 rounded-full opacity-20 floating-animation" style={{ animationDelay: '-4s' }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold text-gray-800 mb-4">Tại sao chọn Kikuu Store?</h3>
                        <p className="text-xl text-gray-600">Trải nghiệm mua sắm thời trang đẳng cấp</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="text-6xl mb-6 feature-icon">🚚</div>
                            <h4 className="text-2xl font-bold mb-4 text-gray-800">Giao hàng nhanh</h4>
                            <p className="text-gray-600 leading-relaxed">Giao hàng trong 24h tại nội thành</p>
                        </div>
                        <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="text-6xl mb-6 feature-icon">🛡️</div>
                            <h4 className="text-2xl font-bold mb-4 text-gray-800">Bảo hành uy tín</h4>
                            <p className="text-gray-600 leading-relaxed">Đổi trả trong 30 ngày</p>
                        </div>
                        <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="text-6xl mb-6 feature-icon">💎</div>
                            <h4 className="text-2xl font-bold mb-4 text-gray-800">Chất lượng cao</h4>
                            <p className="text-gray-600 leading-relaxed">Sản phẩm thời trang từ thương hiệu uy tín</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeSection;