import React, { useState } from 'react';

function AuthModal({ toggleAuth, showNotification, handleLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!isLogin) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          throw new Error('Email không hợp lệ');
        }
        if (formData.password.length < 6) {
          throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
        }
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      if (isLogin) {
        const user = mockUsers.find(u => u.username === formData.username && u.password === formData.password);
        if (user) {
          const token = 'mock-token-' + Date.now();
          handleLogin(formData.username, token);
          showNotification('Đăng nhập thành công! 🎉', 'success');
          toggleAuth();
        } else {
          throw new Error('Tên người dùng hoặc mật khẩu không đúng.');
        }
      } else {
        if (mockUsers.find(u => u.username === formData.username || u.email === formData.email)) {
          throw new Error('Tên người dùng hoặc email đã tồn tại.');
        }
        const newUser = { ...formData, id: Date.now() };
        mockUsers.push(newUser);
        localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
        const token = 'mock-token-' + Date.now();
        handleLogin(formData.username, token);
        showNotification('Đăng ký thành công! 🎉', 'success');
        toggleAuth();
      }
    } catch (error) {
      showNotification(`Lỗi: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={toggleAuth}>
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
          <button onClick={toggleAuth} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
        </div>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 font-semibold rounded-l-2xl ${isLogin ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'} transition-all`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 font-semibold rounded-r-2xl ${!isLogin ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'} transition-all`}
          >
            Đăng ký
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Nhập email của bạn"
                required={!isLogin}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên người dùng</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Nhập tên người dùng"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 text-lg"
          >
            {loading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký')}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-orange-500 font-semibold hover:underline"
          >
            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;