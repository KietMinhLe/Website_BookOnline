import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, customerInfo, items, total } = location.state || {};

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (!location.state) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="container">
          <div className="error-message">
            <div className="error-content">
              <h2>Không tìm thấy thông tin đơn hàng</h2>
              <button
                onClick={() => navigate('/')}
                className="btn-primary"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Đặt hàng thành công!
            </h1>
            <p className="text-lg text-gray-600">
              Cảm ơn bạn đã mua sắm tại BookStore. Chúng tôi sẽ xử lý đơn hàng của bạn ngay.
            </p>
          </div>

          {/* Order Details */}
          <div className="card mb-8">
            <div className="p-6">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Thông tin đơn hàng
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Mã đơn hàng</h3>
                    <p className="text-primary-600 font-semibold">{orderNumber}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Tổng tiền</h3>
                    <p className="text-primary-600 font-semibold text-xl">{formatPrice(total)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="card mb-8">
            <div className="p-6">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Thông tin giao hàng
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Họ và tên</h3>
                    <p className="text-gray-600">{customerInfo.name}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">{customerInfo.email}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Số điện thoại</h3>
                    <p className="text-gray-600">{customerInfo.phone}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Thành phố</h3>
                    <p className="text-gray-600">{customerInfo.city}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-medium text-gray-900 mb-1">Địa chỉ</h3>
                    <p className="text-gray-600">{customerInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="card mb-8">
            <div className="p-6">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Sản phẩm đã đặt
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-b-0">
                      <div className="w-16 h-20 flex-shrink-0">
                        <img
                          src={item.image || '/placeholder-book.jpg'}
                          alt={item.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <svg className="h-6 w-6 text-blue-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Thông tin thanh toán</h3>
                <p className="text-blue-700">
                  {customerInfo.paymentMethod === 'cod' && 
                    'Bạn sẽ thanh toán bằng tiền mặt khi nhận hàng. Đơn hàng sẽ được giao trong 2-3 ngày làm việc.'
                  }
                  {customerInfo.paymentMethod === 'bank' && 
                    'Vui lòng chuyển khoản số tiền ' + formatPrice(total) + ' đến tài khoản ngân hàng. Chúng tôi sẽ xác nhận đơn hàng sau khi nhận được thanh toán.'
                  }
                  {customerInfo.paymentMethod === 'momo' && 
                    'Vui lòng thanh toán qua MoMo số tiền ' + formatPrice(total) + '. Chúng tôi sẽ xác nhận đơn hàng sau khi nhận được thanh toán.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Tiếp tục mua sắm
            </button>
            <button
              onClick={() => window.print()}
              className="btn-secondary"
            >
              In hóa đơn
            </button>
          </div>

          {/* Contact Info */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Nếu có thắc mắc, vui lòng liên hệ với chúng tôi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-500">
              <span>📧 Email: support@bookstore.com</span>
              <span>📞 Hotline: 1900 1234</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;