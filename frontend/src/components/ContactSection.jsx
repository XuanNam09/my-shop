import React, { useState } from 'react';

function ContactSection({ isVisible, showNotification }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    showNotification('📧 Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi trong vòng 24h.', 'success');
    setFormData({ name: '', email: '', message: '' });
    setLoading(false);
  };

  if (!isVisible) return null;

  return (
    <section id="contactSection" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Liên hệ với chúng tôi</h2>
            <p className="text-xl text-gray-600">Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="category-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Thông tin liên hệ</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-xl">📍</div>
                  <div>
                    <p className="font-semibold text-gray-800">Địa chỉ</p>
                    <p className="text-gray-600">456 Lê Lợi, Quận 1, TP.HCM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-xl">📞</div>
                  <div>
                    <p className="font-semibold text-gray-800">Hotline</p>
                    <p className="text-gray-600">1900 5678 (24/7)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-xl">✉️</div>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">support@kikuustore.vn</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="category-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Gửi tin nhắn</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="email"
                  placeholder="Email của bạn"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <textarea
                  placeholder="Nội dung tin nhắn"
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                ></textarea>
                <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-lg">
                  {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;