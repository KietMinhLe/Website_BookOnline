import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Spinner, Form, InputGroup } from 'react-bootstrap';
import { FaBell, FaTimes, FaCheck, FaExclamationTriangle, FaInfoCircle, FaTrash, FaFilter, FaSearch, FaCheckCircle } from 'react-icons/fa';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'success',
      title: 'Đặt hàng thành công',
      message: 'Đơn hàng #12345 đã được xác nhận và đang chuẩn bị giao hàng. Bạn sẽ nhận được thông báo khi hàng được gửi đi.',
      time: '2 phút trước',
      read: false,
      category: 'Đơn hàng',
      priority: 'high'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Sản phẩm sắp hết hàng',
      message: 'Sách "React từ cơ bản" chỉ còn 3 cuốn trong kho. Hãy nhanh tay đặt hàng để không bỏ lỡ cơ hội.',
      time: '1 giờ trước',
      read: false,
      category: 'Kho hàng',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'info',
      title: 'Khuyến mãi mới',
      message: 'Giảm giá 20% cho tất cả sách công nghệ trong tuần này. Áp dụng từ ngày 20/01 đến 27/01/2024.',
      time: '3 giờ trước',
      read: true,
      category: 'Khuyến mãi',
      priority: 'low'
    },
    {
      id: 4,
      type: 'success',
      title: 'Thanh toán thành công',
      message: 'Giao dịch #67890 đã được xử lý thành công. Số tiền 450,000 VNĐ đã được thanh toán.',
      time: '5 giờ trước',
      read: true,
      category: 'Thanh toán',
      priority: 'high'
    },
    {
      id: 5,
      type: 'info',
      title: 'Cập nhật hệ thống',
      message: 'Hệ thống sẽ được bảo trì từ 02:00 - 04:00 ngày mai. Trong thời gian này, một số tính năng có thể không khả dụng.',
      time: '1 ngày trước',
      read: true,
      category: 'Hệ thống',
      priority: 'medium'
    },
    {
      id: 6,
      type: 'warning',
      title: 'Địa chỉ giao hàng không chính xác',
      message: 'Chúng tôi không thể giao hàng đến địa chỉ bạn đã cung cấp. Vui lòng cập nhật địa chỉ giao hàng.',
      time: '2 ngày trước',
      read: false,
      category: 'Giao hàng',
      priority: 'high'
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-success" />;
      case 'warning':
        return <FaExclamationTriangle className="text-warning" />;
      case 'info':
        return <FaInfoCircle className="text-info" />;
      default:
        return <FaBell className="text-primary" />;
    }
  };

  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case 'Đơn hàng':
        return 'primary';
      case 'Kho hàng':
        return 'warning';
      case 'Khuyến mãi':
        return 'success';
      case 'Thanh toán':
        return 'info';
      case 'Hệ thống':
        return 'secondary';
      case 'Giao hàng':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !notification.read) || 
      (filter === 'read' && notification.read);
    
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAsUnread = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: false }
          : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const toggleSelectNotification = (id) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(notificationId => notificationId !== id)
        : [...prev, id]
    );
  };

  const selectAllNotifications = () => {
    setSelectedNotifications(filteredNotifications.map(n => n.id));
  };

  const deselectAllNotifications = () => {
    setSelectedNotifications([]);
  };

  const deleteSelectedNotifications = () => {
    setNotifications(prev => prev.filter(notification => !selectedNotifications.includes(notification.id)));
    setSelectedNotifications([]);
  };

  const markSelectedAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => 
        selectedNotifications.includes(notification.id)
          ? { ...notification, read: true }
          : notification
      )
    );
    setSelectedNotifications([]);
  };

  const NotificationItem = ({ notification }) => (
    <Card className={`mb-3 ${!notification.read ? 'border-primary' : ''}`}>
      <Card.Body>
        <Row className="align-items-start">
          <Col xs={1} className="text-center">
            <div className="mt-1">
              {getNotificationIcon(notification.type)}
            </div>
          </Col>
          <Col xs={1} className="text-center">
            <Form.Check
              type="checkbox"
              checked={selectedNotifications.includes(notification.id)}
              onChange={() => toggleSelectNotification(notification.id)}
            />
          </Col>
          <Col xs={8}>
            <div className="d-flex align-items-center mb-2">
              <h6 className={`mb-0 me-2 ${!notification.read ? 'fw-bold' : ''}`}>
                {notification.title}
              </h6>
              <Badge bg={getCategoryBadgeColor(notification.category)} className="me-2">
                {notification.category}
              </Badge>
              <Badge bg={getPriorityBadgeColor(notification.priority)}>
                {notification.priority}
              </Badge>
            </div>
            <p className="text-muted mb-2">
              {notification.message}
            </p>
            <small className="text-muted">{notification.time}</small>
          </Col>
          <Col xs={2} className="text-end">
            <div className="d-flex flex-column gap-1">
              {!notification.read ? (
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => markAsRead(notification.id)}
                >
                  <FaCheck />
                </Button>
              ) : (
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => markAsUnread(notification.id)}
                >
                  Đánh dấu chưa đọc
                </Button>
              )}
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => deleteNotification(notification.id)}
              >
                <FaTimes />
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
          <p className="mt-3">Đang tải thông báo...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="h2 fw-bold">Thông báo</h1>
          <p className="text-muted">
            Quản lý và theo dõi tất cả thông báo của bạn
            {unreadCount > 0 && (
              <Badge bg="danger" className="ms-2">
                {unreadCount} chưa đọc
              </Badge>
            )}
          </p>
        </Col>
      </Row>

      {/* Filters and Actions */}
      <Row className="mb-4">
        <Col md={6}>
          <div className="d-flex gap-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline-primary'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              Tất cả ({notifications.length})
            </Button>
            <Button
              variant={filter === 'unread' ? 'primary' : 'outline-primary'}
              size="sm"
              onClick={() => setFilter('unread')}
            >
              Chưa đọc ({unreadCount})
            </Button>
            <Button
              variant={filter === 'read' ? 'primary' : 'outline-primary'}
              size="sm"
              onClick={() => setFilter('read')}
            >
              Đã đọc ({notifications.length - unreadCount})
            </Button>
          </div>
        </Col>
        <Col md={6}>
          <div className="d-flex gap-2 justify-content-end">
            {selectedNotifications.length > 0 && (
              <>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={markSelectedAsRead}
                >
                  <FaCheck className="me-1" />
                  Đánh dấu đã đọc ({selectedNotifications.length})
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={deleteSelectedNotifications}
                >
                  <FaTrash className="me-1" />
                  Xóa ({selectedNotifications.length})
                </Button>
              </>
            )}
            <Button
              variant="outline-primary"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <FaCheckCircle className="me-1" />
              Đọc tất cả
            </Button>
          </div>
        </Col>
      </Row>

      {/* Search */}
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm thông báo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6} className="text-end">
          <div className="d-flex gap-2 justify-content-end">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={selectAllNotifications}
              disabled={filteredNotifications.length === 0}
            >
              Chọn tất cả
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={deselectAllNotifications}
              disabled={selectedNotifications.length === 0}
            >
              Bỏ chọn tất cả
            </Button>
          </div>
        </Col>
      </Row>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <Row>
          <Col className="text-center py-5">
            <div className="fs-1 mb-3">🔔</div>
            <h4>
              {searchQuery ? 'Không tìm thấy thông báo' : 'Không có thông báo'}
            </h4>
            <p className="text-muted mb-4">
              {searchQuery 
                ? 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc'
                : 'Bạn chưa có thông báo nào'
              }
            </p>
            {searchQuery && (
              <Button 
                variant="outline-primary" 
                onClick={() => setSearchQuery('')}
              >
                Xóa bộ lọc
              </Button>
            )}
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            {filteredNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default NotificationPage;
