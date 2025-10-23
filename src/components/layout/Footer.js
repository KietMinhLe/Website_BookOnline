import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer-modern">
      <Container>
        <Row>
          {/* Company Info */}
          <Col md={4} className="mb-4">
            <div className="footer-brand mb-3">
              <span className="footer-logo">📚</span>
              <span className="footer-title">BookStore</span>
            </div>
            <p className="footer-description">
              Cửa hàng sách trực tuyến hàng đầu Việt Nam, cung cấp đa dạng các loại sách 
              với chất lượng tốt nhất và giá cả hợp lý.
            </p>
            <div className="social-links">
              <a href="https://facebook.com/bookstore.vn" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaFacebook />
              </a>
              <a href="https://twitter.com/bookstore_vn" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaTwitter />
              </a>
              <a href="https://instagram.com/bookstore.vn" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaInstagram />
              </a>
              <a href="https://youtube.com/@bookstorevn" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaYoutube />
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={2} className="mb-4">
            <h6 className="footer-heading">Liên kết nhanh</h6>
            <ul className="footer-links">
              <li>
                <button 
                  className="footer-link-btn" 
                  onClick={() => handleNavigation('/')}
                >
                  Trang chủ
                </button>
              </li>
              <li>
                <button 
                  className="footer-link-btn" 
                  onClick={() => handleNavigation('/books')}
                >
                  Sách
                </button>
              </li>
              <li>
                <button 
                  className="footer-link-btn" 
                  onClick={() => handleNavigation('/categories')}
                >
                  Danh mục
                </button>
              </li>
              <li>
                <button 
                  className="footer-link-btn" 
                  onClick={() => handleNavigation('/about')}
                >
                  Giới thiệu
                </button>
              </li>
            </ul>
          </Col>

          {/* Customer Service */}
          <Col md={3} className="mb-4">
            <h6 className="footer-heading">Hỗ trợ khách hàng</h6>
            <ul className="footer-links">
              <li>
                <button 
                  className="footer-link-btn" 
                  onClick={() => handleNavigation('/help')}
                >
                  Trung tâm trợ giúp
                </button>
              </li>
              <li>
                <button 
                  className="footer-link-btn" 
                  onClick={() => handleNavigation('/shipping')}
                >
                  Chính sách giao hàng
                </button>
              </li>
              <li>
                <button 
                  className="footer-link-btn" 
                  onClick={() => handleNavigation('/return')}
                >
                  Chính sách đổi trả
                </button>
              </li>
              <li>
                <button 
                  className="footer-link-btn" 
                  onClick={() => handleNavigation('/privacy')}
                >
                  Chính sách bảo mật
                </button>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={3} className="mb-4">
            <h6 className="footer-heading">Thông tin liên hệ</h6>
            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>123 Đường ABC, Quận XYZ, TP.HCM</span>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <span>0123 456 789</span>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>info@bookstore.com</span>
              </div>
            </div>
          </Col>
        </Row>

        <div className="footer-divider"></div>

        <Row className="footer-bottom">
          <Col md={6}>
            <p className="copyright">
              © 2024 BookStore. Tất cả quyền được bảo lưu.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="developer">
              Được phát triển với <span className="heart">❤️</span> bởi BookStore Team
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;