import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Form, 
  Button, 
  Tab, 
  Tabs,
  Alert,
  InputGroup,
  Table,
  Badge
} from 'react-bootstrap';
import { 
  FaSave, 
  FaUpload, 
  FaEye, 
  FaEyeSlash,
  FaCog,
  FaStore,
  FaBell,
  FaShieldAlt,
  FaDatabase,
  FaPalette,
  FaGlobe
} from 'react-icons/fa';

const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'Cửa hàng sách ABC',
    siteDescription: 'Cửa hàng sách trực tuyến hàng đầu Việt Nam',
    siteUrl: 'https://bookstore-abc.com',
    adminEmail: 'admin@bookstore-abc.com',
    phone: '0123456789',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    
    // Store Settings
    currency: 'VND',
    currencySymbol: '₫',
    taxRate: 10,
    shippingFee: 30000,
    freeShippingThreshold: 500000,
    storeStatus: 'active',
    
    // Security Settings
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireTwoFactor: false,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    inventoryAlerts: true,
    lowStockThreshold: 10,
    
    // Appearance Settings
    theme: 'light',
    primaryColor: '#007bff',
    logo: '',
    favicon: '',
    
    // System Settings
    maintenanceMode: false,
    debugMode: false,
    cacheEnabled: true,
    autoBackup: true,
    backupFrequency: 'daily'
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Đơn hàng mới',
      message: 'Có đơn hàng mới #ORD001 từ Nguyễn Văn A',
      time: '2024-01-15 10:30',
      read: false
    },
    {
      id: 2,
      type: 'inventory',
      title: 'Cảnh báo tồn kho',
      message: 'Sách "React.js cơ bản" sắp hết hàng (còn 5 bản)',
      time: '2024-01-15 09:15',
      read: false
    },
    {
      id: 3,
      type: 'system',
      title: 'Cập nhật hệ thống',
      message: 'Hệ thống đã được cập nhật lên phiên bản 2.1.0',
      time: '2024-01-14 16:45',
      read: true
    }
  ]);

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      action: 'Đăng nhập',
      user: 'Admin',
      time: '2024-01-15 10:30',
      ip: '192.168.1.100'
    },
    {
      id: 2,
      action: 'Thêm sách mới',
      user: 'Admin',
      time: '2024-01-15 09:45',
      ip: '192.168.1.100'
    },
    {
      id: 3,
      action: 'Cập nhật đơn hàng',
      user: 'Admin',
      time: '2024-01-15 09:30',
      ip: '192.168.1.100'
    }
  ]);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = () => {
    // Lưu cài đặt
    console.log('Saving settings:', settings);
    alert('Cài đặt đã được lưu thành công!');
  };

  const handleResetSettings = () => {
    if (window.confirm('Bạn có chắc chắn muốn reset về cài đặt mặc định?')) {
      // Reset settings
      alert('Cài đặt đã được reset về mặc định!');
    }
  };

  const handleUploadLogo = () => {
    // Xử lý upload logo
    alert('Tính năng upload logo sẽ được triển khai!');
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order': return '🛒';
      case 'inventory': return '📦';
      case 'system': return '⚙️';
      default: return '📢';
    }
  };

  const getNotificationBadge = (type) => {
    switch (type) {
      case 'order': return 'success';
      case 'inventory': return 'warning';
      case 'system': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <FaCog className="me-2" />
          Cài đặt hệ thống
        </h2>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={handleResetSettings}>
            Reset mặc định
          </Button>
          <Button variant="primary" onClick={handleSaveSettings}>
            <FaSave className="me-2" />
            Lưu cài đặt
          </Button>
        </div>
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        {/* General Settings Tab */}
        <Tab eventKey="general" title={
          <span>
            <FaGlobe className="me-1" />
            Tổng quan
          </span>
        }>
          <Row>
            <Col md={8}>
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Thông tin cơ bản</h5>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Tên cửa hàng *</Form.Label>
                        <Form.Control
                          type="text"
                          value={settings.siteName}
                          onChange={(e) => handleInputChange('siteName', e.target.value)}
                          placeholder="Nhập tên cửa hàng"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email quản trị *</Form.Label>
                        <Form.Control
                          type="email"
                          value={settings.adminEmail}
                          onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                          placeholder="admin@example.com"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Mô tả cửa hàng</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={settings.siteDescription}
                      onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                      placeholder="Mô tả về cửa hàng..."
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>URL website</Form.Label>
                        <Form.Control
                          type="url"
                          value={settings.siteUrl}
                          onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                          placeholder="https://example.com"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                          type="tel"
                          value={settings.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="0123456789"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={settings.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Nhập địa chỉ cửa hàng..."
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Logo cửa hàng</h5>
                </Card.Header>
                <Card.Body className="text-center">
                  <div 
                    className="logo-preview mb-3"
                    style={{
                      width: '150px',
                      height: '150px',
                      border: '2px dashed #dee2e6',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      backgroundColor: '#f8f9fa'
                    }}
                  >
                    {settings.logo ? (
                      <img src={settings.logo} alt="Logo" style={{maxWidth: '100%', maxHeight: '100%'}} />
                    ) : (
                      <div className="text-muted">
                        <FaStore size={48} />
                        <div className="mt-2">Chưa có logo</div>
                      </div>
                    )}
                  </div>
                  <Button variant="outline-primary" onClick={handleUploadLogo}>
                    <FaUpload className="me-2" />
                    Upload logo
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* Store Settings Tab */}
        <Tab eventKey="store" title={
          <span>
            <FaStore className="me-1" />
            Cửa hàng
          </span>
        }>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Cài đặt cửa hàng</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tiền tệ</Form.Label>
                    <Form.Select
                      value={settings.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                    >
                      <option value="VND">Việt Nam Đồng (VND)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Ký hiệu tiền tệ</Form.Label>
                    <Form.Control
                      type="text"
                      value={settings.currencySymbol}
                      onChange={(e) => handleInputChange('currencySymbol', e.target.value)}
                      placeholder="₫"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Thuế VAT (%)</Form.Label>
                    <Form.Control
                      type="number"
                      value={settings.taxRate}
                      onChange={(e) => handleInputChange('taxRate', e.target.value)}
                      min="0"
                      max="100"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phí vận chuyển (VNĐ)</Form.Label>
                    <Form.Control
                      type="number"
                      value={settings.shippingFee}
                      onChange={(e) => handleInputChange('shippingFee', e.target.value)}
                      min="0"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Miễn phí ship từ (VNĐ)</Form.Label>
                    <Form.Control
                      type="number"
                      value={settings.freeShippingThreshold}
                      onChange={(e) => handleInputChange('freeShippingThreshold', e.target.value)}
                      min="0"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Trạng thái cửa hàng</Form.Label>
                <Form.Select
                  value={settings.storeStatus}
                  onChange={(e) => handleInputChange('storeStatus', e.target.value)}
                >
                  <option value="active">Hoạt động</option>
                  <option value="maintenance">Bảo trì</option>
                  <option value="closed">Đóng cửa</option>
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>
        </Tab>

        {/* Security Settings Tab */}
        <Tab eventKey="security" title={
          <span>
            <FaShieldAlt className="me-1" />
            Bảo mật
          </span>
        }>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Cài đặt bảo mật</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Thời gian timeout phiên (phút)</Form.Label>
                    <Form.Control
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                      min="5"
                      max="480"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Số lần đăng nhập sai tối đa</Form.Label>
                    <Form.Control
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => handleInputChange('maxLoginAttempts', e.target.value)}
                      min="3"
                      max="10"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Độ dài mật khẩu tối thiểu</Form.Label>
                    <Form.Control
                      type="number"
                      value={settings.passwordMinLength}
                      onChange={(e) => handleInputChange('passwordMinLength', e.target.value)}
                      min="6"
                      max="20"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Xác thực 2 yếu tố</Form.Label>
                    <Form.Check
                      type="switch"
                      id="requireTwoFactor"
                      label="Yêu cầu xác thực 2 yếu tố"
                      checked={settings.requireTwoFactor}
                      onChange={(e) => handleInputChange('requireTwoFactor', e.target.checked)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Alert variant="info">
                <strong>Lưu ý:</strong> Cài đặt bảo mật sẽ có hiệu lực ngay lập tức và áp dụng cho tất cả người dùng.
              </Alert>
            </Card.Body>
          </Card>
        </Tab>

        {/* Notifications Tab */}
        <Tab eventKey="notifications" title={
          <span>
            <FaBell className="me-1" />
            Thông báo
          </span>
        }>
          <Row>
            <Col md={8}>
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Cài đặt thông báo</h5>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="emailNotifications"
                      label="Thông báo qua email"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="smsNotifications"
                      label="Thông báo qua SMS"
                      checked={settings.smsNotifications}
                      onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="orderNotifications"
                      label="Thông báo đơn hàng mới"
                      checked={settings.orderNotifications}
                      onChange={(e) => handleInputChange('orderNotifications', e.target.checked)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="inventoryAlerts"
                      label="Cảnh báo tồn kho"
                      checked={settings.inventoryAlerts}
                      onChange={(e) => handleInputChange('inventoryAlerts', e.target.checked)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Ngưỡng cảnh báo tồn kho thấp</Form.Label>
                    <Form.Control
                      type="number"
                      value={settings.lowStockThreshold}
                      onChange={(e) => handleInputChange('lowStockThreshold', e.target.value)}
                      min="1"
                      max="100"
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Thông báo gần đây</h5>
                </Card.Header>
                <Card.Body>
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`d-flex align-items-start mb-3 p-2 ${!notification.read ? 'bg-light' : ''}`}>
                      <div className="me-2">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start">
                          <h6 className="mb-1">{notification.title}</h6>
                          <Badge bg={getNotificationBadge(notification.type)} size="sm">
                            {notification.type}
                          </Badge>
                        </div>
                        <p className="mb-1 small text-muted">{notification.message}</p>
                        <small className="text-muted">{notification.time}</small>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* System Tab */}
        <Tab eventKey="system" title={
          <span>
            <FaDatabase className="me-1" />
            Hệ thống
          </span>
        }>
          <Row>
            <Col md={8}>
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Cài đặt hệ thống</h5>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="maintenanceMode"
                      label="Chế độ bảo trì"
                      checked={settings.maintenanceMode}
                      onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                    />
                    <Form.Text className="text-muted">
                      Khi bật, website sẽ hiển thị trang bảo trì cho người dùng
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="debugMode"
                      label="Chế độ debug"
                      checked={settings.debugMode}
                      onChange={(e) => handleInputChange('debugMode', e.target.checked)}
                    />
                    <Form.Text className="text-muted">
                      Hiển thị thông tin debug chi tiết (chỉ dành cho developer)
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="cacheEnabled"
                      label="Bật cache"
                      checked={settings.cacheEnabled}
                      onChange={(e) => handleInputChange('cacheEnabled', e.target.checked)}
                    />
                    <Form.Text className="text-muted">
                      Cache giúp tăng tốc độ tải trang
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="autoBackup"
                      label="Tự động sao lưu"
                      checked={settings.autoBackup}
                      onChange={(e) => handleInputChange('autoBackup', e.target.checked)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Tần suất sao lưu</Form.Label>
                    <Form.Select
                      value={settings.backupFrequency}
                      onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
                    >
                      <option value="hourly">Hàng giờ</option>
                      <option value="daily">Hàng ngày</option>
                      <option value="weekly">Hàng tuần</option>
                      <option value="monthly">Hàng tháng</option>
                    </Form.Select>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Hoạt động gần đây</h5>
                </Card.Header>
                <Card.Body>
                  <Table responsive size="sm">
                    <thead>
                      <tr>
                        <th>Hành động</th>
                        <th>Người dùng</th>
                        <th>Thời gian</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivities.map((activity) => (
                        <tr key={activity.id}>
                          <td>{activity.action}</td>
                          <td>{activity.user}</td>
                          <td>
                            <small>{activity.time}</small>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminSettingsPage;
