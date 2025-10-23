import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert, Form, InputGroup, Tab, Tabs } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaShare, FaArrowLeft, FaMinus, FaPlus, FaEye } from 'react-icons/fa';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Mock data for books
  const mockBooks = [
    {
      id: 1,
      title: "Sách hay về React",
      author: "Tác giả A",
      price: 150000,
      originalPrice: 180000,
      discount: 17,
      image: "https://via.placeholder.com/400x600/6366f1/ffffff?text=React+Book",
      images: [
        "https://via.placeholder.com/400x600/6366f1/ffffff?text=React+Book",
        "https://via.placeholder.com/400x600/8b5cf6/ffffff?text=React+Book+2",
        "https://via.placeholder.com/400x600/ec4899/ffffff?text=React+Book+3"
      ],
      category: "Công nghệ",
      stock: 10,
      rating: 4.5,
      reviews: 89,
      pages: 320,
      language: "Tiếng Việt",
      publisher: "NXB Công nghệ",
      publishDate: "2024-01-15",
      isbn: "978-1234567890",
      description: "Hướng dẫn toàn diện về React.js từ cơ bản đến nâng cao. Cuốn sách này sẽ giúp bạn nắm vững các khái niệm cốt lõi của React.",
      detailedDescription: `
        <h4>Nội dung chính của cuốn sách:</h4>
        <ul>
          <li><strong>Chương 1-3:</strong> Giới thiệu React và thiết lập môi trường phát triển</li>
          <li><strong>Chương 4-6:</strong> Components và JSX cơ bản</li>
          <li><strong>Chương 7-9:</strong> State và Props management</li>
          <li><strong>Chương 10-12:</strong> React Hooks (useState, useEffect, useContext)</li>
        </ul>
        
        <h4>Đối tượng độc giả:</h4>
        <p>Cuốn sách phù hợp cho:</p>
        <ul>
          <li>Developers mới bắt đầu với React</li>
          <li>Frontend developers muốn nâng cao kỹ năng</li>
          <li>Sinh viên ngành Công nghệ thông tin</li>
        </ul>
      `,
      specifications: {
        "Kích thước": "16 x 24 cm",
        "Số trang": "320 trang",
        "Loại bìa": "Bìa mềm",
        "Ngôn ngữ": "Tiếng Việt",
        "Nhà xuất bản": "NXB Công nghệ",
        "Ngày phát hành": "15/01/2024",
        "ISBN": "978-1234567890",
        "Trọng lượng": "450g"
      },
      reviews: [
        {
          id: 1,
          user: "Nguyễn Văn A",
          rating: 5,
          date: "2024-01-20",
          comment: "Cuốn sách rất hay và chi tiết. Tôi đã học được rất nhiều từ cuốn sách này."
        },
        {
          id: 2,
          user: "Trần Thị B",
          rating: 4,
          date: "2024-01-18",
          comment: "Nội dung tốt nhưng có một số phần hơi khó hiểu với người mới bắt đầu."
        }
      ],
      relatedBooks: [
        {
          id: 2,
          title: "JavaScript từ cơ bản",
          author: "Tác giả B",
          price: 200000,
          image: "https://via.placeholder.com/200x300/ec4899/ffffff?text=JS+Book",
          rating: 4.8
        },
        {
          id: 3,
          title: "Node.js thực hành",
          author: "Tác giả C",
          price: 180000,
          image: "https://via.placeholder.com/200x300/10b981/ffffff?text=Node+Book",
          rating: 4.3
        },
        {
          id: 4,
          title: "CSS hiện đại",
          author: "Tác giả D",
          price: 120000,
          image: "https://via.placeholder.com/200x300/f59e0b/ffffff?text=CSS+Book",
          rating: 4.6
        }
      ]
    },
    {
      id: 2,
      title: "JavaScript từ cơ bản",
      author: "Tác giả B",
      price: 200000,
      originalPrice: 250000,
      discount: 20,
      image: "https://via.placeholder.com/400x600/ec4899/ffffff?text=JS+Book",
      images: [
        "https://via.placeholder.com/400x600/ec4899/ffffff?text=JS+Book",
        "https://via.placeholder.com/400x600/8b5cf6/ffffff?text=JS+Book+2"
      ],
      category: "Lập trình",
      stock: 5,
      rating: 4.8,
      reviews: 156,
      pages: 480,
      language: "Tiếng Việt",
      publisher: "NXB Lập trình",
      publishDate: "2024-01-10",
      isbn: "978-1234567891",
      description: "Cuốn sách JavaScript từ cơ bản đến nâng cao, phù hợp cho người mới bắt đầu học lập trình web.",
      detailedDescription: `
        <h4>Nội dung chính:</h4>
        <ul>
          <li><strong>Chương 1-4:</strong> JavaScript cơ bản và cú pháp</li>
          <li><strong>Chương 5-8:</strong> DOM manipulation và Events</li>
          <li><strong>Chương 9-12:</strong> ES6+ và Modern JavaScript</li>
          <li><strong>Chương 13-16:</strong> Async programming và APIs</li>
        </ul>
      `,
      specifications: {
        "Kích thước": "16 x 24 cm",
        "Số trang": "480 trang",
        "Loại bìa": "Bìa mềm",
        "Ngôn ngữ": "Tiếng Việt",
        "Nhà xuất bản": "NXB Lập trình",
        "Ngày phát hành": "10/01/2024",
        "ISBN": "978-1234567891",
        "Trọng lượng": "680g"
      },
      reviews: [
        {
          id: 1,
          user: "Lê Văn C",
          rating: 5,
          date: "2024-01-15",
          comment: "Tuyệt vời! Tác giả giải thích rất rõ ràng và có nhiều ví dụ thực tế."
        }
      ],
      relatedBooks: [
        {
          id: 1,
          title: "Sách hay về React",
          author: "Tác giả A",
          price: 150000,
          image: "https://via.placeholder.com/200x300/6366f1/ffffff?text=React+Book",
          rating: 4.5
        },
        {
          id: 3,
          title: "Node.js thực hành",
          author: "Tác giả C",
          price: 180000,
          image: "https://via.placeholder.com/200x300/10b981/ffffff?text=Node+Book",
          rating: 4.3
        }
      ]
    },
    {
      id: 3,
      title: "Node.js thực hành",
      author: "Tác giả C",
      price: 180000,
      originalPrice: 220000,
      discount: 18,
      image: "https://via.placeholder.com/400x600/10b981/ffffff?text=Node+Book",
      images: [
        "https://via.placeholder.com/400x600/10b981/ffffff?text=Node+Book",
        "https://via.placeholder.com/400x600/8b5cf6/ffffff?text=Node+Book+2"
      ],
      category: "Backend",
      stock: 8,
      rating: 4.3,
      reviews: 67,
      pages: 380,
      language: "Tiếng Việt",
      publisher: "NXB Backend",
      publishDate: "2024-01-05",
      isbn: "978-1234567892",
      description: "Hướng dẫn thực hành Node.js từ cơ bản đến nâng cao, xây dựng ứng dụng web server.",
      detailedDescription: `
        <h4>Nội dung chính:</h4>
        <ul>
          <li><strong>Chương 1-3:</strong> Giới thiệu Node.js và NPM</li>
          <li><strong>Chương 4-6:</strong> Express.js và RESTful APIs</li>
          <li><strong>Chương 7-9:</strong> Database và Authentication</li>
          <li><strong>Chương 10-12:</strong> Deployment và Performance</li>
        </ul>
      `,
      specifications: {
        "Kích thước": "16 x 24 cm",
        "Số trang": "380 trang",
        "Loại bìa": "Bìa mềm",
        "Ngôn ngữ": "Tiếng Việt",
        "Nhà xuất bản": "NXB Backend",
        "Ngày phát hành": "05/01/2024",
        "ISBN": "978-1234567892",
        "Trọng lượng": "520g"
      },
      reviews: [
        {
          id: 1,
          user: "Phạm Thị D",
          rating: 4,
          date: "2024-01-12",
          comment: "Sách hay, có nhiều ví dụ thực tế."
        }
      ],
      relatedBooks: [
        {
          id: 1,
          title: "Sách hay về React",
          author: "Tác giả A",
          price: 150000,
          image: "https://via.placeholder.com/200x300/6366f1/ffffff?text=React+Book",
          rating: 4.5
        },
        {
          id: 2,
          title: "JavaScript từ cơ bản",
          author: "Tác giả B",
          price: 200000,
          image: "https://via.placeholder.com/200x300/ec4899/ffffff?text=JS+Book",
          rating: 4.8
        }
      ]
    },
    {
      id: 4,
      title: "CSS hiện đại",
      author: "Tác giả D",
      price: 120000,
      originalPrice: 150000,
      discount: 20,
      image: "https://via.placeholder.com/400x600/f59e0b/ffffff?text=CSS+Book",
      images: [
        "https://via.placeholder.com/400x600/f59e0b/ffffff?text=CSS+Book",
        "https://via.placeholder.com/400x600/8b5cf6/ffffff?text=CSS+Book+2"
      ],
      category: "Frontend",
      stock: 12,
      rating: 4.6,
      reviews: 98,
      pages: 280,
      language: "Tiếng Việt",
      publisher: "NXB Frontend",
      publishDate: "2024-01-08",
      isbn: "978-1234567893",
      description: "Cuốn sách về CSS hiện đại với Flexbox, Grid và các tính năng mới nhất của CSS.",
      detailedDescription: `
        <h4>Nội dung chính:</h4>
        <ul>
          <li><strong>Chương 1-3:</strong> CSS cơ bản và Selectors</li>
          <li><strong>Chương 4-6:</strong> Flexbox và Grid Layout</li>
          <li><strong>Chương 7-9:</strong> Animations và Transitions</li>
          <li><strong>Chương 10-12:</strong> Responsive Design</li>
        </ul>
      `,
      specifications: {
        "Kích thước": "16 x 24 cm",
        "Số trang": "280 trang",
        "Loại bìa": "Bìa mềm",
        "Ngôn ngữ": "Tiếng Việt",
        "Nhà xuất bản": "NXB Frontend",
        "Ngày phát hành": "08/01/2024",
        "ISBN": "978-1234567893",
        "Trọng lượng": "380g"
      },
      reviews: [
        {
          id: 1,
          user: "Hoàng Văn E",
          rating: 5,
          date: "2024-01-14",
          comment: "Sách rất hữu ích cho việc học CSS hiện đại."
        }
      ],
      relatedBooks: [
        {
          id: 1,
          title: "Sách hay về React",
          author: "Tác giả A",
          price: 150000,
          image: "https://via.placeholder.com/200x300/6366f1/ffffff?text=React+Book",
          rating: 4.5
        },
        {
          id: 2,
          title: "JavaScript từ cơ bản",
          author: "Tác giả B",
          price: 200000,
          image: "https://via.placeholder.com/200x300/ec4899/ffffff?text=JS+Book",
          rating: 4.8
        }
      ]
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Tạm thời không tìm sách, luôn hiển thị thông báo không tồn tại
      setBook(null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= book.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic
    alert(`Đã thêm ${quantity} cuốn "${book.title}" vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    // Buy now logic
    navigate('/checkout');
  };

  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist);
    alert(isInWishlist ? 'Đã xóa khỏi danh sách yêu thích' : 'Đã thêm vào danh sách yêu thích');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: book.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã copy link vào clipboard!');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const renderStars = (rating) => {
    const numRating = Number(rating) || 0;
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={index < Math.floor(numRating) ? 'text-warning' : 'text-muted'}
      />
    ));
  };

  const renderReviews = () => {
    if (!book.reviews || !Array.isArray(book.reviews) || book.reviews.length === 0) {
      return (
        <div className="text-center py-4">
          <p className="text-muted">Chưa có đánh giá nào</p>
        </div>
      );
    }

    return (
      <div>
        {book.reviews.map((review, index) => {
          if (!review || typeof review !== 'object') {
            return null;
          }
          
          return (
            <div key={review.id || index} className="border-bottom pb-3 mb-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="mb-1">{review.user || 'Người dùng'}</h6>
                  <div className="d-flex align-items-center">
                    {renderStars(review.rating || 0)}
                    <span className="ms-2 text-muted small">{review.date || 'N/A'}</span>
                  </div>
                </div>
              </div>
              <p className="mb-0">{review.comment || 'Không có bình luận'}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const renderRelatedBooks = () => {
    if (!book.relatedBooks || !Array.isArray(book.relatedBooks) || book.relatedBooks.length === 0) {
      return (
        <div className="text-center py-4">
          <p className="text-muted">Không có sách liên quan</p>
        </div>
      );
    }

    return (
      <Row className="g-4">
        {book.relatedBooks.map((relatedBook, index) => {
          if (!relatedBook || typeof relatedBook !== 'object') {
            return null;
          }
          
          return (
            <Col key={relatedBook.id || index} lg={3} md={4} sm={6}>
              <Card className="h-100 book-card shadow-sm">
                <Link to={`/books/${relatedBook.id}`} className="text-decoration-none">
                  <Card.Img
                    variant="top"
                    src={relatedBook.image || 'https://via.placeholder.com/200x300'}
                    alt={relatedBook.title || 'Sách'}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="h6 mb-2" style={{ fontSize: '0.9rem' }}>
                      {relatedBook.title || 'Không có tiêu đề'}
                    </Card.Title>
                    <Card.Text className="text-muted small mb-2">
                      Tác giả: {relatedBook.author || 'Không có tác giả'}
                    </Card.Text>
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex align-items-center me-2">
                        <FaStar className="text-warning me-1" />
                        <span className="small">{relatedBook.rating || 0}</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <div className="h6 text-primary mb-3">
                        {formatPrice(relatedBook.price || 0)}
                      </div>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="w-100"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/books/${relatedBook.id}`);
                        }}
                      >
                        <FaEye className="me-1" />
                        Xem chi tiết
                      </Button>
                    </div>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <Alert.Heading>Sách không tồn tại hoặc chưa có dữ liệu</Alert.Heading>
          <p>Sách bạn đang tìm kiếm hiện tại không có sẵn hoặc chưa được cập nhật dữ liệu.</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="primary" as={Link} to="/books">
              <FaArrowLeft className="me-2" />
              Quay lại danh sách sách
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/books">Sách</Link>
          </li>
          <li className="breadcrumb-item active">{book.title}</li>
        </ol>
      </nav>

      <Row>
        {/* Book Images */}
        <Col lg={5} className="mb-4">
          <Card className="border-0">
            <div className="text-center mb-3">
              <img
                src={book.images && book.images[selectedImage] ? book.images[selectedImage] : book.image}
                alt={book.title}
                className="img-fluid rounded shadow"
                style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
            </div>
            {book.images && book.images.length > 1 && (
              <div className="d-flex justify-content-center gap-2">
                {book.images.map((img, index) => (
                  <button
                    key={index}
                    className={`btn btn-outline-secondary btn-sm ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                    style={{ width: '60px', height: '60px', padding: 0 }}
                  >
                    <img
                      src={img}
                      alt={`${book.title} ${index + 1}`}
                      className="img-fluid rounded"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </Card>
        </Col>

        {/* Book Info */}
        <Col lg={7}>
          <div className="mb-4">
            <h1 className="h2 fw-bold mb-3">{book.title}</h1>
            
            <div className="d-flex align-items-center mb-3">
              <div className="d-flex align-items-center me-3">
                {renderStars(book.rating)}
                <span className="ms-2 fw-bold">{book.rating}</span>
                <span className="text-muted ms-1">({book.reviews} đánh giá)</span>
              </div>
              <Badge bg="secondary" className="me-3">
                {book.category}
              </Badge>
              <span className="text-muted">Tác giả: {book.author}</span>
            </div>

            <div className="mb-3">
              <div className="d-flex align-items-center">
                <span className="h3 text-primary me-3">
                  {formatPrice(book.price)}
                </span>
                {book.originalPrice && (
                  <>
                    <span className="text-muted text-decoration-line-through me-2">
                      {formatPrice(book.originalPrice)}
                    </span>
                    <Badge bg="danger">
                      -{book.discount}%
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-muted">{book.description}</p>
            </div>

            {/* Stock Status */}
            <div className="mb-4">
              {book.stock > 0 ? (
                <Badge bg="success" className="fs-6">
                  Còn hàng ({book.stock} cuốn)
                </Badge>
              ) : (
                <Badge bg="danger" className="fs-6">
                  Hết hàng
                </Badge>
              )}
            </div>

            {/* Quantity and Actions */}
            {book.stock > 0 && (
              <div className="mb-4">
                <Row className="align-items-center">
                  <Col md={4}>
                    <Form.Label>Số lượng:</Form.Label>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                      >
                        <FaMinus />
                      </Button>
                      <Form.Control
                        type="number"
                        min="1"
                        max={book.stock}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        className="mx-2 text-center"
                        style={{ maxWidth: '80px' }}
                      />
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= book.stock}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </Col>
                  <Col md={8}>
                    <div className="d-flex gap-2">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleAddToCart}
                        className="flex-grow-1"
                      >
                        <FaShoppingCart className="me-2" />
                        Thêm vào giỏ hàng
                      </Button>
                      <Button
                        variant="success"
                        size="lg"
                        onClick={handleBuyNow}
                        className="flex-grow-1"
                      >
                        Mua ngay
                      </Button>
                    </div>
                    <div className="d-flex gap-2 mt-2">
                      <Button
                        variant={isInWishlist ? "danger" : "outline-danger"}
                        size="sm"
                        onClick={handleAddToWishlist}
                        className="flex-grow-1"
                      >
                        <FaHeart className="me-1" />
                        {isInWishlist ? 'Đã yêu thích' : 'Yêu thích'}
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={handleShare}
                        className="flex-grow-1"
                      >
                        <FaShare className="me-1" />
                        Chia sẻ
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            )}

            {/* Book Details */}
            <Card className="mt-4">
              <Card.Header>
                <h5 className="mb-0">Thông tin chi tiết</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  {book.specifications && Object.entries(book.specifications).map(([key, value]) => (
                    <Col md={6} key={key}>
                      <p><strong>{key}:</strong> {value || 'N/A'}</p>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>

      {/* Tabs Section */}
      <Row className="mt-5">
        <Col>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
          >
            <Tab eventKey="description" title="Mô tả chi tiết">
              <Card>
                <Card.Body>
                  <div dangerouslySetInnerHTML={{ __html: book.detailedDescription || 'Không có mô tả chi tiết' }} />
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="reviews" title={`Đánh giá (${book.reviews ? book.reviews.length : 0})`}>
              <Card>
                <Card.Body>
                  {renderReviews()}
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>

      {/* Related Books */}
      <Row className="mt-5">
        <Col>
          <h3 className="h4 fw-bold text-primary mb-4">Sách liên quan</h3>
          {renderRelatedBooks()}
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetailPage;