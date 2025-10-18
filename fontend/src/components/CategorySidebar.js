import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCategory } from '../contexts/CategoryContext';

const CategorySidebar = () => {
  const { categories, selectedCategory } = useCategory();
  const location = useLocation();

  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      'Văn học': '📚',
      'Khoa học': '🔬',
      'Lịch sử': '🏛️',
      'Kinh tế': '💰',
      'Tâm lý học': '🧠',
      'Thiếu nhi': '👶',
      'Ngoại ngữ': '🌍',
      'Nghệ thuật': '🎨',
      'Y học': '⚕️',
      'Pháp luật': '⚖️',
      'Triết học': '🤔',
      'Du lịch': '✈️',
      'Thể thao': '⚽',
      'Nấu ăn': '👨‍🍳',
      'Làm vườn': '🌱',
      'Công nghệ': '💻',
      'Tôn giáo': '🕊️',
      'Huyền bí': '🔮',
      'Truyện tranh': '📖',
      'Sách giáo khoa': '📝'
    };
    return iconMap[categoryName] || '📖';
  };

  const isActive = (slug) => {
    return location.pathname === `/categories/${slug}`;
  };

  const getPopularCategories = () => {
    return categories
      .filter(cat => cat.bookCount > 100)
      .sort((a, b) => b.bookCount - a.bookCount)
      .slice(0, 5);
  };

  const getNewestCategories = () => {
    return categories
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);
  };

  return (
    <div className="w-full lg:w-64 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-fit">
      {/* All Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          Tất cả danh mục
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.slug}`}
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                isActive(category.slug)
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-2 border-blue-200 shadow-sm'
                  : 'hover:bg-gray-50 text-gray-700 hover:shadow-sm border-2 border-transparent hover:border-gray-200'
              }`}
            >
              <div className="flex items-center">
                <span className="text-lg mr-3">{getCategoryIcon(category.name)}</span>
                <span className="text-sm font-semibold">{category.name}</span>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-medium">
                {category.bookCount}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Phổ biến
        </h3>
        <div className="space-y-2">
          {getPopularCategories().map((category, index) => (
            <Link
              key={category.id}
              to={`/categories/${category.slug}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <span className="text-sm font-bold text-green-600 mr-2">#{index + 1}</span>
                <span className="text-sm text-gray-700">{category.name}</span>
              </div>
              <span className="text-xs text-gray-500">{category.bookCount}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Newest Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Mới nhất
        </h3>
        <div className="space-y-2">
          {getNewestCategories().map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.slug}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <span className="text-lg mr-2">{getCategoryIcon(category.name)}</span>
                <span className="text-sm text-gray-700">{category.name}</span>
              </div>
              <span className="text-xs text-gray-500">{category.bookCount}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Thống kê nhanh</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Tổng danh mục:</span>
            <span className="font-medium text-gray-900">{categories.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tổng sách:</span>
            <span className="font-medium text-gray-900">
              {categories.reduce((total, cat) => total + cat.bookCount, 0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Trung bình:</span>
            <span className="font-medium text-gray-900">
              {Math.round(categories.reduce((total, cat) => total + cat.bookCount, 0) / categories.length)}
            </span>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-yellow-800 mb-1">Mẹo sử dụng</h4>
            <p className="text-xs text-yellow-700">
              Click vào danh mục để xem sách chi tiết. Sử dụng bộ lọc để tìm danh mục phù hợp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
