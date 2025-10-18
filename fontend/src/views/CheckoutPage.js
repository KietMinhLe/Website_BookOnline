import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'cod'
  });
  const [loading, setLoading] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate order processing
    setTimeout(() => {
      setLoading(false);
      clearCart();
      navigate('/order-success', { 
        state: { 
          orderNumber: 'ORD' + Date.now(),
          customerInfo,
          items,
          total
        }
      });
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🛒</div>
            <h2>Giỏ hàng trống</h2>
            <p>Bạn cần có sản phẩm trong giỏ hàng để thanh toán</p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
            Thanh toán
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Customer Information */}
            <div className="space-y-6">
              <div className="card">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">
                    Thông tin giao hàng
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        required
                        className="input"
                        placeholder="Nhập họ và tên"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        required
                        className="input"
                        placeholder="Nhập email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        required
                        className="input"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Địa chỉ *
                      </label>
                      <textarea
                        name="address"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="input"
                        placeholder="Nhập địa chỉ chi tiết"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thành phố *
                      </label>
                      <select
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        required
                        className="input"
                      >
                        <option value="">Chọn thành phố</option>
                        <option value="hanoi">Hà Nội</option>
                        <option value="hcm">TP. Hồ Chí Minh</option>
                        <option value="danang">Đà Nẵng</option>
                        <option value="cantho">Cần Thơ</option>
                        <option value="haiphong">Hải Phòng</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">
                    Phương thức thanh toán
                  </h2>

                  <div className="space-y-4">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={customerInfo.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="ml-3">
                        <div className="flex items-center">
                          <span className="text-lg">💰</span>
                          <span className="ml-2 font-medium">Thanh toán khi nhận hàng (COD)</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Thanh toán bằng tiền mặt khi nhận hàng
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={customerInfo.paymentMethod === 'bank'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="ml-3">
                        <div className="flex items-center">
                          <span className="text-lg">🏦</span>
                          <span className="ml-2 font-medium">Chuyển khoản ngân hàng</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Chuyển khoản qua ngân hàng
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="momo"
                        checked={customerInfo.paymentMethod === 'momo'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="ml-3">
                        <div className="flex items-center">
                          <span className="text-lg">📱</span>
                          <span className="ml-2 font-medium">Ví MoMo</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Thanh toán qua ứng dụng MoMo
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="card">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">
                    Đơn hàng của bạn
                  </h2>

                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 md:space-x-4">
                        <div className="w-12 h-16 md:w-16 md:h-20 flex-shrink-0">
                          <img
                            src={item.image || '/placeholder-book.jpg'}
                            alt={item.title}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 line-clamp-2 text-sm md:text-base">
                            {item.title}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-600">
                            Số lượng: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 text-sm md:text-base">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="my-6 border-gray-200" />

                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Tạm tính:</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Phí vận chuyển:</span>
                      <span className="text-green-600">Miễn phí</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Tổng cộng:</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full mt-6"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Đang xử lý...
                      </div>
                    ) : (
                      'Đặt hàng'
                    )}
                  </button>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-green-50 p-4 md:p-6 rounded-lg border border-green-200">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800 mb-1 md:mb-2 text-sm md:text-base">Bảo mật thanh toán</h3>
                    <p className="text-green-700 text-sm md:text-base">
                      Thông tin của bạn được bảo mật và mã hóa
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;