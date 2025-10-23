import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Table, 
  Button, 
  Form, 
  Badge,
  InputGroup,
  Modal
} from 'react-bootstrap';
import { 
  FaSearch, 
  FaEye, 
  FaPrint,
  FaFilter
} from 'react-icons/fa';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Mock data
    setOrders([
      {
        id: 'ORD001',
        customer: {
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@email.com',
          phone: '0123456789'
        },
        items: [
          { book: 'React.js từ cơ bản đến nâng cao', quantity: 2, price: 250000 },
          { book: 'JavaScript ES6+', quantity: 1, price: 200000 }
        ],
        total: 700000,
        status: 'pending',
        paymentMethod: 'COD',
        shippingAddress: '123 Đường ABC, Quận 1, TP.HCM',
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        id: 'ORD002',
        customer: {
          name: 'Trần Thị B',
          email: 'tranthib@email.com',
          phone: '0987654321'
        },
        items: [
          { book: 'Node.js thực hành', quantity: 1, price: 300000 }
        ],
        total: 300000,
        status: 'shipped',
        paymentMethod: 'Bank Transfer',
        shippingAddress: '456 Đường XYZ, Quận 2, TP.HCM',
        createdAt: '2024-01-14T14:20:00Z'
      }
    ]);
  }, []);

  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'pending', label: 'Chờ xử lý' },
    { value: 'confirmed', label: 'Đã xác nhận' },
    { value: 'shipped', label: 'Đang giao' },
    { value: 'delivered', label: 'Đã giao' },
    { value: 'cancelled', label: 'Đã hủy' }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { variant: 'warning', text: 'Chờ xử lý' },
      confirmed: { variant: 'info', text: 'Đã xác nhận' },
      shipped: { variant: 'primary', text: 'Đang giao' },
      delivered: { variant: 'success', text: 'Đã giao' },
      cancelled: { variant: 'danger', text: 'Đã hủy' }
    };
    
    const statusInfo = statusMap[status] || { variant: 'secondary', text: status };
    return <Badge bg={statusInfo.variant}>{statusInfo.text}</Badge>;
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý đơn hàng</h2>
        <div className="d-flex gap-2">
          <Button variant="outline-primary">
            Xuất báo cáo
          </Button>
          <Button variant="outline-secondary">
            <FaPrint className="me-2" />
            In đơn hàng
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm theo mã đơn, tên khách hàng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Select>
                <option value="all">Tất cả thời gian</option>
                <option value="today">Hôm nay</option>
                <option value="week">Tuần này</option>
                <option value="month">Tháng này</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Button variant="outline-secondary" className="w-100">
                <FaFilter className="me-1" />
                Lọc
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Orders Table */}
      <Card>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Thanh toán</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div>
                      <div className="fw-bold">{order.id}</div>
                      <small className="text-muted">
                        {order.items.length} sản phẩm
                      </small>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="fw-bold">{order.customer.name}</div>
                      <small className="text-muted">{order.customer.email}</small>
                    </div>
                  </td>
                  <td>
                    <div>
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="small">
                          {item.book} x{item.quantity}
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="small text-muted">
                          +{order.items.length - 2} sản phẩm khác
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="fw-bold">{formatCurrency(order.total)}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>
                    <Badge bg="info">{order.paymentMethod}</Badge>
                  </td>
                  <td>
                    <div className="small">
                      {formatDate(order.createdAt)}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        title="Xem chi tiết"
                        onClick={() => handleViewOrder(order)}
                      >
                        <FaEye />
                      </Button>
                      <Button variant="outline-secondary" size="sm" title="In đơn hàng">
                        <FaPrint />
                      </Button>
                      {order.status === 'pending' && (
                        <Button 
                          size="sm" 
                          variant="success"
                          onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                        >
                          Xác nhận
                        </Button>
                      )}
                      {order.status === 'confirmed' && (
                        <Button 
                          size="sm" 
                          variant="primary"
                          onClick={() => handleUpdateStatus(order.id, 'shipped')}
                        >
                          Giao hàng
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Order Detail Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết đơn hàng {selectedOrder?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              <Row className="mb-3">
                <Col md={6}>
                  <h6>Thông tin khách hàng</h6>
                  <p><strong>Tên:</strong> {selectedOrder.customer.name}</p>
                  <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                  <p><strong>Số điện thoại:</strong> {selectedOrder.customer.phone}</p>
                </Col>
                <Col md={6}>
                  <h6>Thông tin đơn hàng</h6>
                  <p><strong>Mã đơn:</strong> {selectedOrder.id}</p>
                  <p><strong>Trạng thái:</strong> {getStatusBadge(selectedOrder.status)}</p>
                  <p><strong>Thanh toán:</strong> {selectedOrder.paymentMethod}</p>
                  <p><strong>Ngày tạo:</strong> {formatDate(selectedOrder.createdAt)}</p>
                </Col>
              </Row>
              
              <h6>Địa chỉ giao hàng</h6>
              <p>{selectedOrder.shippingAddress}</p>
              
              <h6>Sản phẩm</h6>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Tên sách</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.book}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(item.price)}</td>
                      <td>{formatCurrency(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={3}>Tổng cộng</th>
                    <th>{formatCurrency(selectedOrder.total)}</th>
                  </tr>
                </tfoot>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary">
            <FaPrint className="me-2" />
            In đơn hàng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminOrdersPage;
