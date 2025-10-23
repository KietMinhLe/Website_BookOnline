// Admin configuration
export const ADMIN_CONFIG = {
  // API Configuration
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  ADMIN_API_BASE_URL: process.env.REACT_APP_ADMIN_API_URL || 'http://localhost:3001/api/admin',
  
  // Authentication
  TOKEN_KEY: 'adminToken',
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // UI Configuration
  SIDEBAR_COLLAPSED_WIDTH: 60,
  SIDEBAR_EXPANDED_WIDTH: 250,
  
  // Routes
  ROUTES: {
    LOGIN: '/admin/login',
    DASHBOARD: '/admin',
    BOOKS: '/admin/books',
    ORDERS: '/admin/orders',
    USERS: '/admin/users',
    CATEGORIES: '/admin/categories',
    SETTINGS: '/admin/settings'
  },
  
  // Menu Items
  MENU_ITEMS: [
    { path: '/admin', icon: 'FaTachometerAlt', label: 'Tổng quan', exact: true },
    { path: '/admin/books', icon: 'FaBook', label: 'Quản lý sách' },
    { path: '/admin/orders', icon: 'FaShoppingCart', label: 'Quản lý đơn hàng' },
    { path: '/admin/users', icon: 'FaUsers', label: 'Quản lý người dùng' },
    { path: '/admin/categories', icon: 'FaTags', label: 'Quản lý danh mục' },
    { path: '/admin/settings', icon: 'FaCog', label: 'Cài đặt' }
  ],
  
  // Status Options
  ORDER_STATUS: [
    { value: 'pending', label: 'Chờ xử lý', color: 'warning' },
    { value: 'confirmed', label: 'Đã xác nhận', color: 'info' },
    { value: 'shipped', label: 'Đang giao', color: 'primary' },
    { value: 'delivered', label: 'Đã giao', color: 'success' },
    { value: 'cancelled', label: 'Đã hủy', color: 'danger' }
  ],
  
  USER_ROLES: [
    { value: 'admin', label: 'Quản trị viên', color: 'danger' },
    { value: 'moderator', label: 'Điều hành viên', color: 'warning' },
    { value: 'customer', label: 'Khách hàng', color: 'info' }
  ],
  
  BOOK_CATEGORIES: [
    'Lập trình',
    'Khoa học',
    'Văn học',
    'Kinh tế',
    'Lịch sử',
    'Nghệ thuật',
    'Tâm lý học',
    'Triết học',
    'Y học',
    'Công nghệ'
  ]
};

export default ADMIN_CONFIG;
