import React from 'react';

function AboutSection({ isVisible }) {
  if (!isVisible) return null;

  return (
    <section id="aboutSection" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Về Kikuu Store</h2>
          <p className="text-xl text-gray-600">Câu chuyện và sứ mệnh của chúng tôi</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Chúng tôi là ai?</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Kikuu Store là điểm đến thời trang hàng đầu, mang đến những sản phẩm chất lượng cao từ quần áo, giày dép, đến phụ kiện. Chúng tôi cam kết cung cấp trải nghiệm mua sắm trực tuyến tiện lợi, nhanh chóng và đáng tin cậy.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Thành lập từ năm 2020, Kikuu Store đã phục vụ hàng ngàn khách hàng với sự hài lòng cao nhất. Sứ mệnh của chúng tôi là giúp bạn thể hiện phong cách riêng qua từng sản phẩm được chọn lọc kỹ lưỡng.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-gray-800">Tầm nhìn</h4>
                <p className="text-gray-600">Trở thành thương hiệu thời trang trực tuyến dẫn đầu tại Việt Nam.</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4 text-gray-800">Giá trị cốt lõi</h4>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Chất lượng sản phẩm</li>
                  <li>Dịch vụ khách hàng xuất sắc</li>
                  <li>Giá cả cạnh tranh</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;