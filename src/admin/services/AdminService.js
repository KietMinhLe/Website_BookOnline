import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class AdminService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/admin`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Thêm interceptor để gửi token trong mỗi request
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Thêm interceptor để xử lý response
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token hết hạn hoặc không hợp lệ
          localStorage.removeItem('adminToken');
          window.location.href = '/admin/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication
  async login(credentials) {
    try {
      // Mock login for testing - remove this when backend is ready
      const mockAdmin = { email: 'admin@bookstore.com', password: 'admin123', name: 'Admin User' };

      const isValid = mockAdmin.email === credentials.email && mockAdmin.password === credentials.password;

      if (isValid) {
        const mockToken = 'mock-admin-token-' + Date.now();
        localStorage.setItem('adminToken', mockToken);
        return {
          success: true,
          token: mockToken,
          user: {
            id: 1,
            email: mockAdmin.email,
            name: mockAdmin.name,
            role: 'admin'
          },
          message: 'Đăng nhập thành công'
        };
      } else {
        return {
          success: false,
          message: 'Email hoặc mật khẩu không đúng'
        };
      }

      // Uncomment below when backend is ready
      /*
      const response = await this.api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
      }
      return response.data;
      */
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async logout() {
    try {
      await this.api.post('/auth/logout');
    } finally {
      localStorage.removeItem('adminToken');
    }
  }

  async getProfile() {
    try {
      const response = await this.api.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Dashboard Statistics
  async getDashboardStats() {
    try {
      const response = await this.api.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async getRecentOrders(limit = 10) {
    try {
      const response = await this.api.get(`/dashboard/recent-orders?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async getTopBooks(limit = 10) {
    try {
      const response = await this.api.get(`/dashboard/top-books?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Books Management
  async getBooks(params = {}) {
    try {
      const response = await this.api.get('/books', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async getBook(id) {
    try {
      const response = await this.api.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async createBook(bookData) {
    try {
      const response = await this.api.post('/books', bookData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async updateBook(id, bookData) {
    try {
      const response = await this.api.put(`/books/${id}`, bookData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async deleteBook(id) {
    try {
      const response = await this.api.delete(`/books/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Orders Management
  async getOrders(params = {}) {
    try {
      const response = await this.api.get('/orders', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async getOrder(id) {
    try {
      const response = await this.api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async updateOrderStatus(id, status) {
    try {
      const response = await this.api.patch(`/orders/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Users Management
  async getUsers(params = {}) {
    try {
      const response = await this.api.get('/users', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async createUser(userData) {
    try {
      const response = await this.api.post('/users', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async updateUser(id, userData) {
    try {
      const response = await this.api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async deleteUser(id) {
    try {
      const response = await this.api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Categories Management
  async getCategories(params = {}) {
    try {
      const response = await this.api.get('/categories', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async createCategory(categoryData) {
    try {
      const response = await this.api.post('/categories', categoryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async updateCategory(id, categoryData) {
    try {
      const response = await this.api.put(`/categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async deleteCategory(id) {
    try {
      const response = await this.api.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}

export default new AdminService();
