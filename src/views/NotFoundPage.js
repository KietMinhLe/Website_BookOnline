import React from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaBook, FaShoppingCart } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <div className="fs-1 mb-4">🔍</div>
          <h1 className="display-4 fw-bold mb-3">404</h1>
          <h2 className="h4 mb-4">Trang không tìm thấy</h2>
          <p className="text-muted mb-4">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </p>
          
          <div className="d-flex justify-content-center gap-3">
            <Button variant="primary" as={Link} to="/">
              <FaHome className="me-2" />
              Về trang chủ
            </Button>
            <Button variant="outline-primary" as={Link} to="/books">
              <FaBook className="me-2" />
              Xem sách
            </Button>
            <Button variant="outline-secondary" as={Link} to="/cart">
              <FaShoppingCart className="me-2" />
              Giỏ hàng
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;