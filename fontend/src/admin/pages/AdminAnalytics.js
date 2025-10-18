import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30days');

  useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setAnalytics({
        revenue: {
          total: 12500000,
          monthly: 3500000,
          weekly: 875000,
          daily: 125000
        },
        orders: {
          total: 89,
          completed: 75,
          pending: 10,
          cancelled: 4
        },
        users: {
          total: 234,
          new: 45,
          active: 189,
          inactive: 45
        },
        books: {
          total: 156,
          inStock: 142,
          outOfStock: 14,
          categories: 6
        },
        topBooks: [
          { id: 1, title: 'Đắc Nhân Tâm', sales: 25, revenue: 2225000 },
          { id: 2, title: 'Atomic Habits', sales: 18, revenue: 1980000 },
          { id: 3, title: 'Clean Code', sales: 15, revenue: 3000000 },
          { id: 4, title: 'Sapiens', sales: 12, revenue: 1800000 },
          { id: 5, title: 'The Lean Startup', sales: 10, revenue: 1300000 }
        ],
        recentActivity: [
          { id: 1, type: 'order', message: 'Đơn hàng #1234 đã được đặt', time: '2 phút trước' },
          { id: 2, type: 'user', message: 'Người dùng mới đã đăng ký', time: '15 phút trước' },
          { id: 3, type: 'book', message: 'Sách mới "React Advanced" đã được thêm', time: '1 giờ trước' },
          { id: 4, type: 'order', message: 'Đơn hàng #1233 đã hoàn thành', time: '2 giờ trước' },
          { id: 5, type: 'user', message: 'Tài khoản người dùng đã bị khóa', time: '3 giờ trước' }
        ]
      });
      
      setIsLoading(false);
    };
    
    loadAnalytics();
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'order': return '📦';
      case 'user': return '👤';
      case 'book': return '📚';
      default: return '📊';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'order': return 'text-blue-600';
      case 'user': return 'text-green-600';
      case 'book': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Thống kê & Báo cáo</h1>
              <p className="text-gray-600">Phân tích dữ liệu và hiệu suất hệ thống</p>
            </div>
            <div className="flex space-x-3">
              <Link 
                to="/admin" 
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                ← Quay lại Dashboard
              </Link>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7days">7 ngày qua</option>
                <option value="30days">30 ngày qua</option>
                <option value="90days">90 ngày qua</option>
                <option value="1year">1 năm qua</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Đang tải dữ liệu...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Revenue Overview */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Tổng quan doanh thu</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                          <span className="text-white text-sm">💰</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-blue-600">Tổng doanh thu</p>
                        <p className="text-2xl font-bold text-blue-900">
                          ₫{analytics.revenue.total.toLocaleString('vi-VN')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                          <span className="text-white text-sm">📅</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-600">Tháng này</p>
                        <p className="text-2xl font-bold text-green-900">
                          ₫{analytics.revenue.monthly.toLocaleString('vi-VN')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                          <span className="text-white text-sm">📊</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-yellow-600">Tuần này</p>
                        <p className="text-2xl font-bold text-yellow-900">
                          ₫{analytics.revenue.weekly.toLocaleString('vi-VN')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                          <span className="text-white text-sm">📈</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-purple-600">Hôm nay</p>
                        <p className="text-2xl font-bold text-purple-900">
                          ₫{analytics.revenue.daily.toLocaleString('vi-VN')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm">📦</span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Tổng đơn hàng</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.orders.total}</p>
                      <p className="text-xs text-gray-500">
                        {analytics.orders.completed} hoàn thành, {analytics.orders.pending} chờ xử lý
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm">👥</span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Người dùng</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.users.total}</p>
                      <p className="text-xs text-gray-500">
                        {analytics.users.active} hoạt động, {analytics.users.new} mới
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm">📚</span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Sách</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.books.total}</p>
                      <p className="text-xs text-gray-500">
                        {analytics.books.inStock} còn hàng, {analytics.books.categories} danh mục
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm">⭐</span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Tỷ lệ hoàn thành</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round((analytics.orders.completed / analytics.orders.total) * 100)}%
                      </p>
                      <p className="text-xs text-gray-500">Đơn hàng thành công</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Books */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Sách bán chạy</h3>
                  <div className="space-y-3">
                    {analytics.topBooks.map((book, index) => (
                      <div key={book.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center mr-3">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-medium text-gray-900">{book.title}</p>
                            <p className="text-sm text-gray-500">{book.sales} bản đã bán</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">₫{book.revenue.toLocaleString('vi-VN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Hoạt động gần đây</h3>
                  <div className="space-y-3">
                    {analytics.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <span className="text-lg">{getActivityIcon(activity.type)}</span>
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${getActivityColor(activity.type)}`}>
                            {activity.message}
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;