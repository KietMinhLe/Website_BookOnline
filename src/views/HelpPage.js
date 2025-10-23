import React, { useState } from 'react';
import { Container, Row, Col, Card, Accordion, Form, Button, Alert } from 'react-bootstrap';
import { FaQuestionCircle, FaSearch, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      id: 1,
      question: "Làm thế nào để đặt hàng?",
      answer: "Bạn có thể đặt hàng bằng cách: 1) Chọn sách yêu thích, 2) Thêm vào giỏ hàng, 3) Kiểm tra giỏ hàng và nhấn 'Tiến hành thanh toán', 4) Điền thông tin giao hàng và chọn phương thức thanh toán, 5) Xác nhận đơn hàng."
    },
    {
      id: 2,
      question: "Phí vận chuyển như thế nào?",
      answer: "Phí vận chuyển được tính theo khoảng cách: TP.HCM (15,000 VNĐ), Hà Nội (20,000 VNĐ), Đà Nẵng (25,000 VNĐ), các tỉnh khác (35,000 VNĐ). Miễn phí ship cho đơn hàng từ 500,000 VNĐ."
    },
    {
      id: 3,
      question: "Thời gian giao hàng bao lâu?",
      answer: "Thời gian giao hàng: TP.HCM (1-2 ngày), Hà Nội (2-3 ngày), các tỉnh khác (3-5 ngày). Chúng tôi sẽ thông báo cụ thể khi đơn hàng được xác nhận."
    },
    {
      id: 4,
      question: "Có thể đổi trả sách không?",
      answer: "Có, bạn có thể đổi trả sách trong vòng 7 ngày kể từ ngày nhận hàng với điều kiện: sách còn nguyên vẹn, không bị hỏng, có hóa đơn mua hàng."
    },
    {
      id: 5,
      question: "Phương thức thanh toán nào được hỗ trợ?",
      answer: "Chúng tôi hỗ trợ: Thanh toán khi nhận hàng (COD), Chuyển khoản ngân hàng, Thanh toán qua ví điện tử (sắp có)."
    },
    {
      id: 6,
      question: "Làm sao để theo dõi đơn hàng?",
      answer: "Bạn có thể theo dõi đơn hàng bằng cách: 1) Đăng nhập tài khoản và vào mục 'Đơn hàng của tôi', 2) Nhập mã đơn hàng vào trang theo dõi, 3) Liên hệ hotline để được hỗ trợ."
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24h.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-5 fw-bold text-primary mb-3">
              <FaQuestionCircle className="me-3" />
              Trung tâm trợ giúp
            </h1>
            <p className="lead text-muted">
              Tìm câu trả lời cho các câu hỏi thường gặp hoặc liên hệ với chúng tôi
            </p>
          </div>
        </Col>
      </Row>

      {/* Search FAQ */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h3 className="h4 fw-bold text-primary mb-3">Tìm kiếm câu hỏi</h3>
                <div className="position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Nhập từ khóa để tìm kiếm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control-lg"
                  />
                  <FaSearch className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* FAQ Section */}
      <Row className="mb-5">
        <Col>
          <h2 className="h3 fw-bold text-center text-primary mb-5">Câu hỏi thường gặp</h2>
          <Accordion defaultActiveKey="0" className="faq-accordion">
            {filteredFaqs.map((faq, index) => (
              <Accordion.Item key={faq.id} eventKey={index.toString()}>
                <Accordion.Header className="faq-header">
                  <strong>{faq.question}</strong>
                </Accordion.Header>
                <Accordion.Body className="faq-body">
                  {faq.answer}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>

      {/* Contact Section */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h3 className="h4 fw-bold mb-0">
                <FaEnvelope className="me-2" />
                Liên hệ hỗ trợ
              </h3>
            </Card.Header>
            <Card.Body className="p-4">
              <Row>
                <Col md={6}>
                  <Form onSubmit={handleContactSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Họ và tên *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Chủ đề *</Form.Label>
                      <Form.Select
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Chọn chủ đề</option>
                        <option value="order">Vấn đề đơn hàng</option>
                        <option value="shipping">Giao hàng</option>
                        <option value="payment">Thanh toán</option>
                        <option value="return">Đổi trả</option>
                        <option value="account">Tài khoản</option>
                        <option value="other">Khác</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Nội dung *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        value={contactForm.message}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                      Gửi tin nhắn
                    </Button>
                  </Form>
                </Col>
                <Col md={6}>
                  <div className="contact-info">
                    <h5 className="fw-bold mb-4">Thông tin liên hệ</h5>
                    <div className="contact-item mb-3">
                      <FaPhone className="text-primary me-2" />
                      <div>
                        <strong>Hotline:</strong><br />
                        <span className="text-muted">1900 1234</span>
                      </div>
                    </div>
                    <div className="contact-item mb-3">
                      <FaEnvelope className="text-primary me-2" />
                      <div>
                        <strong>Email:</strong><br />
                        <span className="text-muted">support@bookstore.vn</span>
                      </div>
                    </div>
                    <div className="contact-item mb-3">
                      <FaClock className="text-primary me-2" />
                      <div>
                        <strong>Giờ làm việc:</strong><br />
                        <span className="text-muted">8:00 - 22:00 (Hàng ngày)</span>
                      </div>
                    </div>
                    <Alert variant="info" className="mt-4">
                      <strong>Lưu ý:</strong> Chúng tôi sẽ phản hồi email trong vòng 24 giờ. 
                      Để được hỗ trợ nhanh nhất, vui lòng gọi hotline.
                    </Alert>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HelpPage;
