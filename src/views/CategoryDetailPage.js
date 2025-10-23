import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge, Form, InputGroup } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaBook, FaShoppingCart, FaHeart, FaStar, FaFilter, FaSort, FaSearch, FaArrowLeft } from 'react-icons/fa';

const CategoryDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock category data
  const mockCategories = {
    'tieu-thuyet': {
      id: 1,
      name: 'Tiểu thuyết',
      slug: 'tieu-thuyet',
      description: 'Những câu chuyện hư cấu với cốt truyện phức tạp và nhân vật đa dạng',
      image: 'https://via.placeholder.com/800x400/6366f1/ffffff?text=Tiểu+thuyết',
      bookCount: 1250
    },
    'khoa-hoc-vien-tuong': {
      id: 2,
      name: 'Khoa học viễn tưởng',
      slug: 'khoa-hoc-vien-tuong',
      description: 'Thể loại sách về tương lai, công nghệ và những điều không thể',
      image: 'https://via.placeholder.com/800x400/10b981/ffffff?text=Khoa+học+viễn+tưởng',
      bookCount: 890
    },
    'lich-su': {
      id: 3,
      name: 'Lịch sử',
      slug: 'lich-su',
      description: 'Những cuốn sách về quá khứ, sự kiện lịch sử và nhân vật nổi tiếng',
      image: 'https://via.placeholder.com/800x400/f59e0b/ffffff?text=Lịch+sử',
      bookCount: 650
    },
    'kinh-doanh': {
      id: 4,
      name: 'Kinh doanh',
      slug: 'kinh-doanh',
      description: 'Sách về quản lý, marketing, tài chính và khởi nghiệp',
      image: 'https://via.placeholder.com/800x400/ef4444/ffffff?text=Kinh+doanh',
      bookCount: 420
    },
    'tam-ly-hoc': {
      id: 5,
      name: 'Tâm lý học',
      slug: 'tam-ly-hoc',
      description: 'Khám phá tâm trí con người và hành vi',
      image: 'https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Tâm+lý+học',
      bookCount: 380
    },
    'nghe-thuat-thiet-ke': {
      id: 6,
      name: 'Nghệ thuật & Thiết kế',
      slug: 'nghe-thuat-thiet-ke',
      description: 'Sách về hội họa, nhiếp ảnh, thiết kế và sáng tạo',
      image: 'https://via.placeholder.com/800x400/ec4899/ffffff?text=Nghệ+thuật',
      bookCount: 290
    },
    'suc-khoe-the-thao': {
      id: 7,
      name: 'Sức khỏe & Thể thao',
      slug: 'suc-khoe-the-thao',
      description: 'Sách về dinh dưỡng, tập luyện và lối sống lành mạnh',
      image: 'https://via.placeholder.com/800x400/22c55e/ffffff?text=Sức+khỏe',
      bookCount: 340
    },
    'du-lich': {
      id: 8,
      name: 'Du lịch',
      slug: 'du-lich',
      description: 'Sách hướng dẫn du lịch và khám phá thế giới',
      image: 'https://via.placeholder.com/800x400/06b6d4/ffffff?text=Du+lịch',
      bookCount: 180
    }
  };

  // Mock books data
  const mockBooks = {
    'tieu-thuyet': [
      { id: 1, title: 'Những người khốn khổ', author: 'Victor Hugo', price: 150000, rating: 4.8, reviews: 1250, image: 'https://via.placeholder.com/200x300/6366f1/ffffff?text=Les+Miserables', description: 'Tác phẩm kinh điển về cuộc đấu tranh giữa thiện và ác' },
      { id: 2, title: 'Chiến tranh và hòa bình', author: 'Leo Tolstoy', price: 180000, rating: 4.9, reviews: 980, image: 'https://via.placeholder.com/200x300/6366f1/ffffff?text=War+Peace', description: 'Bộ tiểu thuyết sử thi về cuộc chiến tranh Napoleon' },
      { id: 3, title: 'Don Quixote', author: 'Miguel de Cervantes', price: 120000, rating: 4.7, reviews: 750, image: 'https://via.placeholder.com/200x300/6366f1/ffffff?text=Don+Quixote', description: 'Câu chuyện về hiệp sĩ tưởng tượng và giấc mơ phiêu lưu' },
      { id: 4, title: 'Anna Karenina', author: 'Leo Tolstoy', price: 160000, rating: 4.6, reviews: 890, image: 'https://via.placeholder.com/200x300/6366f1/ffffff?text=Anna+Karenina', description: 'Tác phẩm về tình yêu, hôn nhân và xã hội Nga thế kỷ 19' },
      { id: 5, title: 'Madame Bovary', author: 'Gustave Flaubert', price: 140000, rating: 4.5, reviews: 650, image: 'https://via.placeholder.com/200x300/6366f1/ffffff?text=Madame+Bovary', description: 'Tiểu thuyết về cuộc đời của một phụ nữ không hạnh phúc' },
      { id: 6, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 130000, rating: 4.4, reviews: 1200, image: 'https://via.placeholder.com/200x300/6366f1/ffffff?text=Gatsby', description: 'Câu chuyện về giấc mơ Mỹ và sự suy tàn của nó' }
    ],
    'khoa-hoc-vien-tuong': [
      { id: 7, title: 'Dune', author: 'Frank Herbert', price: 200000, rating: 4.9, reviews: 1500, image: 'https://via.placeholder.com/200x300/10b981/ffffff?text=Dune', description: 'Tiểu thuyết khoa học viễn tưởng về hành tinh Arrakis' },
      { id: 8, title: 'Foundation', author: 'Isaac Asimov', price: 160000, rating: 4.8, reviews: 1100, image: 'https://via.placeholder.com/200x300/10b981/ffffff?text=Foundation', description: 'Bộ tiểu thuyết về sự sụp đổ và tái thiết của đế chế' },
      { id: 9, title: '1984', author: 'George Orwell', price: 140000, rating: 4.7, reviews: 2000, image: 'https://via.placeholder.com/200x300/10b981/ffffff?text=1984', description: 'Tác phẩm dystopian về xã hội toàn trị' },
      { id: 10, title: 'Brave New World', author: 'Aldous Huxley', price: 150000, rating: 4.6, reviews: 950, image: 'https://via.placeholder.com/200x300/10b981/ffffff?text=Brave+New+World', description: 'Viễn cảnh về một xã hội tương lai hoàn hảo' },
      { id: 11, title: 'The Martian', author: 'Andy Weir', price: 170000, rating: 4.8, reviews: 1800, image: 'https://via.placeholder.com/200x300/10b981/ffffff?text=The+Martian', description: 'Câu chuyện về một phi hành gia bị bỏ lại trên sao Hỏa' },
      { id: 12, title: 'Neuromancer', author: 'William Gibson', price: 160000, rating: 4.5, reviews: 800, image: 'https://via.placeholder.com/200x300/10b981/ffffff?text=Neuromancer', description: 'Tiểu thuyết cyberpunk đầu tiên' }
    ]
  };

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const categoryData = mockCategories[slug];
      const booksData = mockBooks[slug] || [];
      
      if (categoryData) {
        setCategory(categoryData);
        setBooks(booksData);
      }
      setLoading(false);
    }, 800);
  }, [slug]);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(book =>
    book.price >= priceRange[0] && book.price <= priceRange[1]
  );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleAddToCart = (book) => {
    alert(`Đã thêm "${book.title}" vào giỏ hàng!`);
  };

  const handleAddToWishlist = (book) => {
    alert(`Đã thêm "${book.title}" vào danh sách yêu thích!`);
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
          <p className="mt-3 text-muted">Đang tải danh mục...</p>
        </div>
      </Container>
    );
  }

  if (!category) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Không tìm thấy danh mục</Alert.Heading>
          <p>Danh mục bạn tìm kiếm không tồn tại.</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={() => navigate('/categories')}>
              Quay lại danh mục
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
            <Link to="/" className="text-decoration-none">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/categories" className="text-decoration-none">Danh mục</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {category.name}
          </li>
        </ol>
      </nav>

      {/* Category Header */}
      <Row className="mb-4">
        <Col>
          <div className="position-relative">
            <img
              src={category.image}
              alt={category.name}
              className="img-fluid rounded shadow"
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
            <div className="position-absolute top-0 start-0 p-4">
              <Button
                variant="outline-light"
                onClick={() => navigate('/categories')}
                className="mb-3"
              >
                <FaArrowLeft className="me-2" />
                Quay lại
              </Button>
            </div>
            <div className="position-absolute bottom-0 start-0 p-4 text-white">
              <h1 className="h2 fw-bold mb-2">{category.name}</h1>
              <p className="lead mb-0">{category.description}</p>
              <Badge bg="light" text="dark" className="mt-2">
                <FaBook className="me-1" />
                {category.bookCount} sách
              </Badge>
            </div>
          </div>
        </Col>
      </Row>

      {/* Filters and Search */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Row className="align-items-center">
                <Col md={6}>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaSearch />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Tìm kiếm sách..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                <Col md={3}>
                  <Form.Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="price-low">Giá thấp đến cao</option>
                    <option value="price-high">Giá cao đến thấp</option>
                    <option value="rating">Đánh giá cao</option>
                    <option value="reviews">Nhiều đánh giá</option>
                    <option value="title">Tên A-Z</option>
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <FaFilter className="me-1" />
                      Bộ lọc
                    </Button>
                    <Button variant="outline-secondary">
                      <FaSort className="me-1" />
                      Sắp xếp
                    </Button>
                  </div>
                </Col>
              </Row>

              {/* Price Range Filter */}
              {showFilters && (
                <Row className="mt-3">
                  <Col md={6}>
                    <Form.Label>Khoảng giá: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}</Form.Label>
                    <Form.Range
                      min={0}
                      max={1000000}
                      step={50000}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    />
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Results Count */}
      <Row className="mb-3">
        <Col>
          <p className="text-muted">
            Hiển thị {sortedBooks.length} trong {books.length} sách
          </p>
        </Col>
      </Row>

      {/* Books Grid */}
      {sortedBooks.length === 0 ? (
        <Alert variant="info" className="text-center">
          <Alert.Heading>Không tìm thấy sách</Alert.Heading>
          <p>Không có sách nào phù hợp với tiêu chí tìm kiếm của bạn.</p>
        </Alert>
      ) : (
        <Row className="g-4">
          {sortedBooks.map((book) => (
            <Col key={book.id} lg={4} md={6}>
              <Card className="h-100 shadow-sm border-0 book-card">
                <div className="position-relative">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="card-img-top"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={() => handleAddToWishlist(book)}
                      className="rounded-circle"
                    >
                      <FaHeart />
                    </Button>
                  </div>
                </div>
                
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="h6 fw-bold text-primary mb-2">
                    {book.title}
                  </Card.Title>
                  
                  <Card.Text className="text-muted small mb-2">
                    Tác giả: {book.author}
                  </Card.Text>

                  <Card.Text className="text-muted small mb-3 flex-grow-1">
                    {book.description}
                  </Card.Text>

                  {/* Rating */}
                  <div className="d-flex align-items-center mb-2">
                    <div className="d-flex align-items-center me-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < Math.floor(book.rating) ? 'text-warning' : 'text-muted'}
                          style={{ fontSize: '0.8rem' }}
                        />
                      ))}
                    </div>
                    <span className="small text-muted">
                      {book.rating} ({book.reviews} đánh giá)
                    </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div className="fw-bold text-success h5 mb-0">
                      {formatPrice(book.price)}
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAddToCart(book)}
                    >
                      <FaShoppingCart className="me-1" />
                      Thêm vào giỏ
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CategoryDetailPage;
