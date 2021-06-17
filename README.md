# Web bán hàng điện thoại online

## Thành viên
- Trần Luân Hy: 18DH110413
- Hoàng Trần An Thiên: 18DH110447
- Lê Quốc Anh: 18DH110446

## I. Mô tả đề tài

<p> Ngày nay, công nghệ thông tin đã có những bước phát triển mạnh mẽ trong mọi phương diện nói chung ví dụ như : đời sống, công việc, giải trí, truyền thông, ... Và riêng với bán hàng, so với cách bán truyền thống thì nay doanh nghiệp, cửa hàng nhỏ lẻ nào cũng có một website để quáng bá, bán hàng trực tuyến sản phẩm và tương tác với người dùng. Nắm bắt được nhu cầu đó, nhóm em quyết định thực hiện đề tài: Xây dựng Website bán điện thoại online dùng công nghệ ASP.NET Core. Khi sử dụng trang web khách hàng sẽ cảm nhận được sự mới mẻ và thuận tiện của Website mang lại . Và website cũng dễ dàng cung cấp thông tin chi tiết sản phẩm giúp khách hàng có thể thanh toán trực tiếp qua thẻ tín dụng hoặc nhận hàng rồi thanh toán.</p>

## 🖋️ERD - Phân tích hệ thống - Thiết kế cơ sở dữ liêu🖋️
### ✏️ERD✏️
<img src="https://github.com/luanhytran/electro-phone-store/blob/master/image/ERD%20Electro%20Phone%20Store%20CNPM_NC%20(3).jpg" raw="true" />

### ✏️Phân tích hệ thống và Thiết kế cơ sở dữ liệu✏️

#### 🛠️Thiết kế cơ sở dữ liệu🛠️

- **USERS**  bao gồm: ID, Name, Email, PhoneNumber, Address, UserName, Password
  - Đây là bảng lưu các tài khoản người dùng trong hệ thống khi thuộc về mỗi một khách hàng khi khách hàng đăng ký tài khoản
  - **Name** là tên user
  - **Email** là email user
  - **PhoneNumber** là số điện thoại user
  - **Address** là địa chỉ user
  - **UserName** là tên tài khoản user
  - **Password** là mật khẩu user
  - Một user là một tài khoản do khách hàng đăng ký và trong hệ thống chỉ có 1 user là admin được code sẵn
  - Một user có một hoặc nhiều Order và một Order chỉ thuộc về một Customer
  - User có ID nằm trong quyền Admin của bảng APP_ROLES mới truy cập trang admin được
  - Phân tích quản lý khách hàng phía admin ở #132 

- **PRODUCTS** bao gồm: ID, CategoryID, Name, Description, Details, Price, Stock, Thumbnail, Image
  - Đây là bảng lưu các sản phẩm có trong hệ thống
  - **CategoryID** là id của danh mục sản phẩm được gán cho sản phẩm này
  - **Name** là tên sản phẩm
  - **Description** là thông số kỹ thuật sản phẩm
  - **Details** là mô tả chi tiết sản phẩm
  - **Price** là giá sản phẩm
  - **Stock** là số lượng sản phẩm
  - **Thumbnail** là ảnh đại diện của sản phẩm
  - **Image** là ảnh đầy đủ của sản phẩm
  - Một Product có một Category và một Category thuộc về một hoặc nhiều Product
    - Mỗi Category được định danh bằng CategoryID
    - Description là mô tả thông số kĩ thuật điện thoại, mô tả ngắn gọn hơn
    - Details là mô tả sản phẩm chi tiết hơn, giới thiệu sâu hơn các tính năng của điện thoại đó
  - Một Product thuộc về một hoặc nhiều Order_Detail và một Order_Detail chỉ có một Product
  - Thumbnail là ảnh đại diện để khách hàng xem trong danh sách sản phẩm phía client
  - ProductImage là ảnh có độ phân giải lớn hơn dùng ở trang chi tiết sản phẩm
  - Phân tích quản lý sản phẩm ở #131 

- **CATEGORIES** bao gồm: ID, Name
  - Đây là bảng lưu danh mục của sản phẩm
  - **Name** là tên một danh mục sản phẩm
  - Một category (danh mục) sẽ chỉ định danh mục sản phẩm của một sản phẩm
  - Một Category thuộc về một hoặc nhiều Product và một Product có một Category
  - Phân tích quản lý danh mục phía admin ở #138

