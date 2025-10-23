import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FaShieldAlt, FaLock, FaEye, FaUserSecret, FaDatabase, FaCookie, FaPhone, FaEnvelope } from 'react-icons/fa';

const PrivacyPage = () => {
  const privacySections = [
    {
      title: "Thu thập thông tin",
      icon: FaDatabase,
      color: "primary",
      content: [
        "Thông tin cá nhân: Họ tên, email, số điện thoại, địa chỉ",
        "Thông tin thanh toán: Số thẻ, tài khoản ngân hàng (được mã hóa)",
        "Thông tin duyệt web: Cookies, IP address, trình duyệt",
        "Thông tin đơn hàng: Lịch sử mua hàng, sở thích"
      ]
    },
    {
      title: "Sử dụng thông tin",
      icon: FaEye,
      color: "success",
      content: [
        "Xử lý đơn hàng và giao hàng",
        "Cải thiện dịch vụ và trải nghiệm người dùng",
        "Gửi thông báo về đơn hàng và khuyến mãi",
        "Phân tích và nghiên cứu thị trường"
      ]
    },
    {
      title: "Bảo mật thông tin",
      icon: FaLock,
      color: "warning",
      content: [
        "Mã hóa SSL/TLS cho tất cả giao dịch",
        "Lưu trữ an toàn trên server được bảo mật",
        "Không chia sẻ thông tin với bên thứ ba",
        "Tuân thủ các tiêu chuẩn bảo mật quốc tế"
      ]
    },
    {
      title: "Quyền của khách hàng",
      icon: FaUserSecret,
      color: "info",
      content: [
        "Quyền truy cập và chỉnh sửa thông tin cá nhân",
        "Quyền xóa tài khoản và dữ liệu",
        "Quyền từ chối nhận email marketing",
        "Quyền khiếu nại về việc sử dụng dữ liệu"
      ]
    }
  ];

  const cookies = [
    {
      type: "Cookies cần thiết",
      description: "Cần thiết cho website hoạt động bình thường",
      examples: ["Đăng nhập", "Giỏ hàng", "Bảo mật"],
      required: true
    },
    {
      type: "Cookies phân tích",
      description: "Giúp chúng tôi hiểu cách bạn sử dụng website",
      examples: ["Google Analytics", "Thống kê truy cập", "Phân tích hành vi"],
      required: false
    },
    {
      type: "Cookies marketing",
      description: "Để hiển thị quảng cáo phù hợp với bạn",
      examples: ["Facebook Pixel", "Google Ads", "Retargeting"],
      required: false
    }
  ];

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-5 fw-bold text-primary mb-3">
              <FaShieldAlt className="me-3" />
              Chính sách bảo mật
            </h1>
            <p className="lead text-muted">
              Cam kết bảo vệ thông tin cá nhân và quyền riêng tư của khách hàng
            </p>
          </div>
        </Col>
      </Row>

      {/* Important Notice */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Alert variant="success" className="text-center">
            <h4 className="alert-heading">
              <FaShieldAlt className="me-2" />
              Cam kết bảo mật
            </h4>
            <p className="mb-0">
              Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và tuân thủ 
              các quy định về bảo mật dữ liệu của Việt Nam.
            </p>
          </Alert>
        </Col>
      </Row>

      {/* Privacy Sections */}
      <Row className="mb-5">
        <Col>
          <h2 className="h3 fw-bold text-center text-primary mb-5">Chính sách bảo mật chi tiết</h2>
          <Row className="g-4">
            {privacySections.map((section, index) => (
              <Col key={index} lg={6} md={12}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Header className={`bg-${section.color} text-white border-0`}>
                    <h5 className="mb-0 d-flex align-items-center">
                      <section.icon className="me-2" />
                      {section.title}
                    </h5>
                  </Card.Header>
                  <Card.Body className="p-4">
                    <ul className="list-unstyled mb-0">
                      {section.content.map((item, idx) => (
                        <li key={idx} className="mb-2 d-flex align-items-start">
                          <span className="text-primary me-2">•</span>
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

      {/* Cookies Policy */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h3 className="h4 fw-bold mb-0 d-flex align-items-center">
                <FaCookie className="me-2" />
                Chính sách Cookies
              </h3>
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="g-4">
                {cookies.map((cookie, index) => (
                  <Col key={index} lg={4} md={6} sm={12}>
                    <Card className={`border-0 shadow-sm h-100 ${cookie.required ? 'bg-success bg-opacity-10' : 'bg-info bg-opacity-10'}`}>
                      <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="fw-bold mb-0">{cookie.type}</h6>
                          <span className={`badge ${cookie.required ? 'bg-success' : 'bg-info'}`}>
                            {cookie.required ? 'Bắt buộc' : 'Tùy chọn'}
                          </span>
                        </div>
                        <p className="text-muted small mb-3">{cookie.description}</p>
                        <div>
                          <strong className="small">Ví dụ:</strong>
                          <ul className="list-unstyled small text-muted mt-1">
                            {cookie.examples.map((example, idx) => (
                              <li key={idx}>• {example}</li>
                            ))}
                          </ul>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Data Protection */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-warning text-dark">
              <h4 className="mb-0">
                <FaLock className="me-2" />
                Bảo vệ dữ liệu
              </h4>
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="g-4">
                <Col md={6}>
                  <h6 className="fw-bold text-primary">Biện pháp kỹ thuật:</h6>
                  <ul className="list-unstyled small">
                    <li>• Mã hóa SSL/TLS 256-bit</li>
                    <li>• Firewall và hệ thống phát hiện xâm nhập</li>
                    <li>• Sao lưu dữ liệu định kỳ</li>
                    <li>• Kiểm tra bảo mật thường xuyên</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6 className="fw-bold text-primary">Biện pháp quản lý:</h6>
                  <ul className="list-unstyled small">
                    <li>• Đào tạo nhân viên về bảo mật</li>
                    <li>• Kiểm soát truy cập nghiêm ngặt</li>
                    <li>• Chính sách bảo mật nội bộ</li>
                    <li>• Tuân thủ pháp luật Việt Nam</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Contact & Rights */}
      <Row className="mb-5">
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0">Quyền của bạn</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <strong>Quyền truy cập:</strong> Xem thông tin cá nhân của bạn
                </li>
                <li className="mb-2">
                  <strong>Quyền chỉnh sửa:</strong> Cập nhật thông tin không chính xác
                </li>
                <li className="mb-2">
                  <strong>Quyền xóa:</strong> Yêu cầu xóa tài khoản và dữ liệu
                </li>
                <li className="mb-2">
                  <strong>Quyền từ chối:</strong> Không nhận email marketing
                </li>
                <li className="mb-0">
                  <strong>Quyền khiếu nại:</strong> Phản ánh về việc sử dụng dữ liệu
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">Liên hệ về bảo mật</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <p className="mb-3">
                Nếu bạn có thắc mắc về chính sách bảo mật hoặc muốn thực hiện 
                quyền của mình, vui lòng liên hệ:
              </p>
              <div className="mb-3">
                <FaPhone className="text-primary me-2" />
                <strong>Hotline:</strong> 1900 1234
              </div>
              <div className="mb-3">
                <FaEnvelope className="text-primary me-2" />
                <strong>Email:</strong> privacy@bookstore.vn
              </div>
              <div className="mb-0">
                <strong>Thời gian phản hồi:</strong> Trong vòng 48 giờ
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Last Updated */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 text-center">
              <p className="text-muted mb-0">
                <strong>Chính sách này được cập nhật lần cuối:</strong> 01/01/2024<br />
                Chúng tôi có thể cập nhật chính sách này và sẽ thông báo trước 30 ngày.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPage;
