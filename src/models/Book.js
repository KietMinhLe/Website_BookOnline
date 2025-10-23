// Book Model
export class Book {
  constructor(id, title, author, price, description, image, category, stock, rating = 0, reviews = []) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.price = price;
    this.description = description;
    this.image = image;
    this.category = category;
    this.stock = stock;
    this.rating = rating;
    this.reviews = reviews;
    this.createdAt = new Date();
  }

  // Getter methods
  getFormattedPrice() {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(this.price);
  }

  getAverageRating() {
    if (this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / this.reviews.length).toFixed(1);
  }

  isInStock() {
    return this.stock > 0;
  }

  // Static methods for data manipulation
  static fromJSON(json) {
    return new Book(
      json.id,
      json.title,
      json.author,
      json.price,
      json.description,
      json.image,
      json.category,
      json.stock,
      json.rating,
      json.reviews || []
    );
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      price: this.price,
      description: this.description,
      image: this.image,
      category: this.category,
      stock: this.stock,
      rating: this.rating,
      reviews: this.reviews,
      createdAt: this.createdAt
    };
  }
}

