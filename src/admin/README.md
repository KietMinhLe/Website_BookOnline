# Admin Module - Hệ thống quản lý admin

## Cấu trúc thư mục

```
src/admin/
├── components/           # Admin components
│   ├── AdminLayout.js   # Layout chính cho admin
│   ├── AdminRoute.js    # Route protection
│   └── index.js         # Export components
├── pages/               # Admin pages
│   ├── AdminDashboard.js    # Trang tổng quan
│   ├── AdminLoginPage.js    # Trang đăng nhập
│   └── index.js             # Export pages
├── services/            # Admin services
│   ├── AdminService.js  # API service cho admin
│   └── index.js         # Export services
├── utils/               # Admin utilities (tương lai)
└── index.js             # Main export file
```

## Cách sử dụng

### Import từ admin module
```javascript
// Import tất cả
import { AdminLayout, AdminRoute, AdminDashboard, AdminService } from './admin';

// Hoặc import riêng lẻ
import { AdminLayout } from './admin/components';
import { AdminDashboard } from './admin/pages';
import { AdminService } from './admin/services';
```

### Trong App.js
```javascript
import { AdminLayout, AdminRoute, AdminDashboard, AdminLoginPage } from './admin';

// Sử dụng trong routing
<Route path="/admin/login" element={<AdminLoginPage />} />
<Route path="/admin/*" element={
  <AdminRoute>
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
      </Routes>
    </AdminLayout>
  </AdminRoute>
} />
```

## Lợi ích của cấu trúc mới

1. **Tách biệt rõ ràng**: Admin code hoàn toàn tách biệt với public code
2. **Dễ quản lý**: Mỗi module có thư mục riêng với chức năng cụ thể
3. **Import đơn giản**: Chỉ cần import từ `./admin` thay vì đường dẫn dài
4. **Mở rộng dễ dàng**: Thêm tính năng mới vào đúng thư mục
5. **Maintainable**: Code được tổ chức theo chức năng, dễ bảo trì

## Quy tắc đặt tên

- **Components**: PascalCase (AdminLayout, AdminRoute)
- **Pages**: PascalCase với prefix Admin (AdminDashboard, AdminLoginPage)
- **Services**: PascalCase với suffix Service (AdminService)
- **Files**: camelCase cho utilities và helpers

## Tương lai

- Thêm `src/admin/utils/` cho các helper functions
- Thêm `src/admin/hooks/` cho custom hooks
- Thêm `src/admin/context/` cho admin context
- Thêm `src/admin/constants/` cho constants
