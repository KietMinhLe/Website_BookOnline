import axios from 'axios';
import { User } from '../models';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/users`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor để thêm token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Đăng ký tài khoản
  async register(userData) {
    try {
      const response = await this.api.post('/register', userData);
      return {
        user: User.fromJSON(response.data.user),
        token: response.data.token
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Đăng nhập
  async login(email, password) {
    try {
      const response = await this.api.post('/login', { email, password });
      return {
        user: User.fromJSON(response.data.user),
        token: response.data.token
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Đăng xuất
  async logout() {
    try {
      await this.api.post('/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    } catch (error) {
      // Ngay cả khi server trả về lỗi, vẫn xóa token local
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    }
  }

  // Lấy thông tin user hiện tại
  async getCurrentUser() {
    try {
      const response = await this.api.get('/me');
      return User.fromJSON(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Cập nhật thông tin user
  async updateProfile(userData) {
    try {
      const response = await this.api.put('/profile', userData);
      return User.fromJSON(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Đổi mật khẩu
  async changePassword(currentPassword, newPassword) {
    try {
      await this.api.put('/change-password', {
        currentPassword,
        newPassword
      });
      return true;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Quên mật khẩu
  async forgotPassword(email) {
    try {
      await this.api.post('/forgot-password', { email });
      return true;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Reset mật khẩu
  async resetPassword(token, newPassword) {
    try {
      await this.api.post('/reset-password', { token, newPassword });
      return true;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Lấy danh sách user (admin only)
  async getAllUsers(params = {}) {
    try {
      const response = await this.api.get('/', { params });
      return response.data.map(user => User.fromJSON(user));
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Lấy user theo ID (admin only)
  async getUserById(id) {
    try {
      const response = await this.api.get(`/${id}`);
      return User.fromJSON(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Cập nhật user (admin only)
  async updateUser(id, userData) {
    try {
      const response = await this.api.put(`/${id}`, userData);
      return User.fromJSON(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Xóa user (admin only)
  async deleteUser(id) {
    try {
      await this.api.delete(`/${id}`);
      return true;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Xử lý lỗi
  handleError(error) {
    if (error.response) {
      return new Error(error.response.data.message || 'Có lỗi xảy ra từ server');
    } else if (error.request) {
      return new Error('Không thể kết nối đến server');
    } else {
      return new Error(error.message || 'Có lỗi xảy ra');
    }
  }
}

export default new UserService();

