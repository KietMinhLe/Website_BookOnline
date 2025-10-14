import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

class OrderService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Tạo đơn hàng mới
  async createOrder(orderData) {
    try {
      const response = await this.api.post('/donHang', orderData);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error);
      throw error;
    }
  }

  // Lấy danh sách đơn hàng theo user
  async getOrdersByUser(userId) {
    try {
      const response = await this.api.get(`/donHang/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy đơn hàng:', error);
      throw error;
    }
  }

  // Lấy chi tiết đơn hàng
  async getOrderById(orderId) {
    try {
      const response = await this.api.get(`/donHang/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
      throw error;
    }
  }

  // Cập nhật trạng thái đơn hàng
  async updateOrderStatus(orderId, status) {
    try {
      const response = await this.api.put(`/donHang/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
      throw error;
    }
  }

  // Hủy đơn hàng
  async cancelOrder(orderId) {
    try {
      const response = await this.api.put(`/donHang/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi hủy đơn hàng:', error);
      throw error;
    }
  }

  // Lấy tất cả đơn hàng (admin)
  async getAllOrders() {
    try {
      const response = await this.api.get('/donHang');
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
      throw error;
    }
  }

  // Tạo đơn hàng từ giỏ hàng
  createOrderFromCart(cartItems, customerInfo) {
    const orderData = {
      items: cartItems.map(item => ({
        bookId: item.id,
        quantity: item.quantity,
        price: item.price,
        title: item.title
      })),
      customerInfo: {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: customerInfo.address
      },
      totalAmount: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
      status: 'pending',
      orderDate: new Date().toISOString()
    };

    return orderData;
  }
}

export default new OrderService();
