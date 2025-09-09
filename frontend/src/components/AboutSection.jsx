import React from 'react';

function AboutSection({ isVisible }) {
    return (
        <section id="aboutSection" className={`py-20 gradient-bg ${isVisible ? '' : 'hidden'}`}>
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-white">
                        <h2 className="text-4xl font-bold mb-6">Câu chuyện Kikuu Store</h2>
                        <p className="text-xl mb-6 text-white/90 leading-relaxed">
                            Được thành lập từ năm 2023, Kikuu Store mang đến bộ sưu tập thời trang hiện đại.
                        </p>
                        <p className="text-lg mb-8 text-white/80 leading-relaxed">
                            Chúng tôi cam kết cung cấp các sản phẩm quần áo, giày, túi xách và phụ kiện chất lượng cao từ các thương hiệu uy tín.
                        </p>
                        <div className="grid grid-cols-3 gap-6 text-center">
                            <div>
                                <div className="text-3xl font-bold mb-2">10K+</div>
                                <div className="text-white/80">Khách hàng</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-2">500+</div>
                                <div className="text-white/80">Sản phẩm</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-2">98%</div>
                                <div className="text-white/80">Hài lòng</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="floating-animation">
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">🏆</div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Chất lượng</h3>
                                    <p className="text-white/90">Cửa hàng thời trang đáng tin cậy 2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;