import React from 'react';
import { useBooks } from '../contexts/BookContext';
import BookCard from '../components/BookCard';

const HomePage = () => {
  const { books, loading, error, loadBooks } = useBooks();

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

      {/* Featured Books */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
              Sách nổi bật
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Những cuốn sách được yêu thích nhất
            </p>
          </div>

          {books.length === 0 ? (
            <div className="empty-state">
              <div className="text-lg text-gray-500">Không có sách nào</div>
              <p className="text-gray-400 mt-2">Hãy thử lại sau</p>
            </div>
          ) : (
            <div className="book-grid">
              {books.slice(0, 10).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
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
