import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { FaTimes, FaGift, FaClock } from 'react-icons/fa';

const PopupAdvertisement = () => {
  const [show, setShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setShow(true);
    }, 3000);

    // Countdown timer
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdown);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    setShow(false);
    // Don't show again for this session
    sessionStorage.setItem('popupAdClosed', 'true');
  };

  const handleClaimOffer = () => {
    // Redirect to special offer page
    window.location.href = '/special-offer';
  };

  // Don't show if already closed in this session
  if (sessionStorage.getItem('popupAdClosed') === 'true') {
    return null;
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      className="popup-ad-modal"
    >
      <Modal.Body className="p-0">
        <div className="popup-ad-content">
          {/* Close button */}
          <button 
            className="popup-close-btn"
            onClick={handleClose}
          >
            <FaTimes />
          </button>

          {/* Ad content */}
          <div className="popup-ad-body">
            <div className="popup-ad-header">
              <div className="popup-ad-icon">
                <FaGift />
              </div>
              <h3 className="popup-ad-title">🎉 Ưu đãi đặc biệt!</h3>
            </div>

            <div className="popup-ad-main">
              <h4 className="popup-ad-subtitle">
                Giảm giá 30% cho đơn hàng đầu tiên
              </h4>
              <p className="popup-ad-description">
                Áp dụng cho tất cả sách. Chỉ dành cho khách hàng mới.
                Không áp dụng với các khuyến mãi khác.
              </p>

              <div className="popup-ad-timer">
                <FaClock className="me-2" />
                <span>Ưu đãi kết thúc sau: <strong>{formatTime(timeLeft)}</strong></span>
              </div>

              <div className="popup-ad-code">
                <span className="code-label">Mã giảm giá:</span>
                <span className="code-value">WELCOME30</span>
              </div>
            </div>

            <div className="popup-ad-footer">
              <Button 
                variant="primary" 
                size="lg" 
                className="popup-ad-btn"
                onClick={handleClaimOffer}
              >
                Nhận ưu đãi ngay
              </Button>
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={handleClose}
                className="popup-ad-skip"
              >
                Bỏ qua
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopupAdvertisement;
