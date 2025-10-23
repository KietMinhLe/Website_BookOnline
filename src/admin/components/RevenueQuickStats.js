import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Button,
  Badge,
  ProgressBar
} from 'react-bootstrap';
import { 
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
  FaEye,
  FaDownload
} from 'react-icons/fa';

const RevenueQuickStats = () => {
  const [quickStats, setQuickStats] = useState({
    todayRevenue: 5500000,
    yesterdayRevenue: 4800000,
    weekRevenue: 32000000,
    monthRevenue: 125000000,
    growthToday: 14.6,
    growthWeek: 8.3,
    growthMonth: 15.5,
    topCategory: 'Lập trình',
    topProduct: 'React.js từ cơ bản đến nâng cao',
    conversionRate: 3.2
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getGrowthIcon = (growth) => {
    return growth >= 0 ? <FaArrowUp className="text-success" /> : <FaArrowDown className="text-danger" />;
  };

  const getGrowthColor = (growth) => {
    return growth >= 0 ? 'success' : 'danger';
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">
          <FaDollarSign className="me-2" />
          Thống kê doanh thu nhanh
        </h5>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" size="sm">
            <FaEye className="me-1" />
            Xem chi tiết
          </Button>
          <Button variant="outline-secondary" size="sm">
            <FaDownload className="me-1" />
            Xuất
          </Button>
        </div>
      </div>

      <Row>
        {/* Today's Revenue */}
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <FaDollarSign className="text-primary mb-2" size={24} />
              <h5 className="mb-1">{formatCurrency(quickStats.todayRevenue)}</h5>
              <p className="text-muted mb-2">Hôm nay</p>
              <div className="d-flex align-items-center justify-content-center">
                {getGrowthIcon(quickStats.growthToday)}
                <span className={`ms-1 fw-bold text-${getGrowthColor(quickStats.growthToday)}`}>
                  {quickStats.growthToday >= 0 ? '+' : ''}{quickStats.growthToday}%
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Week Revenue */}
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <FaChartLine className="text-success mb-2" size={24} />
              <h5 className="mb-1">{formatCurrency(quickStats.weekRevenue)}</h5>
              <p className="text-muted mb-2">Tuần này</p>
              <div className="d-flex align-items-center justify-content-center">
                {getGrowthIcon(quickStats.growthWeek)}
                <span className={`ms-1 fw-bold text-${getGrowthColor(quickStats.growthWeek)}`}>
                  {quickStats.growthWeek >= 0 ? '+' : ''}{quickStats.growthWeek}%
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Month Revenue */}
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <FaChartLine className="text-info mb-2" size={24} />
              <h5 className="mb-1">{formatCurrency(quickStats.monthRevenue)}</h5>
              <p className="text-muted mb-2">Tháng này</p>
              <div className="d-flex align-items-center justify-content-center">
                {getGrowthIcon(quickStats.growthMonth)}
                <span className={`ms-1 fw-bold text-${getGrowthColor(quickStats.growthMonth)}`}>
                  {quickStats.growthMonth >= 0 ? '+' : ''}{quickStats.growthMonth}%
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Conversion Rate */}
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <FaChartLine className="text-warning mb-2" size={24} />
              <h5 className="mb-1">{quickStats.conversionRate}%</h5>
              <p className="text-muted mb-2">Tỷ lệ chuyển đổi</p>
              <ProgressBar 
                now={quickStats.conversionRate} 
                variant="warning" 
                style={{height: '6px'}}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-3">
        {/* Top Category */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <h6 className="mb-2">Danh mục bán chạy nhất</h6>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-bold">{quickStats.topCategory}</div>
                  <small className="text-muted">36% tổng doanh thu</small>
                </div>
                <Badge bg="primary" className="fs-6">#1</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Top Product */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <h6 className="mb-2">Sản phẩm bán chạy nhất</h6>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-bold small">{quickStats.topProduct}</div>
                  <small className="text-muted">45 bán • 11.25M VNĐ</small>
                </div>
                <Badge bg="success" className="fs-6">Hot</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RevenueQuickStats;
