### Tính năng chính
1. **Nhà cung cấp (Supplier)**  
   - Thông tin: tên, địa chỉ, số điện thoại  
   - Thao tác: Thêm, sửa, xóa, xem danh sách  
   - Chỉ quản trị viên (đăng nhập) mới thao tác được

2. **Sản phẩm (Product)**  
   - Thông tin: tên, giá, số lượng, mã tham chiếu đến nhà cung cấp  
   - Thao tác: Thêm, sửa, xóa, xem danh sách  
   - Có thể lọc sản phẩm theo nhà cung cấp và tìm kiếm theo tên  
   - Chỉ quản trị viên (đăng nhập) mới thao tác được

3. **Người dùng (User)**  
   - Thông tin: username, password, email, phone  
   - Chức năng: đăng ký, đăng nhập, quên mật khẩu, đăng xuất  
   - Xác thực sử dụng **cookie và session**

4. **Trang chủ (Home Page)**  
   - Menu lọc sản phẩm theo nhà cung cấp  
   - Thanh công cụ tìm kiếm sản phẩm theo tên  
   - Hiển thị sản phẩm tương ứng

## Công nghệ sử dụng
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  
- **Frontend:** EJS, Bootstrap 5  
- **Session & Authentication:** express-session, cookie  
- **Tools:** Nodemon, Method-Override

## Hướng dẫn cài đặt
1. Clone repo:
   ```bash
   git clone https://github.com/haohaoo78/Lab5_Part_3.git

Cài đặt dependencies:
npm install

Tạo file .env với nội dung:
env:
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/global_haven
SESSION_SECRET=your_secret_key

Chạy ứng dụng:
npm start Hoặc npm node app.js
Truy cập: http://localhost:3000


Hướng dẫn sử dụng
Người dùng:
Đăng ký tài khoản → Đăng nhập → Tìm kiếm sản phẩm hoặc lọc theo nhà cung cấp

Quản trị viên:
Sau khi đăng nhập, có thể truy cập menu quản lý nhà cung cấp và sản phẩm để thực hiện CRUD

Quên mật khẩu:
Truy cập /auth/forgot → Nhập email để nhận liên kết đặt lại mật khẩu

Ghi chú
Chỉ người dùng đăng nhập mới có quyền CRUD nhà cung cấp và sản phẩm
Mật khẩu được hash trước khi lưu vào database
Session lưu thông tin người dùng để hiển thị menu và header động
