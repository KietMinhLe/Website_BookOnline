# Chức năng Đăng nhập và Đăng ký

## Tổng quan
Hệ thống authentication đã được tích hợp hoàn chỉnh vào ứng dụng BookStore với các tính năng sau:

## Các tính năng đã triển khai

### 1. Authentication Context (`src/contexts/AuthContext.js`)
- Quản lý trạng thái đăng nhập/đăng xuất
- Lưu trữ thông tin user và token
- Tự động kiểm tra token khi khởi động ứng dụng
- Cung cấp các hàm: `login`, `register`, `logout`, `clearError`

### 2. Auth Service (`src/models/AuthService.js`)
- Xử lý các API calls liên quan đến authentication
- Bao gồm: login, register, getCurrentUser, updateProfile, changePassword, forgotPassword, resetPassword, verifyToken

### 3. Trang Đăng nhập (`src/views/LoginPage.js`)
- Form đăng nhập với email và mật khẩu
- Validation form
- Hiển thị lỗi từ server
- Tự động redirect sau khi đăng nhập thành công
- Link đến trang đăng ký

### 4. Trang Đăng ký (`src/views/RegisterPage.js`)
- Form đăng ký với đầy đủ thông tin:
  - Họ và tên (bắt buộc)
  - Email (bắt buộc)
  - Mật khẩu và xác nhận mật khẩu (bắt buộc)
  - Số điện thoại (tùy chọn)
  - Địa chỉ (tùy chọn)
  - Đồng ý điều khoản sử dụng (bắt buộc)
- Validation form phía client
- Responsive design cho mobile và desktop

### 5. Header với User Menu (`src/components/Header.js`)
- Hiển thị nút đăng nhập khi chưa đăng nhập
- Hiển thị dropdown menu với thông tin user khi đã đăng nhập
- Các tùy chọn: Thông tin cá nhân, Đơn hàng, Sách yêu thích, Đăng xuất
- Responsive cho mobile và desktop

### 6. Protected Routes (`src/components/ProtectedRoute.js`)
- Bảo vệ các route cần đăng nhập
- Tự động redirect đến trang login nếu chưa đăng nhập
- Hiển thị loading spinner khi đang kiểm tra authentication

### 7. Các trang User
- **ProfilePage** (`src/views/ProfilePage.js`): Hiển thị thông tin cá nhân
- **OrdersPage** (`src/views/OrdersPage.js`): Danh sách đơn hàng
- **FavoritesPage** (`src/views/FavoritesPage.js`): Sách yêu thích

## Cách sử dụng

### 1. Đăng ký tài khoản mới
1. Truy cập `/register`
2. Điền đầy đủ thông tin bắt buộc
3. Đồng ý với điều khoản sử dụng
4. Nhấn "Đăng ký tài khoản"

### 2. Đăng nhập
1. Truy cập `/login`
2. Nhập email và mật khẩu
3. Nhấn "Đăng nhập"

### 3. Truy cập các trang được bảo vệ
- `/profile` - Thông tin cá nhân
- `/orders` - Đơn hàng của tôi
- `/favorites` - Sách yêu thích

### 4. Đăng xuất
- Click vào avatar/tên user ở header
- Chọn "Đăng xuất" từ dropdown menu

## Cấu hình API

Để kết nối với backend API, cập nhật biến môi trường:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

## Cấu trúc API Endpoints

Các endpoint cần được triển khai ở backend:

- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `GET /api/auth/me` - Lấy thông tin user hiện tại
- `PUT /api/auth/profile` - Cập nhật thông tin user
- `PUT /api/auth/change-password` - Đổi mật khẩu
- `POST /api/auth/forgot-password` - Quên mật khẩu
- `POST /api/auth/reset-password` - Reset mật khẩu
- `POST /api/auth/verify` - Xác thực token

## Lưu trữ dữ liệu

- Token và thông tin user được lưu trong `localStorage`
- Tự động xóa khi đăng xuất
- Tự động load khi khởi động ứng dụng

## Responsive Design

Tất cả các trang authentication đều được thiết kế responsive:
- Mobile-first approach
- Breakpoints: 320px, 480px, 768px, 1024px, 1200px+
- Tối ưu cho cả mobile và desktop

## Bảo mật

- Validation form phía client
- Token được lưu trữ an toàn
- Tự động logout khi token hết hạn
- Protected routes ngăn truy cập trái phép
