import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaStar, FaShoppingCart, FaEye } from 'react-icons/fa';

const ProductAdCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Card className="product-ad-card h-100">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Badge 
          bg="danger" 
          className="position-absolute top-0 end-0 m-2 ad-badge"
        >
          {product.discount}% OFF
        </Badge>
        <div className="ad-overlay">
          <div className="ad-overlay-content">
            <Button variant="light" size="sm" className="me-2">
              <FaEye />
            </Button>
            <Button variant="primary" size="sm">
              <FaShoppingCart />
            </Button>
          </div>
        </div>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6 mb-2">{product.title}</Card.Title>
        <Card.Text className="text-muted small mb-2">
          Tác giả: {product.author}
        </Card.Text>
        <div className="d-flex align-items-center mb-2">
          <div className="d-flex align-items-center me-2">
            <FaStar className="text-warning me-1" />
            <span className="small">{product.rating}</span>
          </div>
          <Badge bg="secondary" className="small">
            {product.category}
          </Badge>
        </div>
        <div className="mt-auto">
          <div className="d-flex align-items-center mb-2">
            <span className="h6 text-primary me-2">
              {formatPrice(product.salePrice)}
            </span>
            <span className="text-muted text-decoration-line-through small">
              {formatPrice(product.originalPrice)}
            </span>
          </div>
          <Button variant="primary" size="sm" className="w-100">
            Mua ngay
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

const ProductAdvertisement = () => {
  const featuredProducts = [
    {
      id: 1,
      title: "React.js Complete Guide",
      author: "Maximilian Schwarzmüller",
      originalPrice: 500000,
      salePrice: 250000,
      discount: 50,
      image: "https://via.placeholder.com/300x200/6366f1/ffffff?text=React+Guide",
      category: "Công nghệ",
      rating: 4.8
    },
    {
      id: 2,
      title: "JavaScript ES6+ Mastery",
      author: "Kyle Simpson",
      originalPrice: 400000,
      salePrice: 200000,
      discount: 50,
      image: "https://via.placeholder.com/300x200/ec4899/ffffff?text=JS+ES6",
      category: "Lập trình",
      rating: 4.9
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      author: "Andrew Mead",
      originalPrice: 450000,
      salePrice: 225000,
      discount: 50,
      image: "https://via.placeholder.com/300x200/10b981/ffffff?text=Node.js",
      category: "Backend",
      rating: 4.7
    },
    {
      id: 4,
      title: "CSS Grid & Flexbox",
      author: "Jen Simmons",
      originalPrice: 350000,
      salePrice: 175000,
      discount: 50,
      image: "https://via.placeholder.com/300x200/f59e0b/ffffff?text=CSS+Grid",
      category: "Frontend",
      rating: 4.6
    }
  ];

  return (
    <div className="product-advertisement py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">🔥 Sản phẩm khuyến mãi</h2>
          <p className="section-subtitle">Những cuốn sách đang được giảm giá đặc biệt</p>
        </div>
        
        <Row>
          {featuredProducts.map(product => (
            <Col lg={3} md={6} className="mb-4" key={product.id}>
              <ProductAdCard product={product} />
            </Col>
          ))}
        </Row>
        
        <div className="text-center mt-4">
          <Button variant="outline-primary" size="lg">
            Xem tất cả sản phẩm khuyến mãi
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ProductAdvertisement;
