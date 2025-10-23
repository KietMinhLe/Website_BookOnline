import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaBook, 
  FaShoppingCart, 
  FaUsers, 
  FaTags, 
  FaBars,
  FaSignOutAlt,
  FaCog,
  FaChartLine
} from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 991);
      if (window.innerWidth <= 991) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { path: '/admin', icon: FaTachometerAlt, label: 'Tổng quan', exact: true },
    { path: '/admin/books', icon: FaBook, label: 'Quản lý sách' },
    { path: '/admin/orders', icon: FaShoppingCart, label: 'Quản lý đơn hàng' },
    { path: '/admin/users', icon: FaUsers, label: 'Quản lý người dùng' },
    { path: '/admin/categories', icon: FaTags, label: 'Quản lý danh mục' },
    { path: '/admin/reports', icon: FaChartLine, label: 'Báo cáo' },
    { path: '/admin/settings', icon: FaCog, label: 'Cài đặt' }
  ];

  const handleLogout = () => {
    // Xử lý đăng xuất
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="admin-layout">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Container fluid className="p-0">
        <Row className="g-0">
          {/* Sidebar */}
          <Col
            md={sidebarOpen ? 2 : 1}
            className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}
          >
            <div className="sidebar-header">
              <Button
                variant="outline-light"
                size="sm"
                onClick={toggleSidebar}
                className="sidebar-toggle"
              >
                <FaBars />
              </Button>
              {sidebarOpen && (
                <h5 className="sidebar-title">Admin Panel</h5>
              )}
            </div>
            <Nav className="flex-column p-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Nav.Item key={item.path}>
                    <Nav.Link
                      as={Link}
                      to={item.path}
                      className={`admin-nav-link ${isActive(item.path, item.exact) ? 'active' : ''}`}
                    >
                      <Icon className="me-3" size={20} />
                      {sidebarOpen && <span className="menu-text">{item.label}</span>}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
              <Nav.Item className="mt-auto">
                <Nav.Link
                  onClick={handleLogout}
                  className="admin-nav-link logout-link"
                >
                  <FaSignOutAlt className="me-3" size={20} />
                  {sidebarOpen && <span className="menu-text">Đăng xuất</span>}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          {/* Main Content */}
          <Col md={sidebarOpen ? 10 : 11} className="admin-main-content">
            {/* Mobile Header */}
            {isMobile && (
              <div className="mobile-header">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={toggleSidebar}
                  className="mobile-menu-toggle"
                >
                  <FaBars />
                </Button>
                <h5 className="mobile-title">Admin Panel</h5>
              </div>
            )}
            
            <div className="p-4">
              {children}
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .admin-layout {
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        .admin-sidebar {
          background: linear-gradient(180deg, #1a1a2e, #16213e);
          min-height: 100vh;
          transition: all 0.3s ease;
          position: sticky;
          top: 0;
          box-shadow: 2px 0 15px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
        }

        .admin-sidebar.sidebar-collapsed {
          flex: 0 0 60px;
        }

        .sidebar-header {
          padding: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .sidebar-toggle {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: #e0e6ed;
        }

        .sidebar-toggle:hover {
          background: rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.3);
        }

        .sidebar-title {
          color: #e0e6ed;
          margin: 0;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .admin-nav-link {
          color: #e0e6ed !important;
          padding: 14px 18px;
          margin-bottom: 6px;
          border-radius: 10px;
          transition: all 0.3s ease;
          text-decoration: none;
          display: flex;
          align-items: center;
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .admin-nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s;
        }

        .admin-nav-link:hover::before {
          left: 100%;
        }

        .admin-nav-link:hover {
          background: linear-gradient(135deg, #ff6b6b, #ee5a24);
          color: #fff !important;
          transform: translateX(6px);
          box-shadow: 0 6px 20px rgba(255,107,107,0.4);
        }

        .admin-nav-link.active {
          background: linear-gradient(135deg, #4ecdc4, #44a08d);
          color: #fff !important;
          box-shadow: 0 6px 20px rgba(78,205,196,0.4);
          transform: translateX(6px);
        }

        .admin-nav-link.active::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 5px;
          height: 70%;
          background: linear-gradient(180deg, #fff, #f8f9fa);
          border-radius: 3px 0 0 3px;
          box-shadow: -2px 0 8px rgba(255,255,255,0.3);
        }

        .menu-text {
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }

        .admin-nav-link:hover .menu-text {
          text-shadow: 0 3px 6px rgba(0,0,0,0.3);
        }

        .admin-nav-link.active .menu-text {
          text-shadow: 0 3px 6px rgba(0,0,0,0.4);
        }

        .admin-nav-link svg {
          transition: all 0.3s ease;
        }

        .admin-nav-link:hover svg {
          transform: scale(1.15);
          filter: drop-shadow(0 3px 6px rgba(0,0,0,0.3));
        }

        .admin-nav-link.active svg {
          transform: scale(1.15);
          filter: drop-shadow(0 3px 6px rgba(0,0,0,0.4));
        }

        .logout-link:hover {
          background: linear-gradient(135deg, #ef4444, #dc2626) !important;
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4) !important;
        }

        .admin-main-content {
          background-color: #fff;
          min-height: 100vh;
        }

        /* Mobile Header */
        .mobile-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .mobile-menu-toggle {
          background: rgba(255,255,255,0.1) !important;
          border: 1px solid rgba(255,255,255,0.2) !important;
          color: white !important;
        }

        .mobile-menu-toggle:hover {
          background: rgba(255,255,255,0.2) !important;
          border-color: rgba(255,255,255,0.3) !important;
        }

        .mobile-title {
          margin: 0;
          font-weight: 600;
          font-size: 1.1rem;
        }

        /* Mobile Overlay */
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 999;
        }

        @media (max-width: 991px) {
          .admin-sidebar {
            position: fixed;
            z-index: 1000;
            transform: translateX(${sidebarOpen ? '0' : '-100%'});
            width: 280px !important;
            flex: none !important;
            transition: transform 0.3s ease;
          }

          /* Hide sidebar toggle button on mobile */
          .sidebar-toggle {
            display: none !important;
          }

          .admin-main-content {
            width: 100%;
            margin-left: 0;
            flex: none !important;
            padding-left: 0;
            padding-right: 0;
          }

          /* Mobile header improvements */
          .mobile-header {
            position: sticky;
            top: 0;
            z-index: 999;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }

          .mobile-menu-toggle {
            background: rgba(255,255,255,0.1) !important;
            border: 1px solid rgba(255,255,255,0.2) !important;
            color: white !important;
            border-radius: 8px;
            padding: 0.5rem;
            transition: all 0.3s ease;
          }

          .mobile-menu-toggle:hover {
            background: rgba(255,255,255,0.2) !important;
            border-color: rgba(255,255,255,0.3) !important;
            transform: scale(1.05);
          }

          .mobile-title {
            margin: 0;
            font-weight: 600;
            font-size: 1.1rem;
            color: white;
          }

          /* Main content padding for mobile */
          .admin-main-content .p-4 {
            padding: 1rem !important;
          }
        }

        @media (max-width: 576px) {
          .mobile-header {
            padding: 0.75rem 1rem;
          }

          .mobile-title {
            font-size: 1rem;
          }

          .admin-main-content .p-4 {
            padding: 0.75rem !important;
          }

          .admin-sidebar {
            width: 100% !important;
            max-width: 320px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;