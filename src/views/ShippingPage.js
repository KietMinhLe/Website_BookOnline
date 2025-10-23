import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FaTruck, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaShieldAlt, FaBox } from 'react-icons/fa';

const ShippingPage = () => {
  const shippingZones = [
    {
      zone: "Khu vực 1",
      cities: ["TP. Hồ Chí Minh", "Bình Dương", "Đồng Nai", "Long An"],
      fee: "15,000 - 20,000 VNĐ",
      time: "1-2 ngày",
      color: "success"
    },
    {
      zone: "Khu vực 2", 
      cities: ["Hà Nội", "Hải Phòng", "Đà Nẵng", "Cần Thơ"],
      fee: "20,000 - 25,000 VNĐ",
      time: "2-3 ngày",
      color: "primary"
    },
    {
      zone: "Khu vực 3",
      cities: ["Các tỉnh miền Trung", "Tây Nguyên"],
      fee: "25,000 - 30,000 VNĐ", 
      time: "3-4 ngày",
      color: "warning"
    },
    {
      zone: "Khu vực 4",
      cities: ["Các tỉnh miền Bắc", "Miền Tây"],
      fee: "30,000 - 35,000 VNĐ",
      time: "4-5 ngày", 
      color: "info"
    }
  ];

  const shippingMethods = [
    {
      name: "Giao hàng tiêu chuẩn",
      description: "Giao hàng trong giờ hành chính",
      icon: FaTruck,
      color: "primary"
    },
    {
      name: "Giao hàng nhanh",
      description: "Giao hàng trong ngày (chỉ TP.HCM)",
      icon: FaClock,
      color: "success"
    },
    {
      name: "Giao hàng tại nhà",
      description: "Giao hàng tận nơi theo yêu cầu",
      icon: FaMapMarkerAlt,
      color: "warning"
    }
  ];

  const policies = [
    {
      title: "Miễn phí vận chuyển",
      description: "Đơn hàng từ 500,000 VNĐ",
      icon: FaShieldAlt,
      color: "success"
    },
    {
      title: "Đóng gói an toàn",
      description: "Sách được đóng gói cẩn thận",
      icon: FaBox,
      color: "primary"
    },
    {
      title: "Bảo hiểm hàng hóa",
      description: "Bảo hiểm 100% giá trị đơn hàng",
      icon: FaShieldAlt,
      color: "info"
    }
  ];

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-5 fw-bold text-primary mb-3">
              <FaTruck className="me-3" />
              Chính sách giao hàng
            </h1>
            <p className="lead text-muted">
              Thông tin chi tiết về phí vận chuyển, thời gian giao hàng và các dịch vụ vận chuyển
            </p>
          </div>
        </Col>
      </Row>

      {/* Shipping Zones */}
      <Row className="mb-5">
        <Col>
          <h2 className="h3 fw-bold text-center text-primary mb-5">Bảng phí vận chuyển theo khu vực</h2>
          <Row className="g-4">
            {shippingZones.map((zone, index) => (
              <Col key={index} lg={3} md={6} sm={12}>
                <Card className={`border-0 shadow-sm h-100 shipping-zone-card bg-${zone.color} bg-opacity-10`}>
                  <Card.Body className="p-4 text-center">
                    <Badge bg={zone.color} className="mb-3 fs-6">
                      {zone.zone}
                    </Badge>
                    <h5 className="fw-bold mb-3">{zone.zone}</h5>
                    <div className="mb-3">
                      <strong>Thành phố:</strong>
                      <ul className="list-unstyled mt-2">
                        {zone.cities.map((city, idx) => (
                          <li key={idx} className="small text-muted">{city}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mb-3">
                      <strong>Phí ship:</strong><br />
                      <span className="text-primary fw-bold">{zone.fee}</span>
                    </div>
                    <div>
                      <strong>Thời gian:</strong><br />
                      <span className="text-success fw-bold">{zone.time}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Shipping Methods */}
      <Row className="mb-5">
        <Col>
          <h2 className="h3 fw-bold text-center text-primary mb-5">Phương thức giao hàng</h2>
          <Row className="g-4">
            {shippingMethods.map((method, index) => (
              <Col key={index} lg={4} md={6} sm={12}>
                <Card className="border-0 shadow-sm h-100 text-center">
                  <Card.Body className="p-4">
                    <div className={`bg-${method.color} text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3`} style={{ width: '80px', height: '80px' }}>
                      <method.icon size={32} />
                    </div>
                    <h5 className="fw-bold mb-3">{method.name}</h5>
                    <p className="text-muted">{method.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Policies */}
      <Row className="mb-5">
        <Col>
          <h2 className="h3 fw-bold text-center text-primary mb-5">Chính sách đặc biệt</h2>
          <Row className="g-4">
            {policies.map((policy, index) => (
              <Col key={index} lg={4} md={6} sm={12}>
                <Card className={`border-0 shadow-sm h-100 policy-card bg-${policy.color} bg-opacity-10`}>
                  <Card.Body className="p-4 text-center">
                    <div className={`bg-${policy.color} text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3`} style={{ width: '70px', height: '70px' }}>
                      <policy.icon size={28} />
                    </div>
                    <h5 className="fw-bold mb-3">{policy.title}</h5>
                    <p className="text-muted">{policy.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Process */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h3 className="h4 fw-bold mb-0">Quy trình giao hàng</h3>
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="g-4">
                <Col md={3} sm={6}>
                  <div className="text-center">
                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                      <span className="fw-bold">1</span>
                    </div>
                    <h6 className="fw-bold">Đặt hàng</h6>
                    <p className="small text-muted">Chọn sách và đặt hàng online</p>
                  </div>
                </Col>
                <Col md={3} sm={6}>
                  <div className="text-center">
                    <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                      <span className="fw-bold">2</span>
                    </div>
                    <h6 className="fw-bold">Xác nhận</h6>
                    <p className="small text-muted">Xác nhận đơn hàng và thanh toán</p>
                  </div>
                </Col>
                <Col md={3} sm={6}>
                  <div className="text-center">
                    <div className="bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                      <span className="fw-bold">3</span>
                    </div>
                    <h6 className="fw-bold">Đóng gói</h6>
                    <p className="small text-muted">Đóng gói và chuẩn bị giao hàng</p>
                  </div>
                </Col>
                <Col md={3} sm={6}>
                  <div className="text-center">
                    <div className="bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                      <span className="fw-bold">4</span>
                    </div>
                    <h6 className="fw-bold">Giao hàng</h6>
                    <p className="small text-muted">Giao hàng tận nơi</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Contact */}
      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 text-center">
              <h3 className="h4 fw-bold text-primary mb-3">Cần hỗ trợ về giao hàng?</h3>
              <p className="text-muted mb-4">
                Nếu bạn có bất kỳ thắc mắc nào về chính sách giao hàng, 
                vui lòng liên hệ với chúng tôi
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <div className="d-flex align-items-center">
                  <FaPhone className="text-primary me-2" />
                  <span>1900 1234</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaEnvelope className="text-primary me-2" />
                  <span>support@bookstore.vn</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingPage;
