import React from 'react';
import { useCategory } from '../contexts/CategoryContext';

const CategoryStats = () => {
  const { filteredCategories, searchTerm, filters } = useCategory();

  const getStats = () => {
    const totalCategories = filteredCategories.length;
    const totalBooks = filteredCategories.reduce((total, cat) => total + cat.bookCount, 0);
    const averageBooks = totalCategories > 0 ? Math.round(totalBooks / totalCategories) : 0;
    
    const largestCategory = filteredCategories.reduce((max, cat) => 
      cat.bookCount > max.bookCount ? cat : max, 
      { name: '', bookCount: 0 }
    );
    
    const smallestCategory = filteredCategories.reduce((min, cat) => 
      cat.bookCount < min.bookCount ? cat : min, 
      { name: '', bookCount: Infinity }
    );

    const categoriesWithBooks = filteredCategories.filter(cat => cat.bookCount > 0).length;
    const emptyCategories = totalCategories - categoriesWithBooks;

    return {
      totalCategories,
      totalBooks,
      averageBooks,
      largestCategory,
      smallestCategory,
      categoriesWithBooks,
      emptyCategories
    };
  };

  const stats = getStats();

  const StatCard = ({ title, value, subtitle, icon, color = 'blue' }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color === 'blue' ? 'bg-blue-100' : color === 'green' ? 'bg-green-100' : color === 'purple' ? 'bg-purple-100' : color === 'emerald' ? 'bg-emerald-100' : 'bg-gray-100'}`}>
          <div className={`text-xl ${color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-green-600' : color === 'purple' ? 'text-purple-600' : color === 'emerald' ? 'text-emerald-600' : 'text-gray-600'}`}>{icon}</div>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  const ProgressBar = ({ label, value, max, color = 'blue' }) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-900">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`bg-${color}-500 h-2 rounded-full transition-all duration-300`}
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={searchTerm ? "Danh mục tìm thấy" : "Tổng danh mục"}
          value={stats.totalCategories}
          subtitle="danh mục"
          icon="📚"
          color="blue"
        />
        
        <StatCard
          title={searchTerm ? "Sách trong kết quả" : "Tổng số sách"}
          value={stats.totalBooks.toLocaleString()}
          subtitle="sách"
          icon="📖"
          color="green"
        />
        
        <StatCard
          title="Trung bình mỗi danh mục"
          value={stats.averageBooks}
          subtitle="sách/danh mục"
          icon="📊"
          color="purple"
        />
        
        <StatCard
          title="Danh mục có sách"
          value={stats.categoriesWithBooks}
          subtitle={`/ ${stats.totalCategories}`}
          icon="✅"
          color="emerald"
        />
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Phân tích chi tiết</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Distribution */}
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-4">Phân bố số lượng sách</h4>
            <div className="space-y-3">
              <ProgressBar
                label="Danh mục lớn (100+ sách)"
                value={filteredCategories.filter(cat => cat.bookCount >= 100).length}
                max={stats.totalCategories}
                color="green"
              />
              <ProgressBar
                label="Danh mục trung bình (50-99 sách)"
                value={filteredCategories.filter(cat => cat.bookCount >= 50 && cat.bookCount < 100).length}
                max={stats.totalCategories}
                color="blue"
              />
              <ProgressBar
                label="Danh mục nhỏ (<50 sách)"
                value={filteredCategories.filter(cat => cat.bookCount < 50).length}
                max={stats.totalCategories}
                color="yellow"
              />
            </div>
          </div>

          {/* Top Categories */}
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-4">Danh mục hàng đầu</h4>
            <div className="space-y-3">
              {filteredCategories
                .sort((a, b) => b.bookCount - a.bookCount)
                .slice(0, 5)
                .map((category, index) => (
                  <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-blue-600 mr-3">#{index + 1}</span>
                      <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    </div>
                    <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded-full">
                      {category.bookCount} sách
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{stats.largestCategory.name}</div>
              <div className="text-gray-600">Danh mục lớn nhất</div>
              <div className="text-xs text-gray-500">{stats.largestCategory.bookCount} sách</div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{stats.averageBooks}</div>
              <div className="text-gray-600">Trung bình</div>
              <div className="text-xs text-gray-500">sách/danh mục</div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{stats.emptyCategories}</div>
              <div className="text-gray-600">Danh mục trống</div>
              <div className="text-xs text-gray-500">chưa có sách</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Summary */}
      {(searchTerm || Object.values(filters).some(f => f !== false && f !== 0)) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-800">Bộ lọc đang áp dụng</h4>
              <p className="text-xs text-blue-700 mt-1">
                {searchTerm && `Tìm kiếm: "${searchTerm}"`}
                {filters.bookCountRange[0] > 0 && ` • Số sách: ${filters.bookCountRange[0]}-${filters.bookCountRange[1]}`}
                {filters.hasBooks && ` • Chỉ danh mục có sách`}
                {filters.featured && ` • Chỉ danh mục nổi bật`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryStats;
