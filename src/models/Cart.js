// Cart Model
export class Cart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.updatedAt = new Date();
  }

  // Methods
  addItem(book, quantity = 1) {
    const existingItem = this.items.find(item => item.book.id === book.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        book: book,
        quantity: quantity,
        addedAt: new Date()
      });
    }
    
    this.calculateTotal();
    this.updatedAt = new Date();
  }

  removeItem(bookId) {
    this.items = this.items.filter(item => item.book.id !== bookId);
    this.calculateTotal();
    this.updatedAt = new Date();
  }

  updateQuantity(bookId, quantity) {
    const item = this.items.find(item => item.book.id === bookId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(bookId);
      } else {
        item.quantity = quantity;
        this.calculateTotal();
        this.updatedAt = new Date();
      }
    }
  }

  clear() {
    this.items = [];
    this.total = 0;
    this.updatedAt = new Date();
  }

  calculateTotal() {
    this.total = this.items.reduce((sum, item) => {
      return sum + (item.book.price * item.quantity);
    }, 0);
  }

  // Getter methods
  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  getTotalItems() {
    return this.items.length;
  }

  getFormattedTotal() {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(this.total);
  }

  isEmpty() {
    return this.items.length === 0;
  }

  // Static methods
  static fromJSON(json) {
    const cart = new Cart();
    cart.items = json.items.map(item => ({
      book: item.book,
      quantity: item.quantity,
      addedAt: new Date(item.addedAt)
    }));
    cart.total = json.total;
    cart.updatedAt = new Date(json.updatedAt);
    return cart;
  }

  toJSON() {
    return {
      items: this.items.map(item => ({
        book: item.book,
        quantity: item.quantity,
        addedAt: item.addedAt
      })),
      total: this.total,
      updatedAt: this.updatedAt
    };
  }
}

