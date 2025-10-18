import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooks } from '../contexts/BookContext';
import { useCart } from '../contexts/CartContext';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentBook, loading, error, loadBookById } = useBooks();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      loadBookById(id);
    }
  }, [id, loadBookById]);

  const handleAddToCart = () => {
    addToCart(currentBook, quantity);
  };

  const handleBuyNow = () => {
    addToCart(currentBook, quantity);
    navigate('/cart');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !currentBook) {
    return (
      <div className="error-message">
        <div className="error-content">
          <h2>Không tìm thấy sách</h2>
          <p>{error || 'Sách không tồn tại'}</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <button onClick={() => navigate('/')} className="hover:text-primary-600">
                Trang chủ
              </button>
            </li>
            <li>/</li>
            <li>
              <button onClick={() => navigate('/categories')} className="hover:text-primary-600">
                Danh mục
              </button>
            </li>
            <li>/</li>
            <li className="text-gray-900">{currentBook.tieuDe}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Book Image */}
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
              <img
                src={currentBook.hinhAnh || '/placeholder-book.jpg'}
                alt={currentBook.tieuDe}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/placeholder-book.jpg';
                }}
              />
            </div>
            
            {/* Additional Images (if available) */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[3/4] bg-gray-200 rounded overflow-hidden">
                  <img
                    src={currentBook.hinhAnh || '/placeholder-book.jpg'}
                    alt={`${currentBook.tieuDe} ${i}`}
                    className="w-full h-full object-cover opacity-50"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Book Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                {currentBook.tieuDe}
              </h1>
              
              {currentBook.tacGia && (
                <p className="text-base md:text-lg text-gray-600 mb-2">
                  <span className="font-semibold">Tác giả:</span> {currentBook.tacGia}
                </p>
              )}
              
              {currentBook.nhaXuatBan && (
                <p className="text-sm md:text-base text-gray-600 mb-2">
                  <span className="font-semibold">Nhà xuất bản:</span> {currentBook.nhaXuatBan}
                </p>
              )}
              
              {currentBook.namXuatBan && (
                <p className="text-sm md:text-base text-gray-600 mb-2">
                  <span className="font-semibold">Năm xuất bản:</span> {currentBook.namXuatBan}
                </p>
              )}

              {/* Rating */}
              {currentBook.danhGia && (
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(currentBook.danhGia)
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
                  <span className="ml-2 text-gray-600">
                    ({currentBook.danhGia}/5) - 128 đánh giá
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <span className="text-2xl md:text-3xl font-bold text-primary-600">
                  {formatPrice(currentBook.giaBan || 0)}
                </span>
                {currentBook.giaGoc && currentBook.giaGoc > currentBook.giaBan && (
                  <span className="text-base md:text-lg text-gray-500 line-through">
                    {formatPrice(currentBook.giaGoc)}
                  </span>
                )}
              </div>
              
              {currentBook.giaGoc && currentBook.giaGoc > currentBook.giaBan && (
                <div className="text-green-600 font-semibold">
                  Tiết kiệm {formatPrice(currentBook.giaGoc - currentBook.giaBan)}
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số lượng:
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-4 py-2 text-gray-900 font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`btn-primary flex-1 ${
                    isInCart(currentBook.id) ? 'bg-green-600 hover:bg-green-700' : ''
                  }`}
                >
                  {isInCart(currentBook.id) ? (
                    `Đã thêm vào giỏ (${getItemQuantity(currentBook.id)})`
                  ) : (
                    'Thêm vào giỏ hàng'
                  )}
                </button>
                
                <button
                  onClick={handleBuyNow}
                  className="bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex-1"
                >
                  Mua ngay
                </button>
              </div>
            </div>

            {/* Book Details */}
            {currentBook.moTa && (
              <div className="card">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Mô tả sách
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {currentBook.moTa}
                  </p>
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Thông tin chi tiết
                </h3>
                <div className="space-y-2 text-sm">
                  {currentBook.soTrang && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Số trang:</span>
                      <span className="font-medium">{currentBook.soTrang}</span>
                    </div>
                  )}
                  {currentBook.kichThuoc && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kích thước:</span>
                      <span className="font-medium">{currentBook.kichThuoc}</span>
                    </div>
                  )}
                  {currentBook.trongLuong && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trọng lượng:</span>
                      <span className="font-medium">{currentBook.trongLuong}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tình trạng:</span>
                    <span className="font-medium text-green-600">Còn hàng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;