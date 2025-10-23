import React from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col className="text-center py-5">
          <div className="fs-1 mb-3">📦</div>
          <h4>Trang đơn hàng đang phát triển</h4>
          <p className="text-muted mb-4">
            Tính năng quản lý đơn hàng sẽ được triển khai trong phiên bản tiếp theo.
          </p>
          <Button variant="primary" as={Link} to="/">
            Về trang chủ
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default OrdersPage;