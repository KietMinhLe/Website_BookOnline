import React, { useState } from 'react';
import { useCategory } from '../contexts/CategoryContext';

const CategoryFilter = () => {
  const { 
    searchTerm, 
    sortBy, 
    filters, 
    setSearchTerm, 
    setSortBy, 
    setFilters, 
    clearFilters 
  } = useCategory();

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleBookCountRangeChange = (index, value) => {
    const newRange = [...filters.bookCountRange];
    newRange[index] = parseInt(value);
    setFilters({ bookCountRange: newRange });
  };

  const sortOptions = [
    { value: 'name', label: 'Tên A-Z' },
    { value: 'bookCount', label: 'Số lượng sách' },
    { value: 'newest', label: 'Mới nhất' },
    { value: 'popular', label: 'Phổ biến' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
      {/* Basic Search and Sort */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm danh mục sách..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            />
            <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 h-6 w-6 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold text-gray-700">Sắp xếp:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white font-medium"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-blue-600 hover:text-blue-700 border-2 border-blue-200 rounded-xl hover:bg-blue-50 transition-all duration-200 hover:border-blue-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
          Bộ lọc nâng cao
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="border-t pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Book Count Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số lượng sách
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    value={filters.bookCountRange[0]}
                    onChange={(e) => handleBookCountRangeChange(0, e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Min"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    value={filters.bookCountRange[1]}
                    onChange={(e) => handleBookCountRangeChange(1, e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Max"
                  />
                </div>
                <div className="text-xs text-gray-500">
                  Hiện tại: {filters.bookCountRange[0]} - {filters.bookCountRange[1]} sách
                </div>
              </div>
            </div>

            {/* Has Books Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái sách
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.hasBooks}
                    onChange={(e) => setFilters({ hasBooks: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Có sách</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.featured}
                    onChange={(e) => setFilters({ featured: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Danh mục nổi bật</span>
                </label>
              </div>
            </div>

            {/* Quick Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bộ lọc nhanh
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setFilters({ bookCountRange: [100, 1000] })}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded border border-gray-200"
                >
                  Danh mục lớn (100+ sách)
                </button>
                <button
                  onClick={() => setFilters({ bookCountRange: [0, 50] })}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded border border-gray-200"
                >
                  Danh mục nhỏ (≤50 sách)
                </button>
                <button
                  onClick={() => setFilters({ bookCountRange: [50, 150] })}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded border border-gray-200"
                >
                  Danh mục trung bình
                </button>
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600">
              Đang áp dụng {Object.values(filters).filter(Boolean).length} bộ lọc
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Xóa tất cả
              </button>
              <button
                onClick={() => setShowAdvancedFilters(false)}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
