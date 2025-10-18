import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
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

  const validateForm = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setErrors({ general: result.error });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-red-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5v-5a7.5 7.5 0 0115 0v5z" />
                </svg>
              </button>
              <button className="text-gray-600 hover:text-red-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                </svg>
              </button>
              <Link to="/login" className="text-gray-600 hover:text-red-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Compact Style */}
      <div className="flex justify-center items-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-sm w-full bg-white rounded-lg shadow-sm border">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button className="flex-1 py-2 px-3 text-center text-red-600 font-medium border-b-2 border-red-600 text-sm">
              Đăng nhập
            </button>
            <Link to="/register" className="flex-1 py-2 px-3 text-center text-gray-600 hover:text-red-600 text-sm">
              Đăng ký
            </Link>
          </div>

          {/* Login Form - Compact Style */}
          <div className="p-3">
            <form onSubmit={handleSubmit}>
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded text-xs mb-3">
                  {errors.general}
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
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
                  <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
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

                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-xs text-red-600 hover:text-red-500"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-black bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;