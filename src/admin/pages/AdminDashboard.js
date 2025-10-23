import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { 
  FaBook, 
  FaShoppingCart, 
  FaUsers, 
  FaDollarSign,
  FaEye,
  FaEdit,
  FaTrash
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [topBooks, setTopBooks] = useState([]);

  useEffect(() => {
    // Mock data - trong thực tế sẽ gọi API
    setStats({
      totalBooks: 1250,
      totalOrders: 342,
      totalUsers: 89,
      totalRevenue: 12500000
    });

    setRecentOrders([
      {
        id: 'ORD001',
        customer: 'Nguyễn Văn A',
        total: 250000,
        status: 'pending',
        date: '2024-01-15'
      },
      {
        id: 'ORD002',
        customer: 'Trần Thị B',
        total: 180000,
        status: 'shipped',
        date: '2024-01-14'
      },
      {
        id: 'ORD003',
        customer: 'Lê Văn C',
        total: 320000,
        status: 'delivered',
        date: '2024-01-13'
      }
    ]);

    setTopBooks([
      { id: 1, title: 'Sách lập trình React', sales: 45, revenue: 2250000 },
      { id: 2, title: 'JavaScript cơ bản', sales: 38, revenue: 1900000 },
      { id: 3, title: 'Node.js từ A-Z', sales: 32, revenue: 1600000 }
    ]);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { variant: 'warning', text: 'Chờ xử lý' },
      shipped: { variant: 'info', text: 'Đang giao' },
      delivered: { variant: 'success', text: 'Đã giao' },
      cancelled: { variant: 'danger', text: 'Đã hủy' }
    };
    
    const statusInfo = statusMap[status] || { variant: 'secondary', text: status };
    return <Badge bg={statusInfo.variant}>{statusInfo.text}</Badge>;
  };

  return (
    <div>
      <h2 className="mb-4">Tổng quan hệ thống</h2>
      
      {/* Statistics Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaBook className="text-primary mb-2" size={32} />
              <h4>{stats.totalBooks}</h4>
              <p className="text-muted">Tổng số sách</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaShoppingCart className="text-success mb-2" size={32} />
              <h4>{stats.totalOrders}</h4>
              <p className="text-muted">Tổng đơn hàng</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaUsers className="text-info mb-2" size={32} />
              <h4>{stats.totalUsers}</h4>
              <p className="text-muted">Người dùng</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaDollarSign className="text-warning mb-2" size={32} />
              <h4>{formatCurrency(stats.totalRevenue)}</h4>
              <p className="text-muted">Doanh thu</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Recent Orders */}
        <Col md={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Đơn hàng gần đây</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Mã đơn</th>
                    <th>Khách hàng</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th>Ngày</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{formatCurrency(order.total)}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>{order.date}</td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-1">
                          <FaEye />
                        </Button>
                        <Button variant="outline-warning" size="sm">
                          <FaEdit />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Top Books */}
        <Col md={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Sách bán chạy</h5>
            </Card.Header>
            <Card.Body>
              {topBooks.map((book, index) => (
                <div key={book.id} className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-1">{book.title}</h6>
                    <small className="text-muted">{book.sales} bản</small>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold">{formatCurrency(book.revenue)}</div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
