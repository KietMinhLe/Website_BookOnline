import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCreditCard, FaLock, FaArrowLeft } from 'react-icons/fa';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  // Form states
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderItems, setOrderItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    tax: 0,
    shipping: 0,
    discount: 0,
    total: 0
  });

  // Mock cart data (same as CartPage)
  const mockCartItems = [
    {
      id: 1,
      book: {
        id: 1,
        title: "React.js Complete Guide",
        author: "Maximilian Schwarzmüller",
        price: 500000,
        image: "https://via.placeholder.com/300x400/6366f1/ffffff?text=React+Guide",
        category: "Công nghệ"
      },
      quantity: 2
    },
    {
      id: 2,
      book: {
        id: 2,
        title: "JavaScript ES6+ Mastery",
        author: "Kyle Simpson",
        price: 400000,
        image: "https://via.placeholder.com/300x400/ec4899/ffffff?text=JS+ES6",
        category: "Lập trình"
      },
      quantity: 1
    }
  ];

  useEffect(() => {
    // Load cart data and calculate totals
    setOrderItems(mockCartItems);
    calculateOrderSummary(mockCartItems);
  }, [paymentMethod, customerInfo.city]);

  const calculateShippingFee = (city) => {
    const shippingRates = {
      // Miền Nam - gần TP.HCM
      'hcm': 15000,           // TP. Hồ Chí Minh
      'binhduong': 18000,    // Bình Dương
      'dongnai': 20000,      // Đồng Nai
      'longan': 20000,       // Long An
      'tayninh': 22000,      // Tây Ninh
      
      // Miền Nam - xa hơn
      'cantho': 25000,       // Cần Thơ
      'angiang': 28000,      // An Giang
      'kiengiang': 30000,    // Kiên Giang
      
      // Miền Bắc
      'hanoi': 20000,        // Hà Nội
      'haiphong': 22000,     // Hải Phòng
      
      // Miền Trung
      'danang': 25000,       // Đà Nẵng
      
      // Các tỉnh khác
      'other': 35000,        // Tỉnh/Thành phố khác
      'default': 35000       // Fallback
    };
    
    return shippingRates[city] || shippingRates['default'];
  };

  const calculateOrderSummary = (items) => {
    const subtotal = items.reduce((total, item) => total + (item.book.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    
    // Calculate shipping based on city and order value
    let shipping = 0;
    if (subtotal < 500000) {
      shipping = calculateShippingFee(customerInfo.city);
    }
    
    const discount = 0; // No discount for now
    const total = subtotal + tax + shipping - discount;

    setOrderSummary({ subtotal, tax, shipping, discount, total });
  };

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

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setOrderSuccess(true);
    }, 2000);
  };

  const OrderItem = ({ item }) => (
    <div className="checkout-item d-flex align-items-center mb-3 p-3 border rounded">
      <img
        src={item.book.image}
        alt={item.book.title}
        className="me-3"
        style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <div className="flex-grow-1">
        <h6 className="mb-1">{item.book.title}</h6>
        <p className="text-muted small mb-1">Tác giả: {item.book.author}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted">Số lượng: {item.quantity}</span>
          <span className="fw-bold text-primary">
            {formatPrice(item.book.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );

  if (orderSuccess) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="text-center border-0 shadow">
              <Card.Body className="p-5">
                <div className="text-success mb-4">
                  <div className="fs-1">✅</div>
                </div>
                <h3 className="mb-3">Đặt hàng thành công!</h3>
                <p className="text-muted mb-4">
                  Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
                </p>
                <div className="d-grid gap-2">
                  <Button variant="primary" as={Link} to="/">
                    Về trang chủ
                  </Button>
                  <Button variant="outline-primary" as={Link} to="/orders">
                    Xem đơn hàng
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center mb-3">
            <Button variant="outline-secondary" as={Link} to="/cart" className="me-3">
              <FaArrowLeft className="me-2" />
              Quay lại giỏ hàng
            </Button>
            <h1 className="h2 fw-bold mb-0">Thanh toán</h1>
          </div>
          <p className="text-muted">Hoàn tất đơn hàng của bạn</p>
        </Col>
      </Row>

      <Row>
        {/* Customer Information Form */}
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <FaUser className="me-2" />
                Thông tin khách hàng
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Họ và tên *</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        value={customerInfo.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="Nhập họ và tên"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Nhập email"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Số điện thoại *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="Nhập số điện thoại"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Thành phố *</Form.Label>
                      <Form.Select
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Chọn thành phố/tỉnh</option>
                        <option value="hcm">TP. Hồ Chí Minh</option>
                        <option value="hanoi">Hà Nội</option>
                        <option value="danang">Đà Nẵng</option>
                        <option value="cantho">Cần Thơ</option>
                        <option value="haiphong">Hải Phòng</option>
                        <option value="binhduong">Bình Dương</option>
                        <option value="dongnai">Đồng Nai</option>
                        <option value="longan">Long An</option>
                        <option value="tayninh">Tây Ninh</option>
                        <option value="angiang">An Giang</option>
                        <option value="kiengiang">Kiên Giang</option>
                        <option value="other">Tỉnh/Thành phố khác</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Quận/Huyện *</Form.Label>
                      <Form.Control
                        type="text"
                        name="district"
                        value={customerInfo.district}
                        onChange={handleInputChange}
                        required
                        placeholder="Nhập quận/huyện"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phường/Xã *</Form.Label>
                      <Form.Control
                        type="text"
                        name="ward"
                        value={customerInfo.ward}
                        onChange={handleInputChange}
                        required
                        placeholder="Nhập phường/xã"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Địa chỉ chi tiết *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Nhập địa chỉ chi tiết"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Ghi chú</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="note"
                    value={customerInfo.note}
                    onChange={handleInputChange}
                    placeholder="Ghi chú thêm cho đơn hàng"
                  />
                </Form.Group>

                {/* Payment Method */}
                <Card className="mb-4">
                  <Card.Header>
                    <h6 className="mb-0">
                      <FaCreditCard className="me-2" />
                      Phương thức thanh toán
                    </h6>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group>
                      <div className="d-flex gap-3 mb-3">
                        <Form.Check
                          type="radio"
                          id="cod"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          label="Thanh toán khi nhận hàng (COD)"
                        />
                        <Form.Check
                          type="radio"
                          id="bank"
                          name="paymentMethod"
                          value="bank"
                          checked={paymentMethod === 'bank'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          label="Chuyển khoản ngân hàng"
                        />
                      </div>
                    </Form.Group>

                    {/* Bank Transfer Information */}
                    {paymentMethod === 'bank' && (
                      <Card className="payment-method-card">
                        <Card.Body>
                          <h6 className="mb-3 text-primary">
                            <FaCreditCard className="me-2" />
                            Thông tin chuyển khoản
                          </h6>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="bank-info-item mb-3">
                                <strong>Ngân hàng:</strong>
                                <p className="mb-1">Vietcombank (VCB)</p>
                              </div>
                              <div className="bank-info-item mb-3">
                                <strong>Số tài khoản:</strong>
                                <p className="mb-1">
                                  <code className="bg-light p-2 rounded">0123456789</code>
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="bank-info-item mb-3">
                                <strong>Chủ tài khoản:</strong>
                                <p className="mb-1">BOOKSTORE COMPANY</p>
                              </div>
                              <div className="bank-info-item mb-3">
                                <strong>Số tiền:</strong>
                                <p className="mb-1 text-primary fw-bold fs-5">
                                  {formatPrice(orderSummary.total)}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <Alert variant="info" className="mt-3">
                            <h6 className="alert-heading">Hướng dẫn chuyển khoản:</h6>
                            <ol className="mb-0 small">
                              <li>Chuyển khoản đúng số tiền: <strong>{formatPrice(orderSummary.total)}</strong></li>
                              <li>Nội dung chuyển khoản: <code>MUA SACH {customerInfo.fullName || '[Họ tên]'}</code></li>
                              <li>Sau khi chuyển khoản, vui lòng gửi ảnh biên lai qua email: <strong>support@bookstore.vn</strong></li>
                              <li>Đơn hàng sẽ được xử lý trong vòng 24h sau khi xác nhận chuyển khoản</li>
                            </ol>
                          </Alert>

                          <div className="mt-3">
                            <h6 className="text-success mb-2">Các ngân hàng khác:</h6>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="bank-info-item mb-2">
                                  <strong>Techcombank:</strong>
                                  <p className="mb-1 small">0123456789 - BOOKSTORE COMPANY</p>
                                </div>
                                <div className="bank-info-item mb-2">
                                  <strong>BIDV:</strong>
                                  <p className="mb-1 small">0123456789 - BOOKSTORE COMPANY</p>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="bank-info-item mb-2">
                                  <strong>Agribank:</strong>
                                  <p className="mb-1 small">0123456789 - BOOKSTORE COMPANY</p>
                                </div>
                                <div className="bank-info-item mb-2">
                                  <strong>MB Bank:</strong>
                                  <p className="mb-1 small">0123456789 - BOOKSTORE COMPANY</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    )}

                    {/* COD Information */}
                    {paymentMethod === 'cod' && (
                      <Alert variant="warning">
                        <h6 className="alert-heading">Thanh toán khi nhận hàng (COD)</h6>
                        <p className="mb-3">
                          Bạn sẽ thanh toán bằng tiền mặt khi nhận được hàng. <strong>Không có phí thu hộ.</strong>
                        </p>
                        <div className="mt-3">
                          <h6 className="text-info mb-2">Bảng phí ship theo khoảng cách:</h6>
                          <div className="row small">
                            <div className="col-md-6">
                              <div className="mb-1"><strong>TP.HCM:</strong> 15,000 VNĐ</div>
                              <div className="mb-1"><strong>Bình Dương:</strong> 18,000 VNĐ</div>
                              <div className="mb-1"><strong>Đồng Nai:</strong> 20,000 VNĐ</div>
                              <div className="mb-1"><strong>Long An:</strong> 20,000 VNĐ</div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-1"><strong>Hà Nội:</strong> 20,000 VNĐ</div>
                              <div className="mb-1"><strong>Đà Nẵng:</strong> 25,000 VNĐ</div>
                              <div className="mb-1"><strong>Cần Thơ:</strong> 25,000 VNĐ</div>
                              <div className="mb-1"><strong>Tỉnh khác:</strong> 35,000 VNĐ</div>
                            </div>
                          </div>
                          <div className="mt-2 text-success small">
                            <strong>Miễn phí ship:</strong> Đơn hàng từ 500,000 VNĐ
                          </div>
                        </div>
                      </Alert>
                    )}
                  </Card.Body>
                </Card>

                <div className="d-grid">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={loading}
                    className="checkout-submit-btn"
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <FaLock className="me-2" />
                        Đặt hàng ngay
                      </>
                    )}
          </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col lg={4}>
          <Card className="checkout-summary-card sticky-top" style={{ top: '20px' }}>
            <Card.Header>
              <h5 className="mb-0">Tóm tắt đơn hàng</h5>
            </Card.Header>
            <Card.Body>
              {/* Order Items */}
              <div className="mb-4">
                <h6 className="mb-3">Sản phẩm ({orderItems.length})</h6>
                {orderItems.map((item) => (
                  <OrderItem key={item.id} item={item} />
                ))}
              </div>

              {/* Order Summary */}
              <div className="checkout-summary-item d-flex justify-content-between mb-2">
                <span>Tạm tính:</span>
                <span>{formatPrice(orderSummary.subtotal)}</span>
              </div>
              <div className="checkout-summary-item d-flex justify-content-between mb-2">
                <span>Thuế (10%):</span>
                <span>{formatPrice(orderSummary.tax)}</span>
              </div>
              <div className="checkout-summary-item d-flex justify-content-between mb-2">
                <span>Phí ship:</span>
                <span>
                  {orderSummary.shipping === 0 ? (
                    <span className="text-success">Miễn phí</span>
                  ) : (
                    <div className="text-end">
                      <div className="fw-bold">{formatPrice(orderSummary.shipping)}</div>
                      <small className="text-muted">
                        {customerInfo.city === 'hcm' && 'TP.HCM'}
                        {customerInfo.city === 'hanoi' && 'Hà Nội'}
                        {customerInfo.city === 'danang' && 'Đà Nẵng'}
                        {customerInfo.city === 'cantho' && 'Cần Thơ'}
                        {customerInfo.city === 'haiphong' && 'Hải Phòng'}
                        {customerInfo.city === 'binhduong' && 'Bình Dương'}
                        {customerInfo.city === 'dongnai' && 'Đồng Nai'}
                        {customerInfo.city === 'longan' && 'Long An'}
                        {customerInfo.city === 'tayninh' && 'Tây Ninh'}
                        {customerInfo.city === 'angiang' && 'An Giang'}
                        {customerInfo.city === 'kiengiang' && 'Kiên Giang'}
                        {customerInfo.city === 'other' && 'Tỉnh khác'}
                      </small>
                    </div>
                  )}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong className="fs-5">Tổng cộng:</strong>
                <strong className="text-primary fs-5">
                  {formatPrice(orderSummary.total)}
                </strong>
              </div>

              {orderSummary.subtotal < 500000 && (
                <Alert variant="info" className="mb-3">
                  <small>
                    Mua thêm {formatPrice(500000 - orderSummary.subtotal)} để được miễn phí vận chuyển!
                  </small>
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;