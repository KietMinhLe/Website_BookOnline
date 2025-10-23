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
  Tab,
  Tabs
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
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
  FaEye
} from 'react-icons/fa';
import AdminRevenueStatsPage from './AdminRevenueStatsPage';

const AdminReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [reportType, setReportType] = useState('sales');
  const [chartData, setChartData] = useState(null);

  const [salesData, setSalesData] = useState([
    { date: '2024-01-01', orders: 15, revenue: 2500000, customers: 12 },
    { date: '2024-01-02', orders: 23, revenue: 3800000, customers: 18 },
    { date: '2024-01-03', orders: 18, revenue: 2900000, customers: 15 },
    { date: '2024-01-04', orders: 31, revenue: 4200000, customers: 25 },
    { date: '2024-01-05', orders: 27, revenue: 3600000, customers: 22 },
    { date: '2024-01-06', orders: 35, revenue: 4800000, customers: 28 },
    { date: '2024-01-07', orders: 42, revenue: 5500000, customers: 35 }
  ]);

  const [topProducts, setTopProducts] = useState([
    { id: 1, name: 'React.js từ cơ bản đến nâng cao', sales: 45, revenue: 11250000, growth: 12.5 },
    { id: 2, name: 'JavaScript ES6+', sales: 38, revenue: 7600000, growth: 8.3 },
    { id: 3, name: 'Node.js thực hành', sales: 32, revenue: 9600000, growth: 15.2 },
    { id: 4, name: 'Vue.js cơ bản', sales: 28, revenue: 5600000, growth: -2.1 },
    { id: 5, name: 'Angular từ A-Z', sales: 25, revenue: 10000000, growth: 5.7 }
  ]);

  const [customerData, setCustomerData] = useState([
    { segment: 'Khách hàng mới', count: 45, percentage: 35.7 },
    { segment: 'Khách hàng quay lại', count: 58, percentage: 46.0 },
    { segment: 'Khách hàng VIP', count: 23, percentage: 18.3 }
  ]);

  const periodOptions = [
    { value: '7days', label: '7 ngày qua' },
    { value: '30days', label: '30 ngày qua' },
    { value: '90days', label: '90 ngày qua' },
    { value: '1year', label: '1 năm qua' },
    { value: 'custom', label: 'Tùy chọn' }
  ];

  const reportTypes = [
    { value: 'sales', label: 'Báo cáo doanh thu', icon: FaChartLine },
    { value: 'products', label: 'Báo cáo sản phẩm', icon: FaChartBar },
    { value: 'customers', label: 'Báo cáo khách hàng', icon: FaChartPie },
    { value: 'inventory', label: 'Báo cáo tồn kho', icon: FaChartBar }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const calculateTotalRevenue = () => {
    return salesData.reduce((total, day) => total + day.revenue, 0);
  };

  const calculateTotalOrders = () => {
    return salesData.reduce((total, day) => total + day.orders, 0);
  };

  const calculateAverageOrderValue = () => {
    const totalRevenue = calculateTotalRevenue();
    const totalOrders = calculateTotalOrders();
    return totalOrders > 0 ? totalRevenue / totalOrders : 0;
  };

  const handleExportReport = (format) => {
    console.log(`Exporting ${reportType} report in ${format} format for period ${selectedPeriod}`);
    alert(`Xuất báo cáo ${reportType} định dạng ${format} thành công!`);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <FaChartLine className="me-2" />
          Báo cáo & Thống kê
        </h2>
        <div className="d-flex gap-2">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary">
              <FaDownload className="me-2" />
              Xuất báo cáo
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleExportReport('excel')}>
                <FaFileExcel className="me-2" />
                Excel (.xlsx)
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleExportReport('pdf')}>
                <FaFilePdf className="me-2" />
                PDF (.pdf)
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleExportReport('csv')}>
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
            <Col md={4}>
              <Form.Group>
                <Form.Label>Loại báo cáo</Form.Label>
                <Form.Select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  {reportTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
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
            <Col md={4}>
              <Form.Group>
                <Form.Label>&nbsp;</Form.Label>
                <div>
                  <Button variant="primary" className="w-100">
                    <FaCalendarAlt className="me-2" />
                    Tạo báo cáo
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
              <FaChartLine className="text-primary mb-2" size={32} />
              <h4>{formatCurrency(calculateTotalRevenue())}</h4>
              <p className="text-muted">Tổng doanh thu</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaChartBar className="text-success mb-2" size={32} />
              <h4>{calculateTotalOrders()}</h4>
              <p className="text-muted">Tổng đơn hàng</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaChartPie className="text-info mb-2" size={32} />
              <h4>{formatCurrency(calculateAverageOrderValue())}</h4>
              <p className="text-muted">Giá trị đơn hàng TB</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaChartBar className="text-warning mb-2" size={32} />
              <h4>126</h4>
              <p className="text-muted">Khách hàng mới</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Sales Chart */}
        <Col md={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Biểu đồ doanh thu theo ngày</h5>
            </Card.Header>
            <Card.Body>
              <div className="chart-placeholder" style={{
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
                <p className="text-muted mb-0">Biểu đồ doanh thu</p>
                <small className="text-muted">Tích hợp Chart.js hoặc Recharts</small>
              </div>
              
              {/* Sales Data Table */}
              <Table responsive className="mt-3">
                <thead>
                  <tr>
                    <th>Ngày</th>
                    <th>Đơn hàng</th>
                    <th>Doanh thu</th>
                    <th>Khách hàng</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((day, index) => (
                    <tr key={index}>
                      <td>{day.date}</td>
                      <td>{day.orders}</td>
                      <td>{formatCurrency(day.revenue)}</td>
                      <td>{day.customers}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Top Products */}
        <Col md={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Sản phẩm bán chạy</h5>
            </Card.Header>
            <Card.Body>
              {topProducts.map((product, index) => (
                <div key={product.id} className="d-flex justify-content-between align-items-center mb-3">
                  <div className="flex-grow-1">
                    <div className="fw-bold small">{product.name}</div>
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
      </Row>

      <Row className="mt-4">
        {/* Customer Segmentation */}
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Phân khúc khách hàng</h5>
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
              
              {customerData.map((segment, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                  <span>{segment.segment}</span>
                  <div className="d-flex align-items-center">
                    <div className="progress me-2" style={{width: '100px', height: '8px'}}>
                      <div 
                        className="progress-bar" 
                        style={{width: `${segment.percentage}%`}}
                      ></div>
                    </div>
                    <span className="fw-bold">{segment.count}</span>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* Inventory Report */}
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Báo cáo tồn kho</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Tổng sản phẩm:</span>
                  <span className="fw-bold">1,250</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Sắp hết hàng:</span>
                  <span className="fw-bold text-warning">23</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Hết hàng:</span>
                  <span className="fw-bold text-danger">5</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Tổng giá trị:</span>
                  <span className="fw-bold text-success">{formatCurrency(125000000)}</span>
                </div>
              </div>
              
              <div className="chart-placeholder" style={{
                height: '150px',
                backgroundColor: '#f8f9fa',
                border: '2px dashed #dee2e6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
                <FaChartBar size={24} className="text-muted mb-1" />
                <p className="text-muted mb-0 small">Biểu đồ tồn kho</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminReportsPage;
