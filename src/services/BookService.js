import axios from 'axios';
import { Book } from '../models';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class BookService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/books`,
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

  // Lấy danh sách tất cả sách
  async getAllBooks(params = {}) {
    try {
      const response = await this.api.get('/', { params });
      return response.data.map(book => Book.fromJSON(book));
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Lấy sách theo ID
  async getBookById(id) {
    try {
      const response = await this.api.get(`/${id}`);
      return Book.fromJSON(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Tìm kiếm sách
  async searchBooks(query, filters = {}) {
    try {
      const params = { q: query, ...filters };
      const response = await this.api.get('/search', { params });
      return response.data.map(book => Book.fromJSON(book));
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Lấy sách theo danh mục
  async getBooksByCategory(categoryId) {
    try {
      const response = await this.api.get(`/category/${categoryId}`);
      return response.data.map(book => Book.fromJSON(book));
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Lấy sách bán chạy
  async getBestSellingBooks(limit = 10) {
    try {
      const response = await this.api.get('/bestselling', { params: { limit } });
      return response.data.map(book => Book.fromJSON(book));
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Lấy sách mới nhất
  async getNewestBooks(limit = 10) {
    try {
      const response = await this.api.get('/newest', { params: { limit } });
      return response.data.map(book => Book.fromJSON(book));
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Tạo sách mới (admin only)
  async createBook(bookData) {
    try {
      const response = await this.api.post('/', bookData);
      return Book.fromJSON(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Cập nhật sách (admin only)
  async updateBook(id, bookData) {
    try {
      const response = await this.api.put(`/${id}`, bookData);
      return Book.fromJSON(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Xóa sách (admin only)
  async deleteBook(id) {
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
      // Server trả về lỗi
      return new Error(error.response.data.message || 'Có lỗi xảy ra từ server');
    } else if (error.request) {
      // Không thể kết nối đến server
      return new Error('Không thể kết nối đến server');
    } else {
      // Lỗi khác
      return new Error(error.message || 'Có lỗi xảy ra');
    }
  }
}

export default new BookService();

