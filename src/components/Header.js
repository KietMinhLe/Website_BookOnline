import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Xử lý tìm kiếm ở đây
    console.log('Tìm kiếm:', searchQuery);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">
              <span>B</span>
            </div>
            <span className="logo-text">BookStore</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="search-bar hidden md:block">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sách..."
                className="search-input"
              />
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav hidden md:flex">
            <Link to="/" className="nav-link">
              Trang chủ
            </Link>
            <Link to="/categories" className="nav-link">
              Danh mục
            </Link>
            <Link to="/about" className="nav-link">
              Giới thiệu
            </Link>
            <Link to="/contact" className="nav-link">
              Liên hệ
            </Link>

            {/* Cart */}
            <Link to="/cart" className="cart-link">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                <circle cx="9" cy="21" r="1" fill="currentColor"/>
                <circle cx="20" cy="21" r="1" fill="currentColor"/>
              </svg>
              {itemCount > 0 && (
                <span className="cart-badge">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden lg:inline text-sm font-medium">
                    {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.email}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Thông tin cá nhân
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Đơn hàng của tôi
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="login-button">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="hidden lg:inline">Đăng nhập</span>
              </Link>
            )}
          </nav>

          {/* Mobile Actions */}
          <div className="mobile-actions md:hidden">
            {/* Mobile Search Button */}
            <button className="mobile-search-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Mobile Menu Toggle */}
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu md:hidden">
          {/* Mobile Search */}
          <div className="mobile-search">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sách..."
                className="search-input"
              />
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>
          </div>

          {/* Mobile Navigation */}
          <nav className="mobile-nav">
            <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="nav-icon">🏠</span>
              Trang chủ
            </Link>
            <Link to="/categories" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="nav-icon">📚</span>
              Danh mục
            </Link>
            <Link to="/about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="nav-icon">ℹ️</span>
              Giới thiệu
            </Link>
            <Link to="/contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="nav-icon">📞</span>
              Liên hệ
            </Link>
            <Link to="/cart" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <svg className="nav-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                <circle cx="9" cy="21" r="1" fill="currentColor"/>
                <circle cx="20" cy="21" r="1" fill="currentColor"/>
              </svg>
              Giỏ hàng
            </Link>
            {isAuthenticated ? (
              <>
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium">
                      {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.email}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </div>
                <Link to="/profile" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="nav-icon">👤</span>
                  Thông tin cá nhân
                </Link>
                <Link to="/orders" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="nav-icon">📦</span>
                  Đơn hàng của tôi
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-100"
                >
                  <span className="nav-icon">🚪</span>
                  Đăng xuất
                </button>
              </>
            ) : (
              <Link to="/login" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="nav-icon">👤</span>
                Đăng nhập
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
