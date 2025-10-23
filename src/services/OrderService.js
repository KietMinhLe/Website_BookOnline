import axios from 'axios';
import { Order } from '../models';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class OrderService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/orders`,
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

  // Tạo đơn hàng mới
  async createOrder(orderData) {
    try {
      const response = await this.api.post('/', orderData);
      return Order.fromJSON(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Lấy danh sách đơn hàng của user
  async getUserOrders(params = {}) {
    try {
      const response = await this.api.get('/my-orders', { params });
      return response.data.map(order => Order.fromJSON(order));
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Lấy đơn hàng theo ID
  async getOrderById(id) {
    try {
      const response = await this.api.get(`/${id}`);
      return Order.fromJSON(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Cập nhật trạng thái đơn hàng (admin only)
  async updateOrderStatus(id, status) {
    try {
      const response = await this.api.put(`/${id}/status`, { status });
      return Order.fromJSON(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Hủy đơn hàng
  async cancelOrder(id) {
    try {
      const response = await this.api.put(`/${id}/cancel`);
      return Order.fromJSON(response.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Lấy tất cả đơn hàng (admin only)
  async getAllOrders(params = {}) {
    try {
      const response = await this.api.get('/', { params });
      return response.data.map(order => Order.fromJSON(order));
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Lấy thống kê đơn hàng (admin only)
  async getOrderStats() {
    try {
      const response = await this.api.get('/stats');
      return response.data;
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

export default new OrderService();

