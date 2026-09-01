# Sub-ASMS

Ứng dụng quản lý linh kiện IT/văn phòng độc lập, xây dựng từ SRS: quản lý theo barcode, nhập hàng theo lô, dữ liệu nền, audit log, bộ lọc lưu sẵn, xuất Excel và staging ticket Portal.

## Khởi chạy

1. Cài các thư viện: `npm install`.
2. Sao chép `.env.example` thành `.env` và điền chuỗi kết nối PostgreSQL **riêng** cho Sub-ASMS.
3. Tạo Prisma Client: `npm run db:generate`.
4. Tạo các bảng: `npm run db:push`.
5. Nạp dữ liệu nền ví dụ: `npm run db:seed`.
6. Chạy ứng dụng: `npm run dev` — mặc định tại `http://localhost:3100`.

## Chú ý triển khai

- `BarcodeSequence` được tăng trong serializable transaction nhằm cấp mã không trùng khi nhập đồng thời.
- Mỗi đơn vị trong lô là một bản ghi `Asset` với barcode độc lập; serial number có thể để trống.
- Cấu hình `PORTAL_WEBHOOK_URL` để gửi thông báo sau khi một Draft Ticket được xác nhận.
- Authentication hiện là lớp MVP (Admin mặc định); nên đặt phía sau SSO/reverse proxy hoặc thay bằng OAuth/SAML trước khi production.
