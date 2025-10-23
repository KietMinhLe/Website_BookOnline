import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

const AdvertisementBanner = () => {
  const [currentAd, setCurrentAd] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const advertisements = [
    {
      id: 1,
      title: "🎉 Khuyến mãi đặc biệt!",
      subtitle: "Giảm giá 50% cho tất cả sách công nghệ",
      description: "Áp dụng cho đơn hàng từ 500k. Không áp dụng với các khuyến mãi khác.",
      buttonText: "Mua ngay",
      buttonLink: "/books?category=cong-nghe",
      image: "https://via.placeholder.com/800x300/6366f1/ffffff?text=50%25+OFF",
      bgColor: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      textColor: "white"
    },
    {
      id: 2,
      title: "📚 Sách mới ra mắt",
      subtitle: "Bộ sưu tập sách mới nhất 2024",
      description: "Khám phá những cuốn sách hay nhất được phát hành trong năm nay.",
      buttonText: "Khám phá",
      buttonLink: "/books?sort=newest",
      image: "https://via.placeholder.com/800x300/ec4899/ffffff?text=New+Books+2024",
      bgColor: "linear-gradient(135deg, #ec4899, #f97316)",
      textColor: "white"
    },
    {
      id: 3,
      title: "🚚 Miễn phí vận chuyển",
      subtitle: "Giao hàng miễn phí toàn quốc",
      description: "Đơn hàng từ 300k được miễn phí vận chuyển. Áp dụng cho tất cả tỉnh thành.",
      buttonText: "Tìm hiểu thêm",
      buttonLink: "/shipping",
      image: "https://via.placeholder.com/800x300/10b981/ffffff?text=Free+Shipping",
      bgColor: "linear-gradient(135deg, #10b981, #059669)",
      textColor: "white"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % advertisements.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [advertisements.length]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const currentAdData = advertisements[currentAd];

  return (
    <div 
      className="advertisement-banner"
      style={{
        background: currentAdData.bgColor,
        color: currentAdData.textColor,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container className="py-4">
        <Row className="align-items-center">
          <Col md={8}>
            <div className="ad-content">
              <h3 className="ad-title mb-2">{currentAdData.title}</h3>
              <h4 className="ad-subtitle mb-3">{currentAdData.subtitle}</h4>
              <p className="ad-description mb-3">{currentAdData.description}</p>
              <Button 
                variant="light" 
                size="lg"
                className="ad-button"
                onClick={() => window.location.href = currentAdData.buttonLink}
              >
                {currentAdData.buttonText}
              </Button>
            </div>
          </Col>
          <Col md={4} className="text-center">
            <img 
              src={currentAdData.image} 
              alt="Advertisement" 
              className="ad-image img-fluid"
              style={{ maxHeight: '200px', borderRadius: '12px' }}
            />
          </Col>
        </Row>
      </Container>
      
      {/* Close button */}
      <button 
        className="ad-close-btn"
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        <FaTimes />
      </button>

      {/* Navigation dots */}
      <div className="ad-dots" style={{
        position: 'absolute',
        bottom: '15px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px'
      }}>
        {advertisements.map((_, index) => (
          <button
            key={index}
            className={`ad-dot ${index === currentAd ? 'active' : ''}`}
            onClick={() => setCurrentAd(index)}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              border: 'none',
              background: index === currentAd ? 'white' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AdvertisementBanner;
