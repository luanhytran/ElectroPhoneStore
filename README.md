# Web bán hàng điện thoại online
- Trần Luân Hy: 18DH110413
- Hoàng Trần An Thiên: 18DH110447
- Lê Quốc Anh: 18DH110446
## I. Mô tả đề tài
- Tạo ra một website bán điện thoại di động giúp người dùng có thể tìm kiếm sản phẩm, thông tin sản phẩm và so sánh giữa nhiều sản phẩm với nhau trước khi quyết định mua hàng. Có chức năng thêm vào giỏ hàng, đa ngôn ngữ và quản lý sản phẩm dễ dùng.
## II. Công nghệ sử dụng
- ASP.NET Core 3.1
- Entity Framework Core 3.1
## III. Install require tools
- .NET Core SDK 3.1.409
- Git bash
- Visual Studio 2019
- SQL Server 2019
### Entity Framework Core
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



