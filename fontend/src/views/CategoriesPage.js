import React, { useState, useMemo } from 'react';
import BookCard from '../components/BookCard';

const CategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceRange: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const categories = [
    { id: 'all', name: 'Tất cả', count: 1250 },
    { id: 'fiction', name: 'Tiểu thuyết', count: 320 },
    { id: 'business', name: 'Kinh doanh', count: 180 },
    { id: 'education', name: 'Giáo dục', count: 250 },
    { id: 'technology', name: 'Công nghệ', count: 150 },
    { id: 'health', name: 'Sức khỏe', count: 120 },
    { id: 'children', name: 'Thiếu nhi', count: 200 },
    { id: 'history', name: 'Lịch sử', count: 80 },
  ];

  const books = [
    {
      id: 1,
      title: 'Đắc Nhân Tâm',
      author: 'Dale Carnegie',
      price: 89000,
      image: '/images/dacnhantam.jpg',
      category: 'business',
      rating: 4.8,
      reviews: 1250,
      publishDate: '2020-01-15'
    },
    {
      id: 2,
      title: 'Tôi Tài Giỏi, Bạn Cũng Thế',
      author: 'Adam Khoo',
      price: 120000,
      image: '/images/toitaigioi.jpg',
      category: 'education',
      rating: 4.6,
      reviews: 890,
      publishDate: '2019-03-20'
    },
    {
      id: 3,
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      price: 150000,
      image: '/images/sapiens.jpg',
      category: 'history',
      rating: 4.9,
      reviews: 2100,
      publishDate: '2021-05-10'
    },
    {
      id: 4,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      price: 180000,
      image: '/images/book4.jpg',
      category: 'technology',
      rating: 4.7,
      reviews: 1560
    },
    {
      id: 5,
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      price: 95000,
      image: '/images/book5.jpg',
      category: 'children',
      rating: 4.9,
      reviews: 3200
    },
    {
      id: 6,
      title: 'Dune',
      author: 'Frank Herbert',
      price: 110000,
      image: '/images/book6.jpg',
      category: 'fiction',
      rating: 4.5,
      reviews: 980
    }
  ];

  // Hàm lọc và sắp xếp sách
  const filteredBooks = useMemo(() => {
    let filtered = [...books];

    // Lọc theo danh mục được chọn
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    // Lọc theo tìm kiếm
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(book => 
        book.title?.toLowerCase().includes(searchTerm) ||
        book.author?.toLowerCase().includes(searchTerm) ||
        book.description?.toLowerCase().includes(searchTerm)
      );
    }

    // Lọc theo danh mục từ bộ lọc
    if (filters.category) {
      filtered = filtered.filter(book => book.category === filters.category);
    }

    // Lọc theo khoảng giá
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(book => {
        const price = book.price || 0;
        return price >= min && (max ? price <= max : true);
      });
    }

    // Sắp xếp
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortBy) {
        case 'name':
          aValue = a.title || '';
          bValue = b.title || '';
          break;
        case 'price':
          aValue = a.price || 0;
          bValue = b.price || 0;
          break;
        case 'rating':
          aValue = a.rating || 0;
          bValue = b.rating || 0;
          break;
        case 'date':
          aValue = new Date(a.publishDate || 0);
          bValue = new Date(b.publishDate || 0);
          break;
        default:
          aValue = a.title || '';
          bValue = b.title || '';
      }

      if (filters.sortOrder === 'desc') {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [books, selectedCategory, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Danh mục sách</h1>
          <p className="text-gray-600 mt-1">Khám phá các thể loại sách phong phú</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Thể loại</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-red-50 text-red-600 border border-red-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm text-gray-500">({category.count})</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Books Grid */}
          <div className="lg:w-3/4">
            {/* Book Filter */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sách..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="name">Sắp xếp theo tên</option>
                    <option value="price">Sắp xếp theo giá</option>
                    <option value="rating">Sắp xếp theo đánh giá</option>
                  </select>
                  <select
                    value={filters.sortOrder}
                    onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="asc">Tăng dần</option>
                    <option value="desc">Giảm dần</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedCategory === 'all' 
                  ? 'Tất cả sách' 
                  : categories.find(c => c.id === selectedCategory)?.name
                }
              </h2>
              <p className="text-gray-600">
                Hiển thị {filteredBooks.length} sách
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div key={book.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-w-3 aspect-h-4 bg-gray-200 rounded-t-lg">
                    <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Hình ảnh sách</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(book.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        {book.rating} ({book.reviews} đánh giá)
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-red-600">
                        {book.price.toLocaleString('vi-VN')}đ
                      </span>
                      <button className="bg-red-600 text-black px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium">
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBooks.length === 0 && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Không tìm thấy sách</h3>
                <p className="mt-1 text-sm text-gray-500">Hãy thử chọn thể loại khác.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
