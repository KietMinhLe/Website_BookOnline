# Thư mục hình ảnh sách

Đây là thư mục chứa hình ảnh bìa sách.

## Cách thêm hình ảnh:

1. **Tải hình ảnh bìa sách** từ internet hoặc scan từ sách thật
2. **Đặt tên file** theo định dạng: `book-[id]-[tên-sách].jpg`
   - Ví dụ: `book-1-dac-nhan-tam.jpg`
   - Ví dụ: `book-2-nha-gia-kim.jpg`
3. **Đặt vào thư mục này** (`public/images/`)
4. **Cập nhật đường dẫn** trong `src/contexts/BookContext.js`:
   ```javascript
   hinhAnh: "/images/book-1-dac-nhan-tam.jpg"
   ```

## Kích thước khuyến nghị:
- **Tỷ lệ**: 3:4 (rộng:cao)
- **Kích thước**: 300x400px hoặc 600x800px
- **Định dạng**: JPG, PNG
- **Dung lượng**: < 500KB

## Các cuốn sách cần hình ảnh:
1. Đắc Nhân Tâm - Dale Carnegie
2. Nhà Giả Kim - Paulo Coelho  
3. Tôi Tài Giỏi, Bạn Cũng Thế - Adam Khoo
4. 7 Thói Quen Của Người Thành Đạt - Stephen R. Covey
5. Sapiens - Lược Sử Loài Người - Yuval Noah Harari
