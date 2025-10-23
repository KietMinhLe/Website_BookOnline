import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, Dropdown, Form, InputGroup, Button } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaSearch, FaBars } from 'react-icons/fa';
import NotificationBell from '../NotificationBell';

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount] = useState(3); // Mock cart count
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth state
  const [user, setUser] = useState(null); // User state

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="navbar-modern">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-modern">
          <div className="brand-logo">
            <span className="logo-text">BookStore</span>
          </div>
        </Navbar.Brand>
        
        {/* Search Bar */}
        <Form onSubmit={handleSearch} className="d-flex mb-3 mb-lg-0 me-lg-3 w-100 w-lg-auto">
          <InputGroup className="w-100">
            <Form.Control
              type="search"
              placeholder="Tìm kiếm sách..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
            />
            <Button variant="outline-light" type="submit">
              <FaSearch />
            </Button>
          </InputGroup>
        </Form>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <FaBars />
        </Navbar.Toggle>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-link">
              Trang chủ
            </Nav.Link>
            <Nav.Link as={Link} to="/books" className="nav-link">
              Sách
            </Nav.Link>
            <Nav.Link as={Link} to="/categories" className="nav-link">
              Danh mục
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link">
              Giới thiệu
            </Nav.Link>
          </Nav>
          
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/cart" className="position-relative me-2">
              <FaShoppingCart />
              {cartCount > 0 && (
                <Badge bg="danger" className="position-absolute top-0 end-0">
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>
            
            <NotificationBell />
            
            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle as={Nav.Link} className="text-white">
                  <FaUser className="me-1" />
                  {user?.fullName || user?.firstName || 'User'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">
                    Thông tin cá nhân
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/orders">
                    Đơn hàng của tôi
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link as={Link} to="/login">Đăng nhập</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;