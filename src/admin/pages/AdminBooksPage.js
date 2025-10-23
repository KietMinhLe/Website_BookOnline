import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Table, 
  Button, 
  Form, 
  Modal, 
  Badge,
  InputGroup,
  ButtonGroup
} from 'react-bootstrap';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSearch, 
  FaEye
} from 'react-icons/fa';

const AdminBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    image: '',
    status: 'active'
  });

  const categories = [
    'Lập trình',
    'Khoa học',
    'Văn học',
    'Kinh tế',
    'Lịch sử',
    'Nghệ thuật'
  ];

  useEffect(() => {
    // Mock data
    setBooks([
      {
        id: 1,
        title: 'React.js từ cơ bản đến nâng cao',
        author: 'Nguyễn Văn A',
        isbn: '978-1234567890',
        price: 250000,
        stock: 50,
        category: 'Lập trình',
        status: 'active',
        sales: 45,
        createdAt: '2024-01-01'
      },
      {
        id: 2,
        title: 'JavaScript ES6+',
        author: 'Trần Thị B',
        isbn: '978-1234567891',
        price: 200000,
        stock: 30,
        category: 'Lập trình',
        status: 'active',
        sales: 38,
        createdAt: '2024-01-02'
      }
    ]);
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

  const handleAddBook = () => {
    setEditingBook(null);
    setFormData({
      title: '',
      author: '',
      isbn: '',
      price: '',
      stock: '',
      category: '',
      description: '',
      image: '',
      status: 'active'
    });
    setShowModal(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      price: book.price.toString(),
      stock: book.stock.toString(),
      category: book.category,
      description: book.description || '',
      image: book.image || '',
      status: book.status
    });
    setShowModal(true);
  };

  const handleSaveBook = () => {
    const bookData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      sales: editingBook ? editingBook.sales : 0,
      createdAt: editingBook ? editingBook.createdAt : new Date().toISOString().split('T')[0]
    };

    if (editingBook) {
      setBooks(books.map(book => book.id === editingBook.id ? { ...book, ...bookData } : book));
    } else {
      const newBook = {
        id: Math.max(...books.map(b => b.id)) + 1,
        ...bookData
      };
      setBooks([...books, newBook]);
    }

    setShowModal(false);
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sách này?')) {
      setBooks(books.filter(book => book.id !== bookId));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? <Badge bg="success">Hoạt động</Badge>
      : <Badge bg="secondary">Ngừng bán</Badge>;
  };

  const getStockBadge = (stock) => {
    if (stock === 0) {
      return <Badge bg="danger">Hết hàng</Badge>;
    } else if (stock < 10) {
      return <Badge bg="warning">Sắp hết</Badge>;
    } else {
      return <Badge bg="success">{stock}</Badge>;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý sách</h2>
        <Button variant="primary" onClick={handleAddBook}>
          <FaPlus className="me-2" />
          Thêm sách mới
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm theo tên, tác giả, ISBN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <div className="d-flex gap-2">
                <Button variant="outline-secondary" size="sm">
                  Xuất Excel
                </Button>
                <Button variant="outline-secondary" size="sm">
                  Nhập Excel
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Books Table */}
      <Card>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sách</th>
                <th>Tác giả</th>
                <th>ISBN</th>
                <th>Giá</th>
                <th>Tồn kho</th>
                <th>Danh mục</th>
                <th>Trạng thái</th>
                <th>Bán được</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBooks.map((book) => (
                <tr key={book.id}>
                  <td>
                    <div 
                      className="book-image-placeholder"
                      style={{
                        width: '50px',
                        height: '70px',
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #dee2e6',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        color: '#6c757d'
                      }}
                    >
                      📖
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="fw-bold">{book.title}</div>
                      <small className="text-muted">ID: {book.id}</small>
                    </div>
                  </td>
                  <td>{book.author}</td>
                  <td>
                    <code>{book.isbn}</code>
                  </td>
                  <td className="fw-bold">{formatCurrency(book.price)}</td>
                  <td>{getStockBadge(book.stock)}</td>
                  <td>
                    <Badge bg="info">{book.category}</Badge>
                  </td>
                  <td>{getStatusBadge(book.status)}</td>
                  <td>
                    <span className="fw-bold text-success">{book.sales}</span>
                  </td>
                  <td>
                    <ButtonGroup size="sm">
                      <Button variant="outline-primary" title="Xem chi tiết">
                        <FaEye />
                      </Button>
                      <Button 
                        variant="outline-warning" 
                        title="Chỉnh sửa"
                        onClick={() => handleEditBook(book)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        title="Xóa"
                        onClick={() => handleDeleteBook(book.id)}
                      >
                        <FaTrash />
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit Book Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingBook ? 'Chỉnh sửa sách' : 'Thêm sách mới'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tên sách *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Nhập tên sách"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tác giả *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  placeholder="Nhập tên tác giả"
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>ISBN *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.isbn}
                  onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                  placeholder="978-1234567890"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Giá (VNĐ) *</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="250000"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Số lượng *</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  placeholder="50"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Danh mục *</Form.Label>
                <Form.Select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Trạng thái</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Ngừng bán</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Mô tả về sách..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL hình ảnh</Form.Label>
            <Form.Control
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              placeholder="https://example.com/book-image.jpg"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveBook}>
            {editingBook ? 'Cập nhật' : 'Thêm sách'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminBooksPage;
