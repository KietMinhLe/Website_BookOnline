import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert, Form, InputGroup, Pagination } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaEye, FaSearch, FaFilter, FaSort } from 'react-icons/fa';

const BooksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState('title-asc');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(12);

  // Mock data for books
  const mockBooks = [
    {
      id: 1,
      title: "React.js Complete Guide",
      author: "Maximilian Schwarzmüller",
      price: 500000,
      image: "https://via.placeholder.com/300x400/6366f1/ffffff?text=React+Guide",
      category: "Công nghệ",
      stock: 10,
      rating: 4.8,
      description: "Hướng dẫn toàn diện về React.js từ cơ bản đến nâng cao"
    },
    {
      id: 2,
      title: "JavaScript ES6+ Mastery",
      author: "Kyle Simpson",
      price: 400000,
      image: "https://via.placeholder.com/300x400/ec4899/ffffff?text=JS+ES6",
      category: "Lập trình",
      stock: 5,
      rating: 4.9,
      description: "Nắm vững JavaScript ES6 và các tính năng mới nhất"
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      author: "Andrew Mead",
      price: 450000,
      image: "https://via.placeholder.com/300x400/10b981/ffffff?text=Node.js",
      category: "Backend",
      stock: 8,
      rating: 4.7,
      description: "Xây dựng ứng dụng backend với Node.js và Express"
    },
    {
      id: 4,
      title: "CSS Grid & Flexbox",
      author: "Jen Simmons",
      price: 350000,
      image: "https://via.placeholder.com/300x400/f59e0b/ffffff?text=CSS+Grid",
      category: "Frontend",
      stock: 12,
      rating: 4.6,
      description: "Layout hiện đại với CSS Grid và Flexbox"
    },
    {
      id: 5,
      title: "Python for Data Science",
      author: "Wes McKinney",
      price: 600000,
      image: "https://via.placeholder.com/300x400/8b5cf6/ffffff?text=Python+DS",
      category: "Data Science",
      stock: 7,
      rating: 4.9,
      description: "Phân tích dữ liệu với Python và các thư viện chuyên dụng"
    },
    {
      id: 6,
      title: "Machine Learning Basics",
      author: "Andrew Ng",
      price: 700000,
      image: "https://via.placeholder.com/300x400/ef4444/ffffff?text=ML+Basics",
      category: "AI/ML",
      stock: 3,
      rating: 4.8,
      description: "Nhập môn Machine Learning từ giáo sư Stanford"
    },
    {
      id: 7,
      title: "Vue.js 3 Complete Guide",
      author: "Evan You",
      price: 480000,
      image: "https://via.placeholder.com/300x400/06b6d4/ffffff?text=Vue+3",
      category: "Frontend",
      stock: 9,
      rating: 4.7,
      description: "Hướng dẫn Vue.js 3 với Composition API"
    },
    {
      id: 8,
      title: "Docker & Kubernetes",
      author: "Nigel Poulton",
      price: 550000,
      image: "https://via.placeholder.com/300x400/84cc16/ffffff?text=Docker+K8s",
      category: "DevOps",
      stock: 6,
      rating: 4.5,
      description: "Containerization và orchestration với Docker và Kubernetes"
    }
  ];

  const categories = [
    'Tất cả',
    'Công nghệ',
    'Lập trình',
    'Frontend',
    'Backend',
    'Data Science',
    'AI/ML',
    'DevOps'
  ];

  // Lấy danh sách tác giả từ mockBooks
  const authors = ['Tất cả', ...new Set(mockBooks.map(book => book.author))];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filteredBooks = [...mockBooks];

      // Filter by search query
      if (searchQuery) {
        filteredBooks = filteredBooks.filter(book =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Filter by category
      if (category) {
        filteredBooks = filteredBooks.filter(book => book.category === category);
      }

      // Filter by author
      if (author) {
        filteredBooks = filteredBooks.filter(book => book.author === author);
      }

      // Filter by price range
      filteredBooks = filteredBooks.filter(book =>
        book.price >= priceRange.min && book.price <= priceRange.max
      );

      // Sort books
      filteredBooks.sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'title-asc':
            return a.title.localeCompare(b.title);
          case 'title-desc':
            return b.title.localeCompare(a.title);
          case 'rating-desc':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });

      setBooks(filteredBooks);
      setLoading(false);
    }, 500);
  }, [searchQuery, category, author, priceRange, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
    setCurrentPage(1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const BookCard = ({ book }) => {
    const handleAddToCart = () => {
      // Add to cart logic
      alert(`Đã thêm "${book.title}" vào giỏ hàng!`);
    };

    return (
      <Card className="h-100 book-card shadow-sm">
        <div className="position-relative">
          <Card.Img
            variant="top"
            src={book.image}
            alt={book.title}
            style={{ height: '250px', objectFit: 'cover' }}
          />
          {book.stock < 5 && (
            <Badge bg="warning" className="position-absolute top-0 end-0 m-2">
              Sắp hết hàng
            </Badge>
          )}
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="h6 mb-2" style={{ fontSize: '0.9rem' }}>
            {book.title}
          </Card.Title>
          <Card.Text className="text-muted small mb-2">
            Tác giả: {book.author}
          </Card.Text>
          <div className="d-flex align-items-center mb-2">
            <div className="d-flex align-items-center me-2">
              <FaStar className="text-warning me-1" />
              <span className="small">{book.rating}</span>
            </div>
            <Badge bg="secondary" className="small">
              {book.category}
            </Badge>
          </div>
          <div className="mt-auto">
            <div className="h5 text-primary mb-3">
              {formatPrice(book.price)}
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                as={Link}
                to={`/books/${book.id}`}
                className="flex-grow-1"
              >
                <FaEye className="me-1" />
                Xem
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddToCart}
                disabled={book.stock === 0}
                className="flex-grow-1"
              >
                <FaShoppingCart className="me-1" />
                Mua
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="h2 fw-bold">Danh sách sách</h1>
          <p className="text-muted">Khám phá bộ sưu tập sách đa dạng của chúng tôi</p>
        </Col>
      </Row>

      {/* Search and Filters */}
      <Row className="mb-4">
        <Col lg={4} md={6} sm={12} className="mb-3">
          <Form onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Tìm kiếm theo tên sách, tác giả hoặc mô tả..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="primary" type="submit">
                <FaSearch />
              </Button>
            </InputGroup>
          </Form>
        </Col>
        <Col lg={2} md={3} sm={6} className="mb-3">
          <Form.Select value={category} onChange={handleCategoryChange}>
            <option value="">Tất cả danh mục</option>
            {categories.slice(1).map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col lg={2} md={3} sm={6} className="mb-3">
          <Form.Select value={author} onChange={handleAuthorChange}>
            <option value="">Tất cả tác giả</option>
            {authors.slice(1).map(auth => (
              <option key={auth} value={auth}>
                {auth}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col lg={2} md={3} sm={6} className="mb-3">
          <Form.Select value={sortBy} onChange={handleSortChange}>
            <option value="title-asc">Tên A-Z</option>
            <option value="title-desc">Tên Z-A</option>
            <option value="price-asc">Giá thấp đến cao</option>
            <option value="price-desc">Giá cao đến thấp</option>
            <option value="rating-desc">Đánh giá cao nhất</option>
          </Form.Select>
        </Col>
        <Col lg={2} md={3} sm={6} className="mb-3">
          <Button variant="outline-secondary" className="w-100 filter-btn">
            <FaFilter className="me-1" />
            Lọc
          </Button>
        </Col>
      </Row>

      {/* Popular Authors */}
      <Row className="mb-3">
        <Col>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span className="small text-muted me-2">Tác giả phổ biến:</span>
            {authors.slice(1, 6).map(auth => (
              <Button
                key={auth}
                variant={author === auth ? "primary" : "outline-secondary"}
                size="sm"
                onClick={() => {
                  setAuthor(author === auth ? '' : auth);
                  setCurrentPage(1);
                }}
                className="mb-1"
              >
                {auth}
              </Button>
            ))}
            {authors.length > 6 && (
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => {
                  setAuthor('');
                  setCurrentPage(1);
                }}
                className="mb-1"
              >
                Xem tất cả
              </Button>
            )}
          </div>
        </Col>
      </Row>

      {/* Price Range Filter */}
      <Row className="mb-4">
        <Col md={6}>
          <div className="d-flex align-items-center gap-3">
            <span className="small text-muted">Khoảng giá:</span>
            <Form.Control
              type="number"
              name="min"
              placeholder="Từ"
              value={priceRange.min}
              onChange={handlePriceRangeChange}
              style={{ maxWidth: '100px' }}
            />
            <span className="text-muted">-</span>
            <Form.Control
              type="number"
              name="max"
              placeholder="Đến"
              value={priceRange.max}
              onChange={handlePriceRangeChange}
              style={{ maxWidth: '100px' }}
            />
            <span className="small text-muted">VNĐ</span>
          </div>
        </Col>
      </Row>

      {/* Results */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Row className="mb-3">
            <Col>
              <p className="text-muted">
                Tìm thấy {books.length} cuốn sách
                {searchParams.get('q') && ` cho "${searchParams.get('q')}"`}
                {author && ` của tác giả "${author}"`}
                {category && ` trong danh mục "${category}"`}
              </p>
            </Col>
          </Row>

          {currentBooks.length > 0 ? (
            <>
              <Row>
                {currentBooks.map(book => (
                  <Col xl={3} lg={4} md={6} sm={12} className="mb-4" key={book.id}>
                    <BookCard book={book} />
                  </Col>
                ))}
              </Row>

              {/* Pagination */}
              {totalPages > 1 && (
                <Row>
                  <Col className="d-flex justify-content-center">
                    <Pagination>
                      <Pagination.Prev 
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                      />
                      {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                          key={index + 1}
                          active={currentPage === index + 1}
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))}
                      <Pagination.Next 
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      />
                    </Pagination>
                  </Col>
                </Row>
              )}
            </>
          ) : (
            <Row>
              <Col className="text-center py-5">
                <div className="fs-1 mb-3">📚</div>
                <h4>Không tìm thấy sách</h4>
                <p className="text-muted">Hãy thử tìm kiếm với từ khóa khác</p>
                <Button variant="primary" onClick={() => {
                  setSearchQuery('');
                  setCategory('');
                  setAuthor('');
                  setPriceRange({ min: 0, max: 1000000 });
                  setSearchParams({});
                }}>
                  Xem tất cả sách
                </Button>
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default BooksPage;