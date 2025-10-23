# BookStore Frontend - Website Bán Sách Online

Website bán sách online hiện đại được xây dựng với ReactJS theo mô hình MVC3 và Bootstrap 5.

## 🚀 Tính năng chính

- **Trang chủ**: Hiển thị sách bán chạy, sách mới nhất
- **Danh sách sách**: Tìm kiếm, lọc, sắp xếp sách
- **Chi tiết sách**: Xem thông tin chi tiết, đánh giá
- **Giỏ hàng**: Thêm/xóa sách, cập nhật số lượng
- **Đăng ký/Đăng nhập**: Quản lý tài khoản người dùng
- **Thanh toán**: Trang thanh toán (đang phát triển)
- **Responsive**: Giao diện thân thiện trên mọi thiết bị

## 🏗️ Kiến trúc MVC3

### Models (`src/models/`)
- `Book.js` - Model cho sách
- `User.js` - Model cho người dùng
- `Cart.js` - Model cho giỏ hàng
- `Order.js` - Model cho đơn hàng

### Views (`src/views/`)
- `HomePage.js` - Trang chủ
- `BooksPage.js` - Danh sách sách
- `BookDetailPage.js` - Chi tiết sách
- `CartPage.js` - Giỏ hàng
- `LoginPage.js` - Đăng nhập
- `RegisterPage.js` - Đăng ký
- `ProfilePage.js` - Thông tin cá nhân
- `OrdersPage.js` - Đơn hàng
- `CheckoutPage.js` - Thanh toán

### Controllers (`src/controllers/`)
- `BookController.js` - Logic xử lý sách
- `UserController.js` - Logic xử lý người dùng
- `CartController.js` - Logic xử lý giỏ hàng
- `OrderController.js` - Logic xử lý đơn hàng

### Services (`src/services/`)
- `BookService.js` - API calls cho sách
- `UserService.js` - API calls cho người dùng
- `OrderService.js` - API calls cho đơn hàng

## 🛠️ Công nghệ sử dụng

- **React 18** - Framework frontend
- **React Router 6** - Routing
- **Bootstrap 5** - UI framework
- **React Bootstrap** - Bootstrap components cho React
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Toastify** - Notifications

## 📦 Cài đặt và chạy

1. **Cài đặt dependencies:**
```bash
npm install
```

2. **Chạy ứng dụng:**
```bash
npm start
```

3. **Mở trình duyệt:**
```
http://localhost:3000
```

## 🔧 Cấu hình

### Environment Variables
Tạo file `.env` trong thư mục gốc:
```
REACT_APP_API_URL=http://localhost:3001/api
```

### API Endpoints
Ứng dụng sẽ kết nối với backend API tại:
- Books: `GET /api/books`
- Users: `POST /api/users/login`
- Orders: `POST /api/orders`

## 📁 Cấu trúc thư mục

```
src/
├── components/
│   └── layout/
│       ├── Header.js
│       ├── Footer.js
│       └── Layout.js
├── controllers/
│   ├── BookController.js
│   ├── UserController.js
│   ├── CartController.js
│   ├── OrderController.js
│   └── index.js
├── models/
│   ├── Book.js
│   ├── User.js
│   ├── Cart.js
│   ├── Order.js
│   └── index.js
├── services/
│   ├── BookService.js
│   ├── UserService.js
│   ├── OrderService.js
│   └── index.js
├── views/
│   ├── HomePage.js
│   ├── BooksPage.js
│   ├── BookDetailPage.js
│   ├── CartPage.js
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── ProfilePage.js
│   ├── OrdersPage.js
│   ├── CheckoutPage.js
│   └── NotFoundPage.js
├── App.js
├── index.js
└── index.css
```

## 🎨 UI/UX Features

- **Responsive Design**: Tương thích với mobile, tablet, desktop
- **Modern UI**: Sử dụng Bootstrap 5 với custom styling
- **Interactive Elements**: Hover effects, animations
- **User Feedback**: Loading states, error handling
- **Accessibility**: ARIA labels, keyboard navigation

## 🔐 Authentication

- JWT token-based authentication
- Protected routes
- User session management
- Role-based access (Customer/Admin)

## 🛒 Shopping Cart

- Local storage persistence
- Real-time updates
- Quantity management
- Price calculations with tax and shipping

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 992px
- **Desktop**: > 992px

## 🚀 Deployment

### Build for production:
```bash
npm run build
```

### Deploy to Netlify/Vercel:
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.

## 📞 Support

Nếu có vấn đề hoặc câu hỏi, vui lòng tạo issue trên GitHub hoặc liên hệ qua email.

---

**Lưu ý**: Đây là phiên bản frontend. Backend API cần được triển khai riêng để ứng dụng hoạt động đầy đủ.
