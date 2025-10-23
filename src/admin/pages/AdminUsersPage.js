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
  Modal,
  ButtonGroup
} from 'react-bootstrap';
import { 
  FaSearch, 
  FaEye, 
  FaEdit, 
  FaTrash,
  FaUserPlus,
  FaUserCheck,
  FaUserTimes,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'customer',
    status: 'active',
    address: ''
  });

  useEffect(() => {
    // Mock data
    setUsers([
      {
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@email.com',
        phone: '0123456789',
        role: 'customer',
        status: 'active',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        totalOrders: 5,
        totalSpent: 2500000,
        lastLogin: '2024-01-15T10:30:00Z',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'Trần Thị B',
        email: 'tranthib@email.com',
        phone: '0987654321',
        role: 'customer',
        status: 'active',
        address: '456 Đường XYZ, Quận 2, TP.HCM',
        totalOrders: 3,
        totalSpent: 1200000,
        lastLogin: '2024-01-14T14:20:00Z',
        createdAt: '2024-01-02T00:00:00Z'
      },
      {
        id: 3,
        name: 'Lê Văn C',
        email: 'levanc@email.com',
        phone: '0369852147',
        role: 'admin',
        status: 'active',
        address: '789 Đường DEF, Quận 3, TP.HCM',
        totalOrders: 0,
        totalSpent: 0,
        lastLogin: '2024-01-15T16:45:00Z',
        createdAt: '2024-01-03T00:00:00Z'
      }
    ]);
  }, []);

  const roleOptions = [
    { value: 'all', label: 'Tất cả vai trò' },
    { value: 'customer', label: 'Khách hàng' },
    { value: 'admin', label: 'Quản trị viên' },
    { value: 'moderator', label: 'Điều hành viên' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'active', label: 'Hoạt động' },
    { value: 'inactive', label: 'Không hoạt động' },
    { value: 'banned', label: 'Bị cấm' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
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

  const getRoleBadge = (role) => {
    const roleMap = {
      admin: { variant: 'danger', text: 'Quản trị viên' },
      moderator: { variant: 'warning', text: 'Điều hành viên' },
      customer: { variant: 'info', text: 'Khách hàng' }
    };
    
    const roleInfo = roleMap[role] || { variant: 'secondary', text: role };
    return <Badge bg={roleInfo.variant}>{roleInfo.text}</Badge>;
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      active: { variant: 'success', text: 'Hoạt động' },
      inactive: { variant: 'secondary', text: 'Không hoạt động' },
      banned: { variant: 'danger', text: 'Bị cấm' }
    };
    
    const statusInfo = statusMap[status] || { variant: 'secondary', text: status };
    return <Badge bg={statusInfo.variant}>{statusInfo.text}</Badge>;
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'customer',
      status: 'active',
      address: ''
    });
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      address: user.address
    });
    setShowModal(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData }
          : user
      ));
    } else {
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...formData,
        totalOrders: 0,
        totalSpent: 0,
        lastLogin: null,
        createdAt: new Date().toISOString()
      };
      setUsers([...users, newUser]);
    }
    setShowModal(false);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleToggleStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý người dùng</h2>
        <Button variant="primary" onClick={handleAddUser}>
          <FaUserPlus className="me-2" />
          Thêm người dùng
        </Button>
      </div>

      {/* Statistics */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h4 className="text-primary">{users.length}</h4>
              <p className="text-muted">Tổng người dùng</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h4 className="text-success">{users.filter(u => u.status === 'active').length}</h4>
              <p className="text-muted">Đang hoạt động</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h4 className="text-info">{users.filter(u => u.role === 'customer').length}</h4>
              <p className="text-muted">Khách hàng</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h4 className="text-warning">{users.filter(u => u.role === 'admin').length}</h4>
              <p className="text-muted">Quản trị viên</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

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
                  placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                {roleOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
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
            <Col md={2}>
              <Button variant="outline-secondary" className="w-100">
                Lọc
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Users Table */}
      <Card>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Thông tin</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Đơn hàng</th>
                <th>Tổng chi</th>
                <th>Lần cuối</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div>
                      <div className="fw-bold">{user.name}</div>
                      <div className="small text-muted">
                        <FaEnvelope className="me-1" />
                        {user.email}
                      </div>
                      <div className="small text-muted">
                        <FaPhone className="me-1" />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td>{getRoleBadge(user.role)}</td>
                  <td>{getStatusBadge(user.status)}</td>
                  <td>
                    <span className="fw-bold">{user.totalOrders}</span>
                  </td>
                  <td>
                    <span className="fw-bold text-success">
                      {formatCurrency(user.totalSpent)}
                    </span>
                  </td>
                  <td>
                    <div className="small">
                      {user.lastLogin ? formatDate(user.lastLogin) : 'Chưa đăng nhập'}
                    </div>
                  </td>
                  <td>
                    <ButtonGroup size="sm">
                      <Button 
                        variant="outline-primary" 
                        title="Xem chi tiết"
                      >
                        <FaEye />
                      </Button>
                      <Button 
                        variant="outline-warning" 
                        title="Chỉnh sửa"
                        onClick={() => handleEditUser(user)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant={user.status === 'active' ? 'outline-danger' : 'outline-success'}
                        title={user.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.status === 'active' ? <FaUserTimes /> : <FaUserCheck />}
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        title="Xóa"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <FaTrash />
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Họ và tên *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Nhập họ và tên"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="example@email.com"
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
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="0123456789"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Vai trò *</Form.Label>
                <Form.Select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="customer">Khách hàng</option>
                  <option value="moderator">Điều hành viên</option>
                  <option value="admin">Quản trị viên</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Trạng thái *</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                  <option value="banned">Bị cấm</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Nhập địa chỉ..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            {editingUser ? 'Cập nhật' : 'Thêm người dùng'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminUsersPage;
