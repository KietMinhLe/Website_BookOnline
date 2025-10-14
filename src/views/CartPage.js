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
      <div className="bg-gray-50 py-16">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🛒</div>
            <h2>Giỏ hàng trống</h2>
            <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
            <Link to="/" className="btn-primary">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Giỏ hàng ({itemCount} sản phẩm)
          </h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium self-start sm:self-auto"
          >
            Xóa tất cả
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="card">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 md:p-6 border-b border-gray-200 last:border-b-0 gap-4">
                  {/* Book Image */}
                  <div className="w-16 h-20 sm:w-20 sm:h-28 flex-shrink-0">
                    <img
                      src={item.image || '/placeholder-book.jpg'}
                      alt={item.title}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        e.target.src = '/placeholder-book.jpg';
                      }}
                    />
                  </div>

                  {/* Book Info */}
                  <div className="flex-1 sm:ml-6 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-primary-600 font-bold text-base md:text-lg">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 sm:px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="px-3 sm:px-4 py-2 text-gray-900 font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 sm:px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-4">
              <div className="p-4 md:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                  Tóm tắt đơn hàng
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển:</span>
                    <span className="text-green-600">Miễn phí</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Thuế:</span>
                    <span>Đã bao gồm</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Tổng cộng:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="btn-primary w-full text-center block mb-4"
                >
                  Thanh toán
                </Link>

                <Link
                  to="/"
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold text-center block hover:bg-gray-50 transition-colors"
                >
                  Tiếp tục mua sắm
                </Link>

                {/* Security Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="h-5 w-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Thanh toán an toàn & bảo mật</span>
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

export default CartPage;