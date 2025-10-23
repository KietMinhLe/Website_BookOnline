import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Table, 
  Button, 
  Form, 
  Dropdown,
  ButtonGroup,
  Badge,
  Alert,
  ProgressBar
} from 'react-bootstrap';
import { 
  FaDownload, 
  FaChartLine, 
  FaChartBar, 
  FaChartPie,
  FaCalendarAlt,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaArrowUp,
  FaArrowDown,
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
  FaEye
} from 'react-icons/fa';

const AdminRevenueStatsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [viewMode, setViewMode] = useState('daily'); // daily, weekly, monthly, yearly

  const [revenueData, setRevenueData] = useState({
    // Tổng quan
    totalRevenue: 125000000,
    totalOrders: 1250,
    averageOrderValue: 100000,
    totalCustomers: 850,
    growthRate: 15.5,
    
    // Doanh thu theo ngày (7 ngày gần nhất)
    dailyRevenue: [
      { date: '2024-01-15', revenue: 2500000, orders: 15, customers: 12 },
      { date: '2024-01-16', revenue: 3800000, orders: 23, customers: 18 },
      { date: '2024-01-17', revenue: 2900000, orders: 18, customers: 15 },
      { date: '2024-01-18', revenue: 4200000, orders: 31, customers: 25 },
      { date: '2024-01-19', revenue: 3600000, orders: 27, customers: 22 },
      { date: '2024-01-20', revenue: 4800000, orders: 35, customers: 28 },
      { date: '2024-01-21', revenue: 5500000, orders: 42, customers: 35 }
    ],
    
    // Doanh thu theo tháng (12 tháng gần nhất)
    monthlyRevenue: [
      { month: 'Tháng 1', revenue: 125000000, orders: 1250, growth: 15.5 },
      { month: 'Tháng 2', revenue: 118000000, orders: 1180, growth: 8.2 },
      { month: 'Tháng 3', revenue: 135000000, orders: 1350, growth: 14.4 },
      { month: 'Tháng 4', revenue: 142000000, orders: 1420, growth: 5.2 },
      { month: 'Tháng 5', revenue: 138000000, orders: 1380, growth: -2.8 },
      { month: 'Tháng 6', revenue: 155000000, orders: 1550, growth: 12.3 },
      { month: 'Tháng 7', revenue: 148000000, orders: 1480, growth: -4.5 },
      { month: 'Tháng 8', revenue: 162000000, orders: 1620, growth: 9.5 },
      { month: 'Tháng 9', revenue: 158000000, orders: 1580, growth: -2.5 },
      { month: 'Tháng 10', revenue: 175000000, orders: 1750, growth: 10.8 },
      { month: 'Tháng 11', revenue: 168000000, orders: 1680, growth: -4.0 },
      { month: 'Tháng 12', revenue: 185000000, orders: 1850, growth: 10.1 }
    ],
    
    // Doanh thu theo danh mục
    categoryRevenue: [
      { category: 'Lập trình', revenue: 45000000, percentage: 36.0, orders: 450 },
      { category: 'Khoa học', revenue: 28000000, percentage: 22.4, orders: 280 },
      { category: 'Văn học', revenue: 20000000, percentage: 16.0, orders: 200 },
      { category: 'Kinh tế', revenue: 15000000, percentage: 12.0, orders: 150 },
      { category: 'Lịch sử', revenue: 10000000, percentage: 8.0, orders: 100 },
      { category: 'Nghệ thuật', revenue: 7000000, percentage: 5.6, orders: 70 }
    ],
    
    // Top sản phẩm bán chạy
    topProducts: [
      { id: 1, name: 'React.js từ cơ bản đến nâng cao', revenue: 11250000, sales: 45, growth: 12.5 },
      { id: 2, name: 'JavaScript ES6+', revenue: 7600000, sales: 38, growth: 8.3 },
      { id: 3, name: 'Node.js thực hành', revenue: 9600000, sales: 32, growth: 15.2 },
      { id: 4, name: 'Vue.js cơ bản', revenue: 5600000, sales: 28, growth: -2.1 },
      { id: 5, name: 'Angular từ A-Z', revenue: 10000000, sales: 25, growth: 5.7 }
    ],
    
    // So sánh với kỳ trước
    comparison: {
      revenueGrowth: 15.5,
      ordersGrowth: 12.3,
      customersGrowth: 8.7,
      averageOrderValueGrowth: 2.9
    }
  });

  const periodOptions = [
    { value: '7days', label: '7 ngày qua' },
    { value: '30days', label: '30 ngày qua' },
    { value: '90days', label: '90 ngày qua' },
    { value: '1year', label: '1 năm qua' },
    { value: 'custom', label: 'Tùy chọn' }
  ];

  const viewModeOptions = [
    { value: 'daily', label: 'Theo ngày' },
    { value: 'weekly', label: 'Theo tuần' },
    { value: 'monthly', label: 'Theo tháng' },
    { value: 'yearly', label: 'Theo năm' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN').format(number);
  };

  const getGrowthIcon = (growth) => {
    return growth >= 0 ? <FaArrowUp className="text-success" /> : <FaArrowDown className="text-danger" />;
  };

  const getGrowthColor = (growth) => {
    return growth >= 0 ? 'success' : 'danger';
  };

  const calculateTotalRevenue = () => {
    if (viewMode === 'daily') {
      return revenueData.dailyRevenue.reduce((total, day) => total + day.revenue, 0);
    } else if (viewMode === 'monthly') {
      return revenueData.monthlyRevenue.reduce((total, month) => total + month.revenue, 0);
    }
    return revenueData.totalRevenue;
  };

  const calculateTotalOrders = () => {
    if (viewMode === 'daily') {
      return revenueData.dailyRevenue.reduce((total, day) => total + day.orders, 0);
    } else if (viewMode === 'monthly') {
      return revenueData.monthlyRevenue.reduce((total, month) => total + month.orders, 0);
    }
    return revenueData.totalOrders;
  };

  const handleExportRevenue = (format) => {
    console.log(`Exporting revenue report in ${format} format for period ${selectedPeriod}`);
    alert(`Xuất báo cáo doanh thu định dạng ${format} thành công!`);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <FaDollarSign className="me-2" />
          Thống kê doanh thu
        </h2>
        <div className="d-flex gap-2">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary">
              <FaDownload className="me-2" />
              Xuất báo cáo
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleExportRevenue('excel')}>
                <FaFileExcel className="me-2" />
                Excel (.xlsx)
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleExportRevenue('pdf')}>
                <FaFilePdf className="me-2" />
                PDF (.pdf)
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleExportRevenue('csv')}>
                CSV (.csv)
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="outline-secondary" onClick={handlePrintReport}>
            <FaPrint className="me-2" />
            In báo cáo
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Thời gian</Form.Label>
                <Form.Select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  {periodOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Chế độ xem</Form.Label>
                <Form.Select
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                >
                  {viewModeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Năm</Form.Label>
                <Form.Select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Tháng</Form.Label>
                <Form.Select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  {Array.from({length: 12}, (_, i) => (
                    <option key={i+1} value={i+1}>Tháng {i+1}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>&nbsp;</Form.Label>
                <div>
                  <Button variant="primary" className="w-100">
                    <FaCalendarAlt className="me-2" />
                    Cập nhật
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaDollarSign className="text-primary mb-2" size={32} />
              <h4>{formatCurrency(calculateTotalRevenue())}</h4>
              <p className="text-muted">Tổng doanh thu</p>
              <div className="d-flex align-items-center justify-content-center">
                {getGrowthIcon(revenueData.comparison.revenueGrowth)}
                <span className={`ms-1 fw-bold text-${getGrowthColor(revenueData.comparison.revenueGrowth)}`}>
                  {revenueData.comparison.revenueGrowth >= 0 ? '+' : ''}{revenueData.comparison.revenueGrowth}%
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaShoppingCart className="text-success mb-2" size={32} />
              <h4>{formatNumber(calculateTotalOrders())}</h4>
              <p className="text-muted">Tổng đơn hàng</p>
              <div className="d-flex align-items-center justify-content-center">
                {getGrowthIcon(revenueData.comparison.ordersGrowth)}
                <span className={`ms-1 fw-bold text-${getGrowthColor(revenueData.comparison.ordersGrowth)}`}>
                  {revenueData.comparison.ordersGrowth >= 0 ? '+' : ''}{revenueData.comparison.ordersGrowth}%
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaChartLine className="text-info mb-2" size={32} />
              <h4>{formatCurrency(revenueData.averageOrderValue)}</h4>
              <p className="text-muted">Giá trị đơn hàng TB</p>
              <div className="d-flex align-items-center justify-content-center">
                {getGrowthIcon(revenueData.comparison.averageOrderValueGrowth)}
                <span className={`ms-1 fw-bold text-${getGrowthColor(revenueData.comparison.averageOrderValueGrowth)}`}>
                  {revenueData.comparison.averageOrderValueGrowth >= 0 ? '+' : ''}{revenueData.comparison.averageOrderValueGrowth}%
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaUsers className="text-warning mb-2" size={32} />
              <h4>{formatNumber(revenueData.totalCustomers)}</h4>
              <p className="text-muted">Tổng khách hàng</p>
              <div className="d-flex align-items-center justify-content-center">
                {getGrowthIcon(revenueData.comparison.customersGrowth)}
                <span className={`ms-1 fw-bold text-${getGrowthColor(revenueData.comparison.customersGrowth)}`}>
                  {revenueData.comparison.customersGrowth >= 0 ? '+' : ''}{revenueData.comparison.customersGrowth}%
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Revenue Chart */}
        <Col md={8}>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Biểu đồ doanh thu</h5>
                <ButtonGroup size="sm">
                  <Button variant="outline-primary">Ngày</Button>
                  <Button variant="outline-secondary">Tuần</Button>
                  <Button variant="outline-secondary">Tháng</Button>
                </ButtonGroup>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="chart-placeholder mb-3" style={{
                height: '300px',
                backgroundColor: '#f8f9fa',
                border: '2px dashed #dee2e6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
                <FaChartLine size={48} className="text-muted mb-2" />
                <p className="text-muted mb-0">Biểu đồ doanh thu theo thời gian</p>
                <small className="text-muted">Tích hợp Chart.js hoặc Recharts</small>
              </div>
              
              {/* Revenue Data Table */}
              <Table responsive>
                <thead>
                  <tr>
                    <th>Thời gian</th>
                    <th>Doanh thu</th>
                    <th>Đơn hàng</th>
                    <th>Khách hàng</th>
                    <th>Tăng trưởng</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {viewMode === 'daily' ? (
                    revenueData.dailyRevenue.map((day, index) => (
                      <tr key={index}>
                        <td>{day.date}</td>
                        <td className="fw-bold">{formatCurrency(day.revenue)}</td>
                        <td>{day.orders}</td>
                        <td>{day.customers}</td>
                        <td>
                          <Badge bg="success">+12.5%</Badge>
                        </td>
                        <td>
                          <Button variant="outline-primary" size="sm">
                            <FaEye />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    revenueData.monthlyRevenue.map((month, index) => (
                      <tr key={index}>
                        <td>{month.month}</td>
                        <td className="fw-bold">{formatCurrency(month.revenue)}</td>
                        <td>{month.orders}</td>
                        <td>-</td>
                        <td>
                          <Badge bg={month.growth >= 0 ? 'success' : 'danger'}>
                            {month.growth >= 0 ? '+' : ''}{month.growth}%
                          </Badge>
                        </td>
                        <td>
                          <Button variant="outline-primary" size="sm">
                            <FaEye />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Revenue by Category */}
        <Col md={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Doanh thu theo danh mục</h5>
            </Card.Header>
            <Card.Body>
              <div className="chart-placeholder mb-3" style={{
                height: '200px',
                backgroundColor: '#f8f9fa',
                border: '2px dashed #dee2e6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
                <FaChartPie size={32} className="text-muted mb-2" />
                <p className="text-muted mb-0">Biểu đồ tròn</p>
              </div>
              
              {revenueData.categoryRevenue.map((category, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">{category.category}</span>
                    <span className="text-muted">{category.percentage}%</span>
                  </div>
                  <ProgressBar 
                    now={category.percentage} 
                    variant="primary" 
                    className="mb-1"
                    style={{height: '8px'}}
                  />
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">{formatCurrency(category.revenue)}</small>
                    <small className="text-muted">{category.orders} đơn</small>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        {/* Top Products Revenue */}
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Sản phẩm có doanh thu cao nhất</h5>
            </Card.Header>
            <Card.Body>
              {revenueData.topProducts.map((product, index) => (
                <div key={product.id} className="d-flex justify-content-between align-items-center mb-3 p-2 border rounded">
                  <div className="flex-grow-1">
                    <div className="fw-bold">{product.name}</div>
                    <div className="text-muted small">
                      {product.sales} bán • {formatCurrency(product.revenue)}
                    </div>
                  </div>
                  <div className="text-end">
                    <div className={`fw-bold ${product.growth >= 0 ? 'text-success' : 'text-danger'}`}>
                      {product.growth >= 0 ? '+' : ''}{product.growth}%
                    </div>
                    <small className="text-muted">Tăng trưởng</small>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* Revenue Insights */}
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Phân tích doanh thu</h5>
            </Card.Header>
            <Card.Body>
              <Alert variant="success" className="mb-3">
                <strong>Xu hướng tích cực!</strong><br />
                Doanh thu tăng {revenueData.comparison.revenueGrowth}% so với kỳ trước.
              </Alert>
              
              <div className="mb-3">
                <h6>Thời gian bán hàng tốt nhất:</h6>
                <ul className="list-unstyled">
                  <li>• <strong>Ngày:</strong> Thứ 7, Chủ nhật</li>
                  <li>• <strong>Giờ:</strong> 19:00 - 22:00</li>
                  <li>• <strong>Tháng:</strong> Tháng 12, Tháng 6</li>
                </ul>
              </div>
              
              <div className="mb-3">
                <h6>Khuyến nghị:</h6>
                <ul className="list-unstyled">
                  <li>• Tăng cường marketing cho danh mục "Lập trình"</li>
                  <li>• Mở rộng sản phẩm "React.js"</li>
                  <li>• Cải thiện tỷ lệ chuyển đổi khách hàng</li>
                </ul>
              </div>
              
              <div className="chart-placeholder" style={{
                height: '120px',
                backgroundColor: '#f8f9fa',
                border: '2px dashed #dee2e6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
                <FaChartBar size={24} className="text-muted mb-1" />
                <p className="text-muted mb-0 small">Biểu đồ xu hướng</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminRevenueStatsPage;
