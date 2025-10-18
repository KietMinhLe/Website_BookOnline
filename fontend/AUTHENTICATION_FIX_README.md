# 🔧 Sửa lỗi Authentication - Hướng dẫn sử dụng

## ✅ **Đã sửa các vấn đề:**

### **1. Lỗi API không tồn tại**
- **Vấn đề**: AuthContext đang gọi API thật (`/api/auth/login`, `/api/auth/register`) nhưng không có server
- **Giải pháp**: Thay thế bằng mock authentication sử dụng localStorage

### **2. Lỗi import BookFilter**
- **Vấn đề**: CategoriesPage import component `BookFilter` không tồn tại
- **Giải pháp**: Xóa import và thay thế bằng filter đơn giản inline

### **3. Lỗi CSS z-index**
- **Vấn đề**: Các form elements không thể click được do bị che khuất
- **Giải pháp**: Thêm CSS để đảm bảo tất cả form elements có thể click được

## 🚀 **Cách sử dụng:**

### **Đăng nhập:**
1. Truy cập `/login`
2. Sử dụng một trong các tài khoản test:
   - **Admin**: `admin@bookstore.com` / `123456`
   - **User**: `user@bookstore.com` / `123456`

### **Đăng ký:**
1. Truy cập `/register`
2. Điền đầy đủ thông tin bắt buộc (có dấu *)
3. Đồng ý với điều khoản sử dụng
4. Nhấn "Đăng ký tài khoản"

### **Tính năng:**
- ✅ **Mock Authentication**: Không cần server thật
- ✅ **LocalStorage**: Lưu trữ thông tin user
- ✅ **Form Validation**: Kiểm tra dữ liệu đầu vào
- ✅ **Error Handling**: Hiển thị lỗi rõ ràng
- ✅ **Auto Redirect**: Tự động chuyển hướng sau khi đăng nhập/đăng ký
- ✅ **Responsive**: Hoạt động tốt trên mọi thiết bị

## 🔧 **Cấu trúc Mock Data:**

### **Users có sẵn:**
```javascript
// Admin user
{
  id: 1,
  email: 'admin@bookstore.com',
  password: '123456',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin'
}

// Regular user
{
  id: 2,
  email: 'user@bookstore.com',
  password: '123456',
  firstName: 'John',
  lastName: 'Doe',
  role: 'user'
}
```

### **Users đăng ký mới:**
- Được lưu trong `localStorage` với key `registeredUsers`
- Tự động có role `user`
- Có thể đăng nhập ngay sau khi đăng ký

## 🎯 **Các trang hoạt động:**

- **`/login`** - Trang đăng nhập
- **`/register`** - Trang đăng ký
- **`/profile`** - Trang cá nhân (cần đăng nhập)
- **`/orders`** - Trang đơn hàng (cần đăng nhập)
- **`/favorites`** - Trang yêu thích (cần đăng nhập)

## 🐛 **Debug:**

Nếu gặp vấn đề:
1. Mở Developer Tools (F12)
2. Kiểm tra Console tab để xem lỗi
3. Kiểm tra Application > Local Storage để xem dữ liệu user
4. Đảm bảo tất cả dependencies đã được cài đặt

## 📝 **Lưu ý:**

- Đây là mock authentication, không phải production
- Dữ liệu chỉ lưu trong browser (localStorage)
- Để sử dụng thật, cần thay thế mock functions bằng API calls thật
- Tất cả passwords đều được lưu dạng plain text (chỉ để demo)