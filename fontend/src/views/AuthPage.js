import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateLoginForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Số điện thoại/Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email) && !/^[0-9]{10,11}$/.test(formData.email)) {
      newErrors.email = 'Email hoặc số điện thoại không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setErrors({ general: 'Email/Password không đúng' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateRegisterForm()) return;

    setIsLoading(true);
    try {
      await register(formData.email, formData.password, formData.phone);
      navigate('/');
    } catch (error) {
      setErrors({ general: 'Email đã tồn tại hoặc có lỗi xảy ra' });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    resetForm();
  };

  // Set active tab based on URL
  useEffect(() => {
    if (location.pathname === '/register') {
      setActiveTab('register');
    } else {
      setActiveTab('login');
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">BookStore</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {activeTab === 'login' ? 'Đăng nhập tài khoản' : 'Tạo tài khoản mới'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {activeTab === 'login' 
            ? 'Đăng nhập để truy cập vào tài khoản của bạn' 
            : 'Tạo tài khoản để bắt đầu mua sắm'
          }
        </p>
      </div>

      {/* Main Content */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <Link 
              to="/login"
              className={`flex-1 py-2 px-3 text-center text-sm font-medium ${
                activeTab === 'login' 
                  ? 'text-red-600 border-b-2 border-red-600' 
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              Đăng nhập
            </Link>
            <Link 
              to="/register"
              className={`flex-1 py-2 px-3 text-center text-sm font-medium ${
                activeTab === 'register' 
                  ? 'text-red-600 border-b-2 border-red-600' 
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              Đăng ký
            </Link>
          </div>

          {/* Forms */}
          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
                  {errors.general}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại/Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Nhập số điện thoại hoặc email"
                />
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Nhập mật khẩu"
                />
                {errors.password && (
                  <p className="text-xs text-red-600 mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-red-600 hover:text-red-500"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-black bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              >
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
                  {errors.general}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Nhập email của bạn"
                />
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Nhập số điện thoại"
                />
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Nhập mật khẩu"
                />
                {errors.password && (
                  <p className="text-xs text-red-600 mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Xác nhận mật khẩu
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Nhập lại mật khẩu"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-black bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              >
                {isLoading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
              </button>
            </form>
          )}

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
              {activeTab === 'login' ? (
                <>
                  Nếu bạn chưa có tài khoản thì{' '}
                  <Link
                    to="/register"
                    className="text-red-600 hover:text-red-500 font-medium"
                  >
                    Đăng ký
                  </Link>
                </>
              ) : (
                <>
                  Đã có tài khoản?{' '}
                  <Link
                    to="/login"
                    className="text-red-600 hover:text-red-500 font-medium"
                  >
                    Đăng nhập
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
