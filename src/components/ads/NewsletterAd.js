import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaArrowRight, FaCheck } from 'react-icons/fa';

const NewsletterAd = () => {
  const handleSubscribe = () => {
    // Handle newsletter subscription
    alert('Cảm ơn bạn đã đăng ký nhận tin!');
  };

  return (
    <div className="newsletter-ad">
      <Container>
        <Card className="newsletter-card">
          <Card.Body className="p-4">
            <Row className="align-items-center">
              <Col md={8}>
                <div className="newsletter-content">
                  <h3 className="newsletter-title">
                    📧 Đăng ký nhận tin khuyến mãi
                  </h3>
                  <p className="newsletter-description">
                    Nhận thông báo về các chương trình khuyến mãi đặc biệt, 
                    sách mới và ưu đãi độc quyền từ BookStore.
                  </p>
                  <div className="newsletter-benefits">
                    <div className="benefit-item">
                      <FaCheck className="text-success me-2" />
                      <span>Giảm giá 10% cho đơn hàng đầu tiên</span>
                    </div>
                    <div className="benefit-item">
                      <FaCheck className="text-success me-2" />
                      <span>Thông báo sách mới sớm nhất</span>
                    </div>
                    <div className="benefit-item">
                      <FaCheck className="text-success me-2" />
                      <span>Ưu đãi độc quyền cho thành viên</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4} className="text-center">
                <div className="newsletter-form">
                  <div className="newsletter-input-group">
                    <input 
                      type="email" 
                      placeholder="Nhập email của bạn"
                      className="newsletter-input"
                    />
                    <Button 
                      variant="primary" 
                      className="newsletter-btn"
                      onClick={handleSubscribe}
                    >
                      <FaArrowRight />
                    </Button>
                  </div>
                  <p className="newsletter-note">
                    Chúng tôi cam kết không spam email
                  </p>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default NewsletterAd;
