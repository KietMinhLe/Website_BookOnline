import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert, Form, Modal, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaArrowLeft, FaMinus, FaPlus, FaHeart, FaShare } from 'react-icons/fa';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      book: {
        id: 1,
        title: "React.js Complete Guide",
        author: "Maximilian Schwarzmüller",
        price: 500000,
        image: "https://via.placeholder.com/300x400/6366f1/ffffff?text=React+Guide",
        category: "Công nghệ",
        stock: 10
      },
      quantity: 2,
      addedAt: "2024-01-20"
    },
    {
      id: 2,
      book: {
        id: 2,
        title: "JavaScript ES6+ Mastery",
        author: "Kyle Simpson",
        price: 400000,
        image: "https://via.placeholder.com/300x400/ec4899/ffffff?text=JS+ES6",
        category: "Lập trình",
        stock: 5
      },
      quantity: 1,
      addedAt: "2024-01-19"
    },
    {
      id: 3,
      book: {
        id: 3,
        title: "Node.js Backend Development",
        author: "Andrew Mead",
        price: 450000,
        image: "https://via.placeholder.com/300x400/10b981/ffffff?text=Node.js",
        category: "Backend",
        stock: 8
      },
      quantity: 1,
      addedAt: "2024-01-18"
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate loading cart data
    setTimeout(() => {
      setCartItems(mockCartItems);
      setLoading(false);
    }, 500);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.book.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateShipping = () => {
    return calculateSubtotal() >= 500000 ? 0 : 30000; // Free shipping over 500k
  };

  const calculateDiscount = () => {
    if (appliedCoupon) {
      return appliedCoupon.type === 'percentage' 
        ? calculateSubtotal() * (appliedCoupon.value / 100)
        : appliedCoupon.value;
    }
    return 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping() - calculateDiscount();
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setCartItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
    setShowClearModal(false);
  };

  const applyCoupon = () => {
    const coupons = {
      'WELCOME10': { type: 'percentage', value: 10, description: 'Giảm 10% cho đơn hàng đầu tiên' },
      'SAVE50K': { type: 'fixed', value: 50000, description: 'Giảm 50,000 VNĐ' },
      'FREESHIP': { type: 'shipping', value: 0, description: 'Miễn phí vận chuyển' }
    };

    const coupon = coupons[couponCode.toUpperCase()];
    if (coupon) {
      setAppliedCoupon(coupon);
      alert(`Áp dụng mã giảm giá thành công: ${coupon.description}`);
    } else {
      alert('Mã giảm giá không hợp lệ');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const CartItem = ({ item }) => (
    <div className="border-bottom p-3">
      <Row className="align-items-center">
        <Col md={2}>
          <img
            src={item.book.image}
            alt={item.book.title}
            className="img-fluid rounded"
            style={{ height: '80px', objectFit: 'cover' }}
          />
        </Col>
        <Col md={4}>
          <h6 className="mb-1">{item.book.title}</h6>
          <p className="text-muted small mb-1">Tác giả: {item.book.author}</p>
          <Badge bg="secondary" className="small">
            {item.book.category}
          </Badge>
        </Col>
        <Col md={2}>
          <div className="text-primary fw-bold">
            {formatPrice(item.book.price)}
          </div>
        </Col>
        <Col md={2}>
          <div className="cart-quantity-simple">
            <Form.Control
              type="number"
              min="1"
              max={item.book.stock}
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              className="cart-quantity-input-simple"
            />
          </div>
        </Col>
        <Col md={2}>
          <div className="cart-item-price">
            <div className="fw-bold text-primary d-flex align-items-center justify-content-end gap-2">
              {formatPrice(item.book.price * item.quantity)}
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeItem(item.id)}
                title="Xóa sản phẩm"
                className="cart-delete-btn-inline"
              >
                <FaTrash />
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="h2 fw-bold">Giỏ hàng</h1>
          <p className="text-muted">Kiểm tra và chỉnh sửa giỏ hàng của bạn</p>
        </Col>
      </Row>

      {cartItems.length === 0 ? (
        <Row>
          <Col className="text-center py-5">
            <div className="fs-1 mb-3">🛒</div>
            <h4>Giỏ hàng trống</h4>
            <p className="text-muted mb-4">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
            <Button variant="primary" as={Link} to="/books">
              <FaShoppingCart className="me-2" />
              Tiếp tục mua sắm
            </Button>
          </Col>
        </Row>
      ) : (
        <Row>
          {/* Cart Items */}
          <Col lg={8} md={12} className="mb-4 mb-lg-0">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Sản phẩm ({cartItems.length})</h5>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={() => setShowClearModal(true)}
                >
                  <FaTrash className="me-1" />
                  Xóa tất cả
                </Button>
              </Card.Header>
              <Card.Body className="p-0">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </Card.Body>
            </Card>

            {/* Coupon Section */}
            <Card className="mt-4">
              <Card.Header>
                <h6 className="mb-0">Mã giảm giá</h6>
              </Card.Header>
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={6} sm={12} className="mb-3 mb-md-0">
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Nhập mã giảm giá"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={appliedCoupon}
                      />
                      <Button 
                        variant="primary" 
                        onClick={applyCoupon}
                        disabled={!couponCode || appliedCoupon}
                      >
                        Áp dụng
                      </Button>
                    </InputGroup>
                  </Col>
                  <Col md={6} sm={12}>
                    {appliedCoupon && (
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <Badge bg="success" className="me-2">
                            {appliedCoupon.description}
                          </Badge>
                        </div>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={removeCoupon}
                        >
                          Xóa
                        </Button>
                      </div>
                    )}
                  </Col>
                </Row>
                <div className="mt-2">
                  <small className="text-muted">
                    Mã giảm giá có sẵn: WELCOME10, SAVE50K, FREESHIP
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Order Summary */}
          <Col lg={4} md={12}>
            <Card className="sticky-top" style={{ top: '20px' }}>
              <Card.Header>
                <h5 className="mb-0">Tóm tắt đơn hàng</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Thuế (10%):</span>
                  <span>{formatPrice(calculateTax())}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Phí ship:</span>
                  <span>
                    {calculateShipping() === 0 ? (
                      <span className="text-success">Miễn phí</span>
                    ) : (
                      formatPrice(calculateShipping())
                    )}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="d-flex justify-content-between mb-2">
                    <span>Giảm giá:</span>
                    <span className="text-success">
                      -{formatPrice(calculateDiscount())}
                    </span>
                  </div>
                )}

                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Tổng cộng:</strong>
                  <strong className="text-primary">
                    {formatPrice(calculateTotal())}
                  </strong>
                </div>

                {calculateSubtotal() < 500000 && (
                  <Alert variant="info" className="mb-3">
                    <small>
                      Mua thêm {formatPrice(500000 - calculateSubtotal())} để được miễn phí vận chuyển!
                    </small>
                  </Alert>
                )}

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    as={Link}
                    to="/checkout"
                  >
                    Tiến hành thanh toán
                  </Button>
                  <Button variant="outline-secondary" as={Link} to="/books">
                    <FaArrowLeft className="me-2" />
                    Tiếp tục mua sắm
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Clear Cart Modal */}
      <Modal show={showClearModal} onHide={() => setShowClearModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa giỏ hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClearModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={clearCart}>
            Xóa tất cả
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CartPage;