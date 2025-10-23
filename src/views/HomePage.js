import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaShoppingCart } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();
  
  // Mock data for testing
  const mockBooks = [
    {
      id: 1,
      title: "Sách hay về React",
      author: "Tác giả A",
      price: 150000,
      image: "https://via.placeholder.com/300x400/6366f1/ffffff?text=React+Book",
      category: "Công nghệ",
      stock: 10,
      rating: 4.5
    },
    {
      id: 2,
      title: "JavaScript từ cơ bản",
      author: "Tác giả B", 
      price: 200000,
      image: "https://via.placeholder.com/300x400/ec4899/ffffff?text=JS+Book",
      category: "Lập trình",
      stock: 5,
      rating: 4.8
    },
    {
      id: 3,
      title: "Node.js thực hành",
      author: "Tác giả C",
      price: 180000,
      image: "https://via.placeholder.com/300x400/10b981/ffffff?text=Node+Book",
      category: "Backend",
      stock: 8,
      rating: 4.3
    },
    {
      id: 4,
      title: "CSS hiện đại",
      author: "Tác giả D",
      price: 120000,
      image: "https://via.placeholder.com/300x400/f59e0b/ffffff?text=CSS+Book",
      category: "Frontend",
      stock: 12,
      rating: 4.6
    }
  ];

  const BookCard = ({ book }) => {
    const formatPrice = (price) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price);
    };

    const handleViewDetails = () => {
      navigate(`/books/${book.id}`);
    };

    const handleAddToCart = (e) => {
      e.preventDefault();
      // Add to cart logic
      alert(`Đã thêm "${book.title}" vào giỏ hàng!`);
    };


    return (
      <Card className="h-100 book-card shadow-sm">
        <Card.Img
          variant="top"
          src={book.image}
          alt={book.title}
          style={{ height: '250px', objectFit: 'cover' }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="h6 mb-2" style={{ fontSize: '0.9rem' }}>
            {book.title}
          </Card.Title>
          <Card.Text className="text-muted small mb-2">
            Tác giả: {book.author}
          </Card.Text>
          <div className="d-flex align-items-center mb-2">
            <span className="badge bg-secondary small me-2">
              {book.category}
            </span>
            <span className="small text-muted">
              ⭐ {book.rating}
            </span>
          </div>
          <div className="mt-auto">
            <div className="h5 text-primary mb-3">
              {formatPrice(book.price)}
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                className="flex-grow-1"
                onClick={handleViewDetails}
              >
                <FaEye className="me-1" />
                Xem chi tiết
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="flex-grow-1"
                onClick={handleAddToCart}
              >
                <FaShoppingCart className="me-1" />
                Thêm vào giỏ
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={12} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4 hero-title">
                Khám phá thế giới sách
              </h1>
              <p className="lead mb-4 hero-subtitle">
                Tìm kiếm và mua sắm hàng nghìn cuốn sách với chất lượng tốt nhất 
                và giá cả hợp lý tại BookStore.
              </p>
              <Button variant="light" size="lg" as={Link} to="/books" className="btn-modern hero-btn">
                Khám phá ngay
              </Button>
            </Col>
            <Col lg={6} md={12} className="text-center">
              <div className="hero-icon">📚</div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Best Selling Books */}
      <section className="py-5">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="section-title">Sách bán chạy</h2>
              <p className="section-subtitle">Những cuốn sách được yêu thích nhất</p>
            </Col>
          </Row>
          <Row>
            {mockBooks.map(book => (
              <Col xl={3} lg={4} md={6} sm={12} className="mb-4" key={book.id}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Newest Books */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="section-title">Sách mới nhất</h2>
              <p className="section-subtitle">Những cuốn sách vừa được phát hành</p>
            </Col>
          </Row>
          <Row>
            {mockBooks.slice(0, 4).map(book => (
              <Col lg={3} md={6} className="mb-4" key={book.id}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Promotion Banner - Better Position */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="promotion-banner-large">
                <Row className="align-items-center">
                  <Col md={8}>
                    <div className="promotion-content">
                      <h3 className="promotion-title mb-2">🎉 Khuyến mãi đặc biệt</h3>
                      <h4 className="promotion-subtitle mb-3">Giảm giá 20% cho đơn hàng từ 500k</h4>
                      <p className="promotion-description mb-3">
                        Áp dụng cho tất cả sách. Không áp dụng với các khuyến mãi khác. 
                        Thời gian có hạn - đừng bỏ lỡ cơ hội này!
                      </p>
                      <div className="promotion-features">
                        <span className="feature-badge">✓ Miễn phí vận chuyển</span>
                        <span className="feature-badge">✓ Đổi trả trong 7 ngày</span>
                        <span className="feature-badge">✓ Sách chính hãng</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={4} className="text-center">
                    <div className="promotion-visual">
                      <div className="discount-circle">
                        <span className="discount-text">20%</span>
                        <span className="discount-label">OFF</span>
                      </div>
                      <Button 
                        variant="primary" 
                        size="lg" 
                        className="promotion-btn"
                        onClick={() => {
                          navigate('/books');
                          window.scrollTo(0, 0);
                        }}
                      >
                        Mua ngay
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* All Books */}
      <section className="py-5">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="section-title">Tất cả sách</h2>
              <p className="section-subtitle">Khám phá bộ sưu tập sách đa dạng của chúng tôi</p>
            </Col>
          </Row>
          <Row>
            {mockBooks.map(book => (
              <Col xl={3} lg={4} md={6} sm={12} className="mb-4" key={book.id}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
          <Row>
            <Col className="text-center">
              <Button variant="outline-primary" as={Link} to="/books">
                Xem tất cả sách
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features */}
      <section className="py-5 hero-section text-white">
        <Container>
          <Row>
            <Col lg={4} md={6} sm={12} className="text-center mb-4">
              <div className="feature-icon mb-3">🚚</div>
              <h4 className="fw-bold">Giao hàng nhanh</h4>
              <p className="opacity-90">Giao hàng trong 24h tại TP.HCM</p>
            </Col>
            <Col lg={4} md={6} sm={12} className="text-center mb-4">
              <div className="feature-icon mb-3">💎</div>
              <h4 className="fw-bold">Chất lượng tốt</h4>
              <p className="opacity-90">Sách chính hãng, chất lượng cao</p>
            </Col>
            <Col lg={4} md={6} sm={12} className="text-center mb-4">
              <div className="feature-icon mb-3">🛡️</div>
              <h4 className="fw-bold">Bảo hành</h4>
              <p className="opacity-90">Đổi trả miễn phí trong 7 ngày</p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;