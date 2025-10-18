class CartService {
  constructor() {
    this.cartKey = 'bookstore_cart';
  }

  // Lấy giỏ hàng từ localStorage
  getCart() {
    try {
      const cart = localStorage.getItem(this.cartKey);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Lỗi khi lấy giỏ hàng:', error);
      return [];
    }
  }

  // Lưu giỏ hàng vào localStorage
  saveCart(cart) {
    try {
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
    } catch (error) {
      console.error('Lỗi khi lưu giỏ hàng:', error);
    }
  }

  // Thêm sách vào giỏ hàng
  addToCart(book, quantity = 1) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === book.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: book.id,
        title: book.tieuDe,
        price: book.giaBan,
        image: book.hinhAnh,
        quantity: quantity
      });
    }

    this.saveCart(cart);
    return cart;
  }

  // Cập nhật số lượng sách trong giỏ hàng
  updateQuantity(bookId, quantity) {
    const cart = this.getCart();
    const item = cart.find(item => item.id === bookId);

    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(bookId);
      }
      item.quantity = quantity;
      this.saveCart(cart);
    }

    return cart;
  }

  // Xóa sách khỏi giỏ hàng
  removeFromCart(bookId) {
    const cart = this.getCart();
    const updatedCart = cart.filter(item => item.id !== bookId);
    this.saveCart(updatedCart);
    return updatedCart;
  }

  // Xóa toàn bộ giỏ hàng
  clearCart() {
    this.saveCart([]);
    return [];
  }

  // Tính tổng tiền
  getTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Đếm tổng số sản phẩm
  getItemCount() {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

  // Kiểm tra sách có trong giỏ hàng không
  isInCart(bookId) {
    const cart = this.getCart();
    return cart.some(item => item.id === bookId);
  }

  // Lấy số lượng sách trong giỏ hàng
  getItemQuantity(bookId) {
    const cart = this.getCart();
    const item = cart.find(item => item.id === bookId);
    return item ? item.quantity : 0;
  }
}

export default new CartService();
