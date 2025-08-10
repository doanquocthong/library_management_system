# Hệ Thống Quản Lý Thư Viện (Library Management System)

## 📖 Giới thiệu

Hệ thống quản lý thư viện là một ứng dụng web full-stack hiện đại được xây dựng để quản lý sách, người dùng và các hoạt động của thư viện. Hệ thống cung cấp giao diện thân thiện cho người dùng và panel quản trị mạnh mẽ cho quản trị viên.

## 🛠️ Công nghệ sử dụng

### Backend

- **Java 17** - Ngôn ngữ lập trình chính
- **Spring Boot 3.5.3** - Framework backend
- **Spring Data JPA** - ORM và quản lý cơ sở dữ liệu
- **Maven** - Quản lý dependencies
- **Lombok** - Giảm boilerplate code

### Frontend

- **Next.js 15.4.5** - React framework với server-side rendering
- **React 19.1.0** - Thư viện UI
- **Tailwind CSS 4.1.11** - Framework CSS utility-first
- **Lucide React** - Icon library

## 🏗️ Kiến trúc hệ thống

```
library_management_system/
├── backend/          # Spring Boot API
│   ├── src/main/java/com/example/library_management_service/
│   │   ├── Controller/     # REST API endpoints
│   │   ├── Entity/         # JPA entities (User, Book, Role)
│   │   ├── Repository/     # Data access layer
│   │   ├── Service/        # Business logic
│   │   └── DTO/           # Data transfer objects
│   └── pom.xml
└── frontend/         # Next.js web application
    ├── app/               # App router pages
    ├── components/        # Reusable UI components
    └── package.json
```

## ✨ Tính năng chính

### Người dùng

- 🔐 Đăng ký và đăng nhập tài khoản
- 📚 Duyệt danh mục sách
- 🔍 Tìm kiếm sách theo tên, tác giả, thể loại
- 📖 Xem thông tin chi tiết sách
- ⭐ Xem sách nổi bật và đề xuất

### Quản trị viên

- 👥 Quản lý người dùng
- 📚 Quản lý sách (thêm, sửa, xóa, ẩn/hiện)
- 📊 Dashboard thống kê
- 🏷️ Phân loại sách theo danh mục

## 🚀 Cách chạy dự án

### Yêu cầu hệ thống

- Java 17+
- Node.js 18+
- Maven 3.6+

### Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

API sẽ chạy tại: `http://localhost:8080`

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Web app sẽ chạy tại: `http://localhost:3000`

## 📊 Cơ sở dữ liệu

Hệ thống sử dụng các entity chính:

- **User**: Quản lý thông tin người dùng
- **Book**: Thông tin sách (tên, tác giả, thể loại, số lượng)
- **Role**: Phân quyền người dùng

## 🔧 Cấu hình

### Backend

Cấu hình database và server trong `backend/src/main/resources/application.properties`

### Frontend

Cấu hình Next.js trong `frontend/next.config.mjs`

## 📱 Giao diện

- **Trang chủ**: Hiển thị sách nổi bật, danh mục, blog preview
- **Trang đăng nhập/đăng ký**: Xác thực người dùng
- **Admin panel**: Dashboard quản trị với sidebar navigation

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📝 License

Dự án này được phát triển cho mục đích học tập và nghiên cứu.

## 👨‍💻 Tác giả

Được phát triển bởi đội ngũ phát triển Library Management System.

---

⚡ **Quick Start**: Chạy backend trước, sau đó chạy frontend để trải nghiệm đầy đủ hệ thống!
