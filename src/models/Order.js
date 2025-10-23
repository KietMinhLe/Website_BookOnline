// Order Model
export class Order {
  constructor(id, userId, items, total, shippingAddress, paymentMethod, status = 'pending') {
    this.id = id;
    this.userId = userId;
    this.items = items; // Array of {book, quantity, price}
    this.total = total;
    this.shippingAddress = shippingAddress;
    this.paymentMethod = paymentMethod;
    this.status = status; // pending, confirmed, shipped, delivered, cancelled
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Methods
  updateStatus(newStatus) {
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  // Getter methods
  getFormattedTotal() {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(this.total);
  }

  getTotalItems() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  getStatusText() {
    const statusMap = {
      'pending': 'Chờ xác nhận',
      'confirmed': 'Đã xác nhận',
      'shipped': 'Đang giao hàng',
      'delivered': 'Đã giao hàng',
      'cancelled': 'Đã hủy'
    };
    return statusMap[this.status] || this.status;
  }

  getStatusClass() {
    const classMap = {
      'pending': 'warning',
      'confirmed': 'info',
      'shipped': 'primary',
      'delivered': 'success',
      'cancelled': 'danger'
    };
    return classMap[this.status] || 'secondary';
  }

  canCancel() {
    return this.status === 'pending' || this.status === 'confirmed';
  }

  // Static methods
  static fromJSON(json) {
    const order = new Order(
      json.id,
      json.userId,
      json.items,
      json.total,
      json.shippingAddress,
      json.paymentMethod,
      json.status
    );
    order.createdAt = new Date(json.createdAt);
    order.updatedAt = new Date(json.updatedAt);
    return order;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      items: this.items,
      total: this.total,
      shippingAddress: this.shippingAddress,
      paymentMethod: this.paymentMethod,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

