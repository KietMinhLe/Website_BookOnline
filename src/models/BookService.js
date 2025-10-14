import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // URL của backend

class BookService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 2000, // 2 giây timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Lấy danh sách tất cả sách
  async getAllBooks() {
    try {
      const response = await this.api.get('/baiViet');
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sách:', error);
      throw error;
    }
  }

  // Lấy sách theo ID
  async getBookById(id) {
    try {
      const response = await this.api.get(`/baiViet/${id}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin sách:', error);
      throw error;
    }
  }

  // Lấy sách theo danh mục
  async getBooksByCategory(categoryId) {
    try {
      const response = await this.api.get(`/baiViet/danhMuc/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy sách theo danh mục:', error);
      throw error;
    }
  }

  // Tìm kiếm sách
  async searchBooks(query) {
    try {
      const response = await this.api.get(`/baiViet/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tìm kiếm sách:', error);
      throw error;
    }
  }

  // Lấy danh sách danh mục
  async getCategories() {
    try {
      const response = await this.api.get('/danhMuc');
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách danh mục:', error);
      throw error;
    }
  }

  // Thêm sách mới (admin)
  async createBook(bookData) {
    try {
      const response = await this.api.post('/baiViet', bookData);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi thêm sách:', error);
      throw error;
    }
  }

  // Cập nhật thông tin sách (admin)
  async updateBook(id, bookData) {
    try {
      const response = await this.api.put(`/baiViet/${id}`, bookData);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật sách:', error);
      throw error;
    }
  }

  // Xóa sách (admin)
  async deleteBook(id) {
    try {
      const response = await this.api.delete(`/baiViet/${id}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi xóa sách:', error);
      throw error;
    }
  }
}

const bookService = new BookService();
export default bookService;
