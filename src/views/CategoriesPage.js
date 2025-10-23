import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBook, FaArrowRight, FaSearch } from 'react-icons/fa';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock categories data
  const mockCategories = [
    {
      id: 1,
      name: 'Tiểu thuyết',
      slug: 'tieu-thuyet',
      description: 'Những câu chuyện hư cấu với cốt truyện phức tạp và nhân vật đa dạng',
      image: 'https://via.placeholder.com/300x200/6366f1/ffffff?text=Tiểu+thuyết',
      bookCount: 1250,
      featuredBooks: [
        { id: 1, title: 'Những người khốn khổ', author: 'Victor Hugo', price: 150000 },
        { id: 2, title: 'Chiến tranh và hòa bình', author: 'Leo Tolstoy', price: 180000 },
        { id: 3, title: 'Don Quixote', author: 'Miguel de Cervantes', price: 120000 }
      ]
    },
    {
      id: 2,
      name: 'Khoa học viễn tưởng',
      slug: 'khoa-hoc-vien-tuong',
      description: 'Thể loại sách về tương lai, công nghệ và những điều không thể',
      image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Khoa+học+viễn+tưởng',
      bookCount: 890,
      featuredBooks: [
        { id: 4, title: 'Dune', author: 'Frank Herbert', price: 200000 },
        { id: 5, title: 'Foundation', author: 'Isaac Asimov', price: 160000 },
        { id: 6, title: '1984', author: 'George Orwell', price: 140000 }
      ]
    },
    {
      id: 3,
      name: 'Lịch sử',
      slug: 'lich-su',
      description: 'Những cuốn sách về quá khứ, sự kiện lịch sử và nhân vật nổi tiếng',
      image: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=Lịch+sử',
      bookCount: 650,
      featuredBooks: [
        { id: 7, title: 'Sapiens', author: 'Yuval Noah Harari', price: 220000 },
        { id: 8, title: 'Lịch sử Việt Nam', author: 'Trần Trọng Kim', price: 180000 },
        { id: 9, title: 'Chiến tranh thế giới thứ hai', author: 'Winston Churchill', price: 250000 }
      ]
    },
    {
      id: 4,
      name: 'Kinh doanh',
      slug: 'kinh-doanh',
      description: 'Sách về quản lý, marketing, tài chính và khởi nghiệp',
      image: 'https://via.placeholder.com/300x200/ef4444/ffffff?text=Kinh+doanh',
      bookCount: 420,
      featuredBooks: [
        { id: 10, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', price: 160000 },
        { id: 11, title: 'Think and Grow Rich', author: 'Napoleon Hill', price: 140000 },
        { id: 12, title: 'The Lean Startup', author: 'Eric Ries', price: 180000 }
      ]
    },
    {
      id: 5,
      name: 'Tâm lý học',
      slug: 'tam-ly-hoc',
      description: 'Khám phá tâm trí con người và hành vi',
      image: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Tâm+lý+học',
      bookCount: 380,
      featuredBooks: [
        { id: 13, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', price: 200000 },
        { id: 14, title: 'The Power of Habit', author: 'Charles Duhigg', price: 150000 },
        { id: 15, title: 'Emotional Intelligence', author: 'Daniel Goleman', price: 170000 }
      ]
    },
    {
      id: 6,
      name: 'Nghệ thuật & Thiết kế',
      slug: 'nghe-thuat-thiet-ke',
      description: 'Sách về hội họa, nhiếp ảnh, thiết kế và sáng tạo',
      image: 'https://via.placeholder.com/300x200/ec4899/ffffff?text=Nghệ+thuật',
      bookCount: 290,
      featuredBooks: [
        { id: 16, title: 'The Design of Everyday Things', author: 'Don Norman', price: 190000 },
        { id: 17, title: 'Steal Like an Artist', author: 'Austin Kleon', price: 120000 },
        { id: 18, title: 'Color Theory', author: 'Johannes Itten', price: 160000 }
      ]
    },
    {
      id: 7,
      name: 'Sức khỏe & Thể thao',
      slug: 'suc-khoe-the-thao',
      description: 'Sách về dinh dưỡng, tập luyện và lối sống lành mạnh',
      image: 'https://via.placeholder.com/300x200/22c55e/ffffff?text=Sức+khỏe',
      bookCount: 340,
      featuredBooks: [
        { id: 19, title: 'Atomic Habits', author: 'James Clear', price: 180000 },
        { id: 20, title: 'The 4-Hour Body', author: 'Tim Ferriss', price: 200000 },
        { id: 21, title: 'Born to Run', author: 'Christopher McDougall', price: 150000 }
      ]
    },
    {
      id: 8,
      name: 'Du lịch',
      slug: 'du-lich',
      description: 'Sách hướng dẫn du lịch và khám phá thế giới',
      image: 'https://via.placeholder.com/300x200/06b6d4/ffffff?text=Du+lịch',
      bookCount: 180,
      featuredBooks: [
        { id: 22, title: 'Lonely Planet Vietnam', author: 'Lonely Planet', price: 300000 },
        { id: 23, title: 'Eat Pray Love', author: 'Elizabeth Gilbert', price: 160000 },
        { id: 24, title: 'Into the Wild', author: 'Jon Krakauer', price: 140000 }
      ]
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCategories(mockCategories);
      setLoading(false);
    }, 800);
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
          <p className="mt-3 text-muted">Đang tải danh mục sách...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="text-center mb-4">
            <h1 className="h2 fw-bold text-primary mb-3">
              <FaBook className="me-2" />
              Danh mục sách
            </h1>
            <p className="text-muted lead">
              Khám phá hàng nghìn cuốn sách được phân loại theo chủ đề
            </p>
          </div>

          {/* Search Bar */}
          <div className="row justify-content-center mb-4">
            <div className="col-md-6">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Tìm kiếm danh mục..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <Alert variant="info" className="text-center">
          <Alert.Heading>Không tìm thấy danh mục</Alert.Heading>
          <p>Không có danh mục nào phù hợp với từ khóa tìm kiếm của bạn.</p>
        </Alert>
      ) : (
        <Row className="g-4">
          {filteredCategories.map((category) => (
            <Col key={category.id} lg={6} xl={4}>
              <Card className="h-100 shadow-sm border-0 category-card">
                <div className="position-relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-primary">
                      {category.bookCount} sách
                    </span>
                  </div>
                </div>
                
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="h5 fw-bold text-primary mb-2">
                    {category.name}
                  </Card.Title>
                  
                  <Card.Text className="text-muted mb-3 flex-grow-1">
                    {category.description}
                  </Card.Text>

                  {/* Featured Books */}
                  <div className="mb-3">
                    <h6 className="text-muted small mb-2">Sách nổi bật:</h6>
                    <div className="d-flex flex-column gap-1">
                      {category.featuredBooks.slice(0, 2).map((book) => (
                        <div key={book.id} className="d-flex justify-content-between align-items-center">
                          <div className="flex-grow-1">
                            <div className="small fw-semibold text-dark">{book.title}</div>
                            <div className="small text-muted">{book.author}</div>
                          </div>
                          <div className="small fw-bold text-success">
                            {formatPrice(book.price)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={`/categories/${category.slug}`}
                    className="btn btn-primary btn-sm mt-auto d-flex align-items-center justify-content-center"
                  >
                    Xem tất cả sách
                    <FaArrowRight className="ms-2" />
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Stats */}
      <Row className="mt-5">
        <Col>
          <div className="text-center">
            <div className="row g-4">
              <div className="col-md-3">
                <div className="p-3">
                  <h3 className="text-primary fw-bold">{categories.length}</h3>
                  <p className="text-muted mb-0">Danh mục</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3">
                  <h3 className="text-success fw-bold">
                    {categories.reduce((sum, cat) => sum + cat.bookCount, 0).toLocaleString()}
                  </h3>
                  <p className="text-muted mb-0">Tổng số sách</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3">
                  <h3 className="text-warning fw-bold">24/7</h3>
                  <p className="text-muted mb-0">Hỗ trợ</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3">
                  <h3 className="text-info fw-bold">100%</h3>
                  <p className="text-muted mb-0">Chất lượng</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoriesPage;
