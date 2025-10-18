import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { admin, logout } = useAdmin();
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data loading
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setStats({
        totalBooks: 156,
        totalOrders: 89,
        totalUsers: 234,
        totalRevenue: 12500000
      });
      
      setIsLoading(false);
    };
    
    loadDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Chào mừng Admin BookStore</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 text-black px-6 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-medium">📚</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Tổng sách
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {isLoading ? '...' : stats.totalBooks}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-medium">📦</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Đơn hàng
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {isLoading ? '...' : stats.totalOrders}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-medium">👥</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Người dùng
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {isLoading ? '...' : stats.totalUsers}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-medium">💰</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Doanh thu
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {isLoading ? '...' : `₫${stats.totalRevenue.toLocaleString('vi-VN')}`}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Chức năng quản trị
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link to="/admin/books" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-blue-300 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-lg">📚</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Quản lý sách</h4>
                      <p className="text-sm text-gray-600 mt-1">Thêm, sửa, xóa sách</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/admin/categories" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-green-300 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 text-lg">📂</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Quản lý danh mục</h4>
                      <p className="text-sm text-gray-600 mt-1">Quản lý các danh mục sách</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/admin/orders" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-yellow-300 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-yellow-600 text-lg">📦</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Quản lý đơn hàng</h4>
                      <p className="text-sm text-gray-600 mt-1">Xem và xử lý đơn hàng</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/admin/users" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-purple-300 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-purple-600 text-lg">👥</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Quản lý người dùng</h4>
                      <p className="text-sm text-gray-600 mt-1">Quản lý tài khoản người dùng</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/admin/analytics" className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-red-300 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-red-600 text-lg">📊</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Thống kê</h4>
                      <p className="text-sm text-gray-600 mt-1">Báo cáo và phân tích</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
