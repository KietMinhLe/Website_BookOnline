# Website Bán Sách Online - React MVC

Đây là ứng dụng web bán sách trực tuyến được xây dựng bằng React theo mô hình MVC (Model-View-Controller).

## 🚀 Tính năng

### Đã hoàn thành:
- ✅ **Trang chủ**: Hiển thị danh sách sách nổi bật
- ✅ **Chi tiết sách**: Xem thông tin chi tiết và đánh giá sách
- ✅ **Giỏ hàng**: Thêm, xóa, cập nhật số lượng sản phẩm
- ✅ **Thanh toán**: Form đặt hàng với thông tin giao hàng
- ✅ **Xác nhận đơn hàng**: Trang thông báo đặt hàng thành công
- ✅ **Responsive Design**: Giao diện thân thiện trên mọi thiết bị
- ✅ **State Management**: Quản lý state với React Context API

### Chưa hoàn thành:
- 🔄 **Tìm kiếm**: Chức năng tìm kiếm sách
- 🔄 **Đăng nhập/Đăng ký**: Hệ thống xác thực người dùng
- 🔄 **Danh mục sách**: Lọc sách theo thể loại
- 🔄 **Đánh giá sách**: Hệ thống đánh giá và bình luận
- 🔄 **Quản lý đơn hàng**: Theo dõi trạng thái đơn hàng

## 🏗️ Kiến trúc MVC

### Model (src/models/)
- `BookService.js`: Xử lý API calls cho sách
- `CartService.js`: Quản lý giỏ hàng trong localStorage
- `OrderService.js`: Xử lý API calls cho đơn hàng

### View (src/views/)
- `HomePage.js`: Trang chủ
- `BookDetailPage.js`: Trang chi tiết sách
- `CartPage.js`: Trang giỏ hàng
- `CheckoutPage.js`: Trang thanh toán
- `OrderSuccessPage.js`: Trang xác nhận đơn hàng

### Controller (src/contexts/)
- `BookContext.js`: Quản lý state và logic cho sách
- `CartContext.js`: Quản lý state và logic cho giỏ hàng

### Components (src/components/)
- `Header.js`: Header với navigation và search
- `Footer.js`: Footer với thông tin liên hệ
- `BookCard.js`: Component hiển thị thông tin sách
- `LoadingSpinner.js`: Component loading

## 🛠️ Cài đặt và chạy

### Yêu cầu hệ thống:
- Node.js (phiên bản 14 trở lên)
- npm hoặc yarn

### Cài đặt:

1. **Clone repository:**
```bash
git clone <repository-url>
cd frontend_luanvan
```

2. **Cài đặt dependencies:**
```bash
npm install
```

3. **Chạy ứng dụng:**
```bash
npm start
```

4. **Truy cập ứng dụng:**
Mở trình duyệt và truy cập `http://localhost:3000`

### Scripts có sẵn:
- `npm start`: Chạy ứng dụng ở chế độ development
- `npm build`: Build ứng dụng cho production
- `npm test`: Chạy tests
- `npm run eject`: Eject khỏi Create React App (không thể hoàn tác)

## 📁 Cấu trúc thư mục

```
src/
├── components/          # Các component UI tái sử dụng
│   ├── Header.js
│   ├── Footer.js
│   ├── BookCard.js
│   └── LoadingSpinner.js
├── contexts/           # React Context (Controller)
│   ├── BookContext.js
│   └── CartContext.js
├── models/            # Services (Model)
│   ├── BookService.js
│   ├── CartService.js
│   └── OrderService.js
├── views/             # Pages (View)
│   ├── HomePage.js
│   ├── BookDetailPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── OrderSuccessPage.js
├── utils/             # Utility functions
├── App.js            # Main App component
├── index.js          # Entry point
└── index.css         # Global styles với Tailwind CSS
```

## 🎨 Công nghệ sử dụng

- **React 18**: Thư viện UI chính
- **React Router**: Điều hướng trang
- **Tailwind CSS**: Framework CSS
- **Axios**: HTTP client
- **Context API**: State management
- **LocalStorage**: Lưu trữ giỏ hàng

## 🔧 Cấu hình Backend

Ứng dụng frontend được thiết kế để kết nối với backend Node.js. Cấu hình API endpoint trong file `src/models/BookService.js`:

```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

Đảm bảo backend đang chạy trên port 3000 và có các endpoint:
- `GET /api/baiViet` - Lấy danh sách sách
- `GET /api/baiViet/:id` - Lấy chi tiết sách
- `GET /api/danhMuc` - Lấy danh mục sách
- `POST /api/donHang` - Tạo đơn hàng mới

## 📱 Responsive Design

Ứng dụng được thiết kế responsive với Tailwind CSS:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🚀 Deployment

### Build cho production:
```bash
npm run build
```

### Deploy lên Vercel:
```bash
npm install -g vercel
vercel
```

### Deploy lên Netlify:
1. Build project: `npm run build`
2. Upload thư mục `build` lên Netlify

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Dự án này được phân phối dưới MIT License.

## 📞 Liên hệ

- Email: support@bookstore.com
- Website: https://bookstore.com

---

**Lưu ý**: Đây là phiên bản demo. Để sử dụng trong production, cần thêm các tính năng bảo mật, validation, và error handling đầy đủ hơn.