import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Giỏ hàng trống</h2>
            <p className="text-gray-600 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
              </svg>
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Giỏ hàng của bạn
              </h1>
              <p className="text-gray-600 mt-1">
                {itemCount} sản phẩm trong giỏ hàng
              </p>
            </div>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors self-start sm:self-auto"
            >
              Xóa tất cả
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {items.map((item) => (
                <div key={item.id} className="cart-item flex items-start p-4 border-b border-gray-100 last:border-b-0 gap-4 hover:bg-gray-50 transition-colors">
                  {/* Book Image - Fixed size for all books */}
                  <div className="w-20 h-28 flex-shrink-0" style={{ aspectRatio: '3/4', minWidth: '80px', minHeight: '112px', maxWidth: '80px', maxHeight: '112px' }}>
                    <img
                      src={item.image || '/placeholder-book.jpg'}
                      alt={item.title}
                      className="w-full h-full object-cover rounded shadow-sm"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', maxWidth: '80px', maxHeight: '112px' }}
                      onError={(e) => {
                        e.target.src = '/placeholder-book.jpg';
                      }}
                    />
                  </div>

                  {/* Book Info - Detailed like homepage */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    {item.author && (
                      <p className="text-sm text-gray-600 mb-1">
                        Tác giả: {item.author}
                      </p>
                    )}
                    
                    {item.publisher && (
                      <p className="text-xs text-gray-500 mb-2">
                        NXB: {item.publisher}
                      </p>
                    )}

                    {/* Rating */}
                    {item.rating && (
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(item.rating)
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
                        <span className="text-sm text-gray-600 ml-1">({item.rating}/5)</span>
                      </div>
                    )}

                    <p className="text-primary-600 font-bold text-lg mb-3">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity Controls - Larger */}
                  <div className="flex flex-col items-end space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm">
                        {/* Nút giảm - bên trái */}
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-l-lg transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                          disabled={item.quantity <= 1}
                        >
                          <span className="text-lg font-bold">−</span>
                        </button>

                        {/* Số lượng ở giữa */}
                        <div className="w-12 h-8 bg-white text-gray-900 font-bold text-lg flex items-center justify-center border-x border-gray-200">
                          {item.quantity}
                        </div>

                        {/* Nút tăng - bên phải */}
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-r-lg transition-all duration-200 font-bold flex items-center justify-center"
                        >
                          <span className="text-lg font-bold">+</span>
                        </button>
                      </div>

                      {/* Remove Button - More visible */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border-2 border-red-700"
                        style={{ backgroundColor: '#dc2626', borderColor: '#b91c1c' }}
                        title="Xóa sản phẩm khỏi giỏ hàng"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm sticky top-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Tóm tắt đơn hàng
                </h3>

                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Phí vận chuyển:</span>
                    <span className="text-green-600">Miễn phí</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Thuế:</span>
                    <span>Đã bao gồm</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-sm font-semibold text-gray-900">
                    <span>Tổng cộng:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="btn-primary w-full text-center block mb-2 py-1.5 text-xs"
                >
                  Thanh toán
                </Link>

                <Link
                  to="/"
                  className="w-full border border-gray-300 text-gray-700 py-1.5 rounded font-medium text-center block hover:bg-gray-50 transition-colors text-xs"
                >
                  Tiếp tục mua sắm
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;