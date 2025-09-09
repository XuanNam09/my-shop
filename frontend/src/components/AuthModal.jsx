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
            const url = isLogin ? 'http://localhost:8000/login' : 'http://localhost:8000/register';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...(isLogin ? { username: formData.username, password: formData.password } : formData),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Yêu cầu thất bại, vui lòng kiểm tra thông tin.');
            }

            const data = await response.json();
            if (data.token || data.success) { // Giả định API trả về token hoặc success
                handleLogin(formData.username);
                showNotification(`Đăng ${isLogin ? 'nhập' : 'ký'} thành công! 🎉`, 'success');
                toggleAuth(); // Đóng modal sau khi thành công
            } else {
                throw new Error('Phản hồi từ server không hợp lệ.');
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
                                className="w-full px-4 py-3 border-0 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
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
                            className="w-full px-4 py-3 border-0 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
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
                            className="w-full px-4 py-3 border-0 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full btn-primary text-white py-3 rounded-2xl font-bold text-lg shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
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