- **ORDERS** bao gồm: ID, UserID, OrderDate, Status, ShipAddress, ShipName và ShipPhoneNumber
  - Đây là bảng lưu các đơn đặt hàng của user được phát sinh khi user đặt hàng
  - **UserID** là ID của user đặt hàng
  - **OrderDate** là ngày đặt hàng
  - **Status** là trạng thái đơn hàng
  - **ShipAddress** là địa chỉ nhận hàng
  - **ShipName** là tên người nhận hàng
  - **ShipPhoneNumber** là số điện thoại người nhận hàng
  - ShipAddress, ShipName, ShipPhoneNumber là thông tin giao hàng và có thể được thay đổi bởi người đặt hàng khi muốn giao đến cho địa chỉ cụ thể nào đó hoặc người nào đó 
  - Một Order thuộc về một Customer và một Customer có một hoặc nhiều Order
    - Mỗi Customer được định danh bằng UserID
  - Một Order có một hoặc nhiều Order detail và một Order detail chỉ thuộc về một Order
  - Đơn hàng có các trạng thái: Đang chờ duyệt, Đã duyệt, Đang giao, Đã giao và Đã hủy
  - Phân tích quá trình đặt hàng ở #137 
  - Phân tích quản lý đơn hàng phía admin ở #130 

- **ORDER_DETAILS** bao gồm: OrderID, ProductID, Quantity
  - Đây là bảng lưu chi tiết cụ thể của một Order (đơn hàng) trong  hệ thống
  - **OrderID** là id của đơn hàng mà chi tiết đơn hàng này thuộc về
  - **ProductID** là id của sản phẩm được đặt mua
  - **Quantity** là số lượng sản phẩm được đặt mua
  - Cột tổng tiền của một chi tiết đơn hàng không lưu vào CSDL mà hiển thị lên web bằng cách code giá sản phẩm nhân số lượng
  - Một Order_Detail chỉ thuộc về một Order và một Order có một hoặc hoặc nhiều Order_Detail
    - Mỗi Order được định danh bằng OrderID
  - Một Order_Detail chỉ có một Product và một Product thuộc về một hoặc nhiều Order_Detail
    - Mỗi Product được định danh bằng ProductID 

- **APP_ROLES** bao gồm: ID, UserID, Name
  - Đây là bảng lưu quyền của một tài khoản user
  - **UserID** là id định danh một user có quyền tương ứng
  - **Name** là tên quyền
  - Một user chỉ có một quyền và một quyền có thể thuộc về một hoặc nhiều user
  - Bảng tồn tại chỉ để phục việc ai có thể truy cập trang admin và hệ thống không có chức năng phân quyền
  - Quyền admin mặc định chỉ thuộc về một user là admin và trong hệ thống cũng chỉ có một user admin

- **REVIEWS** bao gồm: ID, ProductID, UserID, Rating, Comment, PublishDate
  - Đây là bảng lưu các đánh giá sản phẩm của khách hàng
  - **ProductID** là id của sản phẩm được đánh giá 
  - **UserID** là id của người dùng đánh giá
  - **Rating** là sao của một đánh giá
  - **Comment** là nội dung của một đánh giá
  - **PublishDate** là ngày đánh giá
  - Một User có một hoặc nhiều Review nhưng một Review chỉ thuộc về một và chỉ một User 
  - Một Product có một hoặc nhiều Review nhưng một Review chỉ thuộc về một và chỉ một Product 

- **COUPONS** bao gồm: ID, Code, Count, Promotion, Describe
  - Đây là bảng lưu tất cả các mã giảm giá trong hệ thống 
  - **Code** là mã coupon
  - **Count** là số lần sử dụng
  - **Promotion** là phần trăm giảm
  - **Describe** là mô tả khuyến mãi
  - Một Order chỉ có một Coupon nhưng một Coupon có thể thuộc về một hoặc nhiều Order

#### 🛠️Phân tích hệ thống🛠️

## II. Công nghệ sử dụng
- ASP.NET Core 3.1
- Entity Framework Core 3.1
## III. Phần mềm cần thiết
- .NET Core SDK 3.1.409
- Git bash
- Visual Studio 2019
- SQL Server 2019

### Các NuGet Package cần thiết
```
dotnet add package Microsoft.EntityFrameworkCore --version 3.1.15
```
```
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 3.1.15
```
```
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 3.1.15
```

## IV. Hướng dẫn chạy project
### 1. Set lauch setting for each project
<img src="https://github.com/luanhytran/web-ban-dien-thoai-cnpmnc/blob/master/image/1.set%20launch%20setting%20for%20each%20project.gif">

### 2. Start multiple project
<img src="https://github.com/luanhytran/web-ban-dien-thoai-cnpmnc/blob/master/image/2.%20start%20multiple%20project.gif"> 

### 3. Run Entity Framework Core command
- After this step, SQL Server will appear your database
<img src="https://github.com/luanhytran/web-ban-dien-thoai-cnpmnc/blob/master/image/3.%20setup%20database.gif" >

### 4. Add user-content folder
- Add this folder to store your product image
<img src="https://github.com/luanhytran/electro-phone-store/blob/master/image/4.png">



