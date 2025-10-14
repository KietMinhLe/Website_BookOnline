import React, { useState } from 'react';

const BookFilter = ({ onFilterChange, books = [] }) => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceRange: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  // Lấy danh sách categories từ books
  const categories = [...new Set(books.map(book => book.category).filter(Boolean))];
  
  // Lấy giá min/max từ books
  const prices = books.map(book => book.price).filter(price => price > 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      priceRange: '',
      sortBy: 'name',
      sortOrder: 'asc'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-3 mb-4">
      <div className="flex flex-wrap items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-900">
          Bộ lọc sách
        </h3>
        <button
          onClick={clearFilters}
          className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-all duration-200"
        >
          Xóa bộ lọc
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Tìm kiếm */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Tìm kiếm
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Tên sách, tác giả..."
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Danh mục */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Danh mục
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tất cả</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Khoảng giá */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Khoảng giá
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tất cả</option>
            <option value="0-50000">Dưới 50.000đ</option>
            <option value="50000-100000">50.000đ - 100.000đ</option>
            <option value="100000-200000">100.000đ - 200.000đ</option>
            <option value="200000-500000">200.000đ - 500.000đ</option>
            <option value="500000-999999">Trên 500.000đ</option>
          </select>
        </div>

        {/* Sắp xếp */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Sắp xếp
          </label>
          <div className="flex gap-1">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">Tên sách</option>
              <option value="price">Giá</option>
              <option value="rating">Đánh giá</option>
              <option value="date">Ngày xuất bản</option>
            </select>
            <select
              value={filters.sortOrder}
              onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
              className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="asc">↑</option>
              <option value="desc">↓</option>
            </select>
          </div>
        </div>
      </div>

      {/* Kết quả lọc */}
      <div className="mt-3 pt-2 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-between text-xs text-gray-600">
          <div>
            <span className="font-medium">{books.length}</span> sách
          </div>
          {(filters.search || filters.category || filters.priceRange) && (
            <div className="flex flex-wrap gap-1 mt-1">
              {filters.search && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-blue-100 text-blue-800">
                  "{filters.search}"
                </span>
              )}
              {filters.category && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-green-100 text-green-800">
                  {filters.category}
                </span>
              )}
              {filters.priceRange && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-yellow-100 text-yellow-800">
                  {filters.priceRange.replace('-', '-')}đ
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookFilter;
