import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner, Tab, Tabs, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaSave, FaTimes, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});

  // Mock user data
  const mockUser = {
    id: 1,
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123456789',
    address: '123 Đường ABC',
    city: 'TP. Hồ Chí Minh',
    zipCode: '700000',
    avatar: 'https://via.placeholder.com/150x150/6366f1/ffffff?text=User',
    joinDate: '2024-01-01',
    totalOrders: 15,
    totalSpent: 7500000
  };

  // Mock orders data
  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-01-20',
      status: 'delivered',
      total: 950000,
      items: 3,
      trackingNumber: 'VN123456789'
    },
    {
      id: 'ORD002',
      date: '2024-01-15',
      status: 'shipping',
      total: 750000,
      items: 2,
      trackingNumber: 'VN987654321'
    },
    {
      id: 'ORD003',
      date: '2024-01-10',
      status: 'processing',
      total: 500000,
      items: 1,
      trackingNumber: null
    }
  ];


  useEffect(() => {
    setLoading(true);
    // Simulate loading user data
    setTimeout(() => {
      setUser(mockUser);
      setFormData({
        fullName: mockUser.fullName,
        email: mockUser.email,
        phone: mockUser.phone,
        address: mockUser.address,
        city: mockUser.city,
        zipCode: mockUser.zipCode,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setLoading(false);
    }, 500);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ tên là bắt buộc';
    }

    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (formData.newPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Mật khẩu hiện tại là bắt buộc';
      }
      if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Mật khẩu mới phải có ít nhất 6 ký tự';
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser(prev => ({
        ...prev,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode
      }));
      setEditing(false);
      setLoading(false);
      alert('Cập nhật thông tin thành công!');
    }, 1000);
  };

  const handleCancel = () => {
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      zipCode: user.zipCode,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setEditing(false);
    setErrors({});
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'processing': { variant: 'warning', text: 'Đang xử lý' },
      'shipping': { variant: 'info', text: 'Đang giao hàng' },
      'delivered': { variant: 'success', text: 'Đã giao hàng' },
      'cancelled': { variant: 'danger', text: 'Đã hủy' }
    };
    const statusInfo = statusMap[status] || { variant: 'secondary', text: status };
    return <Badge bg={statusInfo.variant}>{statusInfo.text}</Badge>;
  };

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

  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Không tìm thấy thông tin người dùng</Alert.Heading>
          <p>Vui lòng đăng nhập lại.</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="primary" as={Link} to="/login">
              Đăng nhập
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="h2 fw-bold">Tài khoản của tôi</h1>
          <p className="text-muted">Quản lý thông tin cá nhân và đơn hàng</p>
        </Col>
      </Row>

      <Row>
        {/* Profile Sidebar */}
        <Col lg={3} className="mb-4">
          <Card>
            <Card.Body className="text-center">
              <img
                src={user.avatar}
                alt="Avatar"
                className="rounded-circle mb-3"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <h5>{user.fullName}</h5>
              <p className="text-muted small">{user.email}</p>
              <div className="d-flex justify-content-center gap-2 mb-3">
                <Badge bg="primary">{user.totalOrders} đơn hàng</Badge>
              </div>
              <small className="text-muted">
                <FaCalendarAlt className="me-1" />
                Tham gia từ {new Date(user.joinDate).toLocaleDateString('vi-VN')}
              </small>
            </Card.Body>
          </Card>
        </Col>

        {/* Main Content */}
        <Col lg={9}>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
          >
            {/* Profile Tab */}
            <Tab eventKey="profile" title="Thông tin cá nhân">
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Thông tin cá nhân</h5>
                  {!editing ? (
                    <Button variant="outline-primary" onClick={() => setEditing(true)}>
                      <FaEdit className="me-1" />
                      Chỉnh sửa
                    </Button>
                  ) : (
                    <div className="d-flex gap-2">
                      <Button variant="success" onClick={handleSave} disabled={loading}>
                        <FaSave className="me-1" />
                        Lưu
                      </Button>
                      <Button variant="outline-secondary" onClick={handleCancel}>
                        <FaTimes className="me-1" />
                        Hủy
                      </Button>
                    </div>
                  )}
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FaUser className="me-1" />
                          Họ và tên
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          disabled={!editing}
                          isInvalid={!!errors.fullName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.fullName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FaPhone className="me-1" />
                          Số điện thoại
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!editing}
                          isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaEnvelope className="me-1" />
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!editing}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaMapMarkerAlt className="me-1" />
                      Địa chỉ
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!editing}
                    />
                  </Form.Group>

                  <Row>
                    <Col md={8}>
                      <Form.Group className="mb-3">
                        <Form.Label>Thành phố</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          disabled={!editing}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Mã bưu điện</Form.Label>
                        <Form.Control
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          disabled={!editing}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Password Change Section */}
                  {editing && (
                    <div className="border-top pt-3">
                      <h6>Thay đổi mật khẩu</h6>
                      <Row>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu hiện tại</Form.Label>
                            <div className="position-relative">
                              <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                isInvalid={!!errors.currentPassword}
                              />
                              <Button
                                variant="link"
                                className="position-absolute end-0 top-50 translate-middle-y pe-3"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ border: 'none', background: 'none' }}
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </Button>
                            </div>
                            <Form.Control.Feedback type="invalid">
                              {errors.currentPassword}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu mới</Form.Label>
                            <Form.Control
                              type="password"
                              name="newPassword"
                              value={formData.newPassword}
                              onChange={handleChange}
                              isInvalid={!!errors.newPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.newPassword}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Xác nhận mật khẩu</Form.Label>
                            <Form.Control
                              type="password"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              isInvalid={!!errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.confirmPassword}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Tab>

            {/* Orders Tab */}
            <Tab eventKey="orders" title={`Đơn hàng (${mockOrders.length})`}>
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Lịch sử đơn hàng</h5>
                </Card.Header>
                <Card.Body>
                  {mockOrders.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Mã đơn hàng</th>
                            <th>Ngày đặt</th>
                            <th>Sản phẩm</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockOrders.map(order => (
                            <tr key={order.id}>
                              <td>
                                <Link to={`/orders/${order.id}`} className="text-decoration-none">
                                  {order.id}
                                </Link>
                              </td>
                              <td>{new Date(order.date).toLocaleDateString('vi-VN')}</td>
                              <td>{order.items} sản phẩm</td>
                              <td className="fw-bold">{formatPrice(order.total)}</td>
                              <td>{getStatusBadge(order.status)}</td>
                              <td>
                                <Button variant="outline-primary" size="sm" as={Link} to={`/orders/${order.id}`}>
                                  Xem chi tiết
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className="fs-1 mb-3">📦</div>
                      <h5>Chưa có đơn hàng nào</h5>
                      <p className="text-muted">Bạn chưa có đơn hàng nào</p>
                      <Button variant="primary" as={Link} to="/books">
                        Mua sắm ngay
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Tab>

          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;