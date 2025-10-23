import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

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

    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
         // Simulate API call
         setTimeout(() => {
           // Mock successful login - accept any valid email/password
           const userData = {
             id: Date.now(),
             fullName: formData.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
             firstName: formData.email.split('@')[0].split('.')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
             email: formData.email,
             phone: '0123456789',
             address: '123 Đường ABC',
             city: 'TP. Hồ Chí Minh',
             zipCode: '700000',
             avatar: 'https://via.placeholder.com/100x100/6366f1/ffffff?text=U',
             joinDate: new Date().toISOString().split('T')[0],
             totalOrders: 0,
             totalSpent: 0,
             role: 'user'
           };
           
           localStorage.setItem('user', JSON.stringify(userData));
           
           setLoading(false);
           navigate('/');
         }, 1000);
  };

  const handleSocialLogin = (provider) => {
    alert(`Đăng nhập với ${provider} (Chức năng sẽ được tích hợp sau)`);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5} xl={4}>
          <Card className="shadow-lg border-0">
                   <Card.Header className="bg-white border-0 text-center py-4">
                     <h2 className="fw-bold text-primary mb-0">BookStore</h2>
                     <p className="text-muted mb-0">Đăng nhập vào tài khoản của bạn</p>
                   </Card.Header>
            
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Nhập email của bạn"
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu"
                      isInvalid={!!errors.password}
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
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Ghi nhớ đăng nhập"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <Link to="/forgot-password" className="text-decoration-none">
                    Quên mật khẩu?
                  </Link>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" className="me-2" />
                      Đang đăng nhập...
                    </>
                  ) : (
                    'Đăng nhập'
                  )}
                </Button>

                <div className="text-center mb-3">
                  <span className="text-muted">Hoặc đăng nhập với</span>
                </div>

                <div className="d-grid gap-2 mb-3">
                  <Button
                    variant="outline-danger"
                    onClick={() => handleSocialLogin('Google')}
                  >
                    <FaGoogle className="me-2" />
                    Đăng nhập với Google
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleSocialLogin('Facebook')}
                  >
                    <FaFacebook className="me-2" />
                    Đăng nhập với Facebook
                  </Button>
                </div>

                <div className="text-center">
                  <span className="text-muted">Chưa có tài khoản? </span>
                  <Link to="/register" className="text-decoration-none fw-bold">
                    Đăng ký ngay
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
