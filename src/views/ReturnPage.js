import React from 'react';
import { Container, Row, Col, Card, Alert, Badge } from 'react-bootstrap';
import { FaUndo, FaClock, FaShieldAlt, FaBox, FaPhone, FaEnvelope, FaCheckCircle } from 'react-icons/fa';

const ReturnPage = () => {
  const returnConditions = [
    {
      title: "Điều kiện đổi trả",
      items: [
        "Sách còn nguyên vẹn, không bị hỏng",
        "Còn đầy đủ tem nhãn và bao bì gốc",
        "Có hóa đơn mua hàng hợp lệ",
        "Trong thời hạn 7 ngày kể từ ngày nhận hàng"
      ],
      icon: FaCheckCircle,
      color: "success"
    },
    {
      title: "Trường hợp không đổi trả",
      items: [
        "Sách đã bị hỏng do lỗi người dùng",
        "Sách đã được sử dụng hoặc viết vào",
        "Hết thời hạn đổi trả",
        "Không có hóa đơn mua hàng"
      ],
      icon: FaShieldAlt,
      color: "danger"
    }
  ];

  const returnProcess = [
    {
      step: 1,
      title: "Liên hệ hỗ trợ",
      description: "Gọi hotline hoặc gửi email yêu cầu đổi trả",
      icon: FaPhone,
      color: "primary"
    },
    {
      step: 2,
      title: "Chuẩn bị hàng",
      description: "Đóng gói sách và giữ nguyên bao bì gốc",
      icon: FaBox,
      color: "warning"
    },
    {
      step: 3,
      title: "Gửi hàng",
      description: "Gửi hàng về địa chỉ của chúng tôi",
      icon: FaUndo,
      color: "info"
    },
    {
      step: 4,
      title: "Kiểm tra & hoàn tiền",
      description: "Kiểm tra hàng và hoàn tiền trong 3-5 ngày",
      icon: FaCheckCircle,
      color: "success"
    }
  ];

  const refundMethods = [
    {
      method: "Hoàn tiền qua tài khoản ngân hàng",
      time: "3-5 ngày làm việc",
      description: "Tiền sẽ được chuyển về tài khoản bạn đã thanh toán"
    },
    {
      method: "Hoàn tiền qua ví điện tử",
      time: "1-2 ngày làm việc", 
      description: "Tiền sẽ được chuyển về ví điện tử của bạn"
    },
    {
      method: "Hoàn tiền mặt (COD)",
      time: "Ngay lập tức",
      description: "Nhân viên sẽ hoàn tiền mặt khi nhận hàng"
    }
  ];

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-5 fw-bold text-primary mb-3">
              <FaUndo className="me-3" />
              Chính sách đổi trả
            </h1>
            <p className="lead text-muted">
              Thông tin chi tiết về điều kiện, quy trình và phương thức đổi trả hàng
            </p>
          </div>
        </Col>
      </Row>

      {/* Important Notice */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Alert variant="info" className="text-center">
            <h4 className="alert-heading">
              <FaClock className="me-2" />
              Thời gian đổi trả
            </h4>
            <p className="mb-0">
              <strong>7 ngày</strong> kể từ ngày nhận hàng. Sau thời gian này, 
              chúng tôi không thể hỗ trợ đổi trả.
            </p>
          </Alert>
        </Col>
      </Row>

      {/* Return Conditions */}
      <Row className="mb-5">
        <Col>
          <h2 className="h3 fw-bold text-center text-primary mb-5">Điều kiện đổi trả</h2>
          <Row className="g-4">
            {returnConditions.map((condition, index) => (
              <Col key={index} lg={6} md={12}>
                <Card className={`border-0 shadow-sm h-100 ${condition.color === 'success' ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'}`}>
                  <Card.Header className={`bg-${condition.color} text-white border-0`}>
                    <h5 className="mb-0 d-flex align-items-center">
                      <condition.icon className="me-2" />
                      {condition.title}
                    </h5>
                  </Card.Header>
                  <Card.Body className="p-4">
                    <ul className="list-unstyled mb-0">
                      {condition.items.map((item, idx) => (
                        <li key={idx} className="mb-2 d-flex align-items-start">
                          <Badge bg={condition.color} className="me-2 mt-1">•</Badge>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Return Process */}
      <Row className="mb-5">
        <Col>
          <h2 className="h3 fw-bold text-center text-primary mb-5">Quy trình đổi trả</h2>
          <Row className="g-4">
            {returnProcess.map((process, index) => (
              <Col key={index} lg={3} md={6} sm={12}>
                <Card className="border-0 shadow-sm h-100 text-center">
                  <Card.Body className="p-4">
                    <div className={`bg-${process.color} text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3`} style={{ width: '80px', height: '80px' }}>
                      <process.icon size={32} />
                    </div>
                    <Badge bg={process.color} className="mb-3 fs-6">
                      Bước {process.step}
                    </Badge>
                    <h5 className="fw-bold mb-3">{process.title}</h5>
                    <p className="text-muted">{process.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Refund Methods */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h3 className="h4 fw-bold mb-0">Phương thức hoàn tiền</h3>
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="g-4">
                {refundMethods.map((method, index) => (
                  <Col key={index} lg={4} md={6} sm={12}>
                    <Card className="border-0 shadow-sm h-100">
                      <Card.Body className="p-4 text-center">
                        <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                          <FaCheckCircle size={24} />
                        </div>
                        <h6 className="fw-bold mb-3">{method.method}</h6>
                        <Badge bg="success" className="mb-3">
                          {method.time}
                        </Badge>
                        <p className="text-muted small">{method.description}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Important Notes */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-warning text-dark">
              <h4 className="mb-0">
                <FaShieldAlt className="me-2" />
                Lưu ý quan trọng
              </h4>
            </Card.Header>
            <Card.Body className="p-4">
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <Badge bg="warning" className="me-2">!</Badge>
                  Phí vận chuyển đổi trả sẽ được chúng tôi hỗ trợ 100%
                </li>
                <li className="mb-2">
                  <Badge bg="warning" className="me-2">!</Badge>
                  Hàng hóa phải được đóng gói cẩn thận để tránh hư hỏng
                </li>
                <li className="mb-2">
                  <Badge bg="warning" className="me-2">!</Badge>
                  Chúng tôi sẽ kiểm tra hàng trước khi xử lý hoàn tiền
                </li>
                <li className="mb-0">
                  <Badge bg="warning" className="me-2">!</Badge>
                  Mọi thắc mắc vui lòng liên hệ hotline để được hỗ trợ
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Contact */}
      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 text-center">
              <h3 className="h4 fw-bold text-primary mb-3">Cần hỗ trợ đổi trả?</h3>
              <p className="text-muted mb-4">
                Nếu bạn cần hỗ trợ về việc đổi trả hàng, 
                vui lòng liên hệ với chúng tôi
              </p>
              <div className="d-flex justify-content-center gap-4 flex-wrap">
                <div className="d-flex align-items-center">
                  <FaPhone className="text-primary me-2" />
                  <div>
                    <strong>Hotline:</strong><br />
                    <span className="text-muted">1900 1234</span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <FaEnvelope className="text-primary me-2" />
                  <div>
                    <strong>Email:</strong><br />
                    <span className="text-muted">support@bookstore.vn</span>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReturnPage;
