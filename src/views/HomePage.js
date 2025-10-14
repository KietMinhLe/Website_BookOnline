import React, { useState, useMemo } from 'react';
import { useBooks } from '../contexts/BookContext';
import BookCard from '../components/BookCard';
import BookFilter from '../components/BookFilter';

const HomePage = () => {
  const { books, loading, error, loadBooks } = useBooks();
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceRange: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  // Hàm lọc và sắp xếp sách
  const filteredBooks = useMemo(() => {
    let filtered = [...books];

    // Lọc theo tìm kiếm
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(book => 
        book.title?.toLowerCase().includes(searchTerm) ||
        book.author?.toLowerCase().includes(searchTerm) ||
        book.description?.toLowerCase().includes(searchTerm)
      );
    }

    // Lọc theo danh mục
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
  }, [books, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <div className="error-content">
          <h2>Có lỗi xảy ra</h2>
          <p>{error}</p>
          <button onClick={() => loadBooks()} className="btn-primary">
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="hero">
        <div className="container text-center">
          <h1 className="hero-title">
            Khám phá thế giới sách
          </h1>
          <p className="hero-subtitle">
            Hàng ngàn đầu sách chất lượng với giá cả hợp lý
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">
              Mua sắm ngay
            </button>
            <button className="btn-secondary">
              Khám phá danh mục
            </button>
          </div>
        </div>
      </section>

      {/* Book Filter */}
      <section className="py-8">
        <div className="container">
          <BookFilter onFilterChange={handleFilterChange} books={books} />
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
              {filters.search || filters.category || filters.priceRange ? 'Kết quả tìm kiếm' : 'Sách nổi bật'}
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              {filters.search || filters.category || filters.priceRange 
                ? `Tìm thấy ${filteredBooks.length} cuốn sách phù hợp`
                : 'Những cuốn sách được yêu thích nhất'
              }
            </p>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="empty-state">
              <div className="text-lg text-gray-500">
                {filters.search || filters.category || filters.priceRange 
                  ? 'Không tìm thấy sách phù hợp' 
                  : 'Không có sách nào'
                }
              </div>
              <p className="text-gray-400 mt-2">
                {filters.search || filters.category || filters.priceRange 
                  ? 'Hãy thử thay đổi bộ lọc' 
                  : 'Hãy thử lại sau'
                }
              </p>
            </div>
          ) : (
            <div className="book-grid">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
              Danh mục sách
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Tìm kiếm sách theo sở thích của bạn
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {[
              { name: 'Tiểu thuyết', icon: '📚', color: 'bg-blue-500' },
              { name: 'Khoa học', icon: '🔬', color: 'bg-green-500' },
              { name: 'Lịch sử', icon: '🏛️', color: 'bg-yellow-500' },
              { name: 'Nghệ thuật', icon: '🎨', color: 'bg-purple-500' },
              { name: 'Thể thao', icon: '⚽', color: 'bg-orange-500' },
              { name: 'Du lịch', icon: '✈️', color: 'bg-pink-500' },
            ].map((category, index) => (
              <div
                key={index}
                className="text-center p-4 md:p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-xl md:text-2xl text-white group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary-600 py-12 md:py-16">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">
            Đăng ký nhận tin
          </h2>
          <p className="text-lg md:text-xl text-primary-100 mb-6 md:mb-8">
            Nhận thông tin về sách mới và khuyến mãi
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 md:gap-4">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="input flex-1"
            />
            <button className="btn-primary whitespace-nowrap">
              Đăng ký
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
