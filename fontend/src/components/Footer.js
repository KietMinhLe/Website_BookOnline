import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Main Footer Section */}
        <div className="footer-main">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 7h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 11h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 15h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="footer-logo-text">
                  <span className="logo-name">BookStore</span>
                  <span className="logo-tagline">Your Gateway to Knowledge</span>
                </div>
              </div>
              <p className="footer-description">
                Khám phá thế giới tri thức với hàng ngàn đầu sách chất lượng cao. 
                Chúng tôi cam kết mang đến trải nghiệm mua sắm tuyệt vời nhất.
              </p>
              <div className="social-links">
                <a href="https://facebook.com" className="social-link facebook" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" className="social-link instagram" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" className="social-link twitter" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://t.me" className="social-link telegram" aria-label="Telegram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="footer-title">
                <span className="title-icon">📚</span>
                Liên kết nhanh
              </h3>
              <ul className="footer-links">
                <li>
                  <Link to="/" className="footer-link">
                    <span className="link-icon">🏠</span>
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="footer-link">
                    <span className="link-icon">📖</span>
                    Danh mục sách
                  </Link>
                </li>
                <li>
                  <Link to="/bestsellers" className="footer-link">
                    <span className="link-icon">🔥</span>
                    Sách bán chạy
                  </Link>
                </li>
                <li>
                  <Link to="/new-releases" className="footer-link">
                    <span className="link-icon">✨</span>
                    Sách mới
                  </Link>
                </li>
                <li>
                  <Link to="/promotions" className="footer-link">
                    <span className="link-icon">🎉</span>
                    Khuyến mãi
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Support */}
            <div className="footer-section">
              <h3 className="footer-title">
                <span className="title-icon">🛠️</span>
                Hỗ trợ khách hàng
              </h3>
              <ul className="footer-links">
                <li>
                  <Link to="/help" className="footer-link">
                    <span className="link-icon">❓</span>
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="footer-link">
                    <span className="link-icon">🚚</span>
                    Vận chuyển
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="footer-link">
                    <span className="link-icon">↩️</span>
                    Đổi trả hàng
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="footer-link">
                    <span className="link-icon">📞</span>
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="footer-link">
                    <span className="link-icon">💬</span>
                    Câu hỏi thường gặp
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h3 className="footer-title">
                <span className="title-icon">📍</span>
                Thông tin liên hệ
              </h3>
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">Hotline</span>
                    <span className="contact-value">1900 1234</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">Email</span>
                    <span className="contact-value">support@bookstore.vn</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">Địa chỉ</span>
                    <span className="contact-value">Cao Lỗ, Q8, TP.HCM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h4>📧 Đăng ký nhận tin</h4>
              <p>Nhận thông tin về sách mới và ưu đãi đặc biệt</p>
            </div>
            <div className="newsletter-form">
              <input type="email" placeholder="Nhập email của bạn..." className="newsletter-input" />
              <button className="newsletter-button">
                <span>Đăng ký</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright-section">
              <p className="copyright">
                © 2024 <span className="brand-name">BookStore</span>. Tất cả quyền được bảo lưu.
              </p>
              <p className="made-with">
                Made with ❤️ in Vietnam
              </p>
            </div>
            <div className="footer-policies">
              <Link to="/privacy" className="policy-link">
                Chính sách bảo mật
              </Link>
              <Link to="/terms" className="policy-link">
                Điều khoản sử dụng
              </Link>
              <Link to="/cookies" className="policy-link">
                Chính sách cookie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;