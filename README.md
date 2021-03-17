## Web bán hàng điện thoại online
- Trần Luân Hy: 18DH110413
- Hoàng Trần An Thiên: 18DH110447
- Lê Quốc Anh: 18DH110446
## Mô tả đề tài
- Tạo ra một website bán điện thoại di động giúp người dùng có thể tìm kiếm sản phẩm, thông tin sản phẩm và so sánh giữa nhiều sản phẩm với nhau trước khi quyết định mua hàng.
- Giúp nhóm phát triển kĩ năng lập trình web bằng công nghệ ASP.NET Core.
- Giúp áp dụng kiến thức được học trong môn Công Nghệ Phần Mềm Nâng Cao
## Công nghệ sử dụng
- ASP.NET Core 3.1
- Entity Framework Core 3.1
## Install Tools
- .NET Core SDK 3.1
- Git client
- Visual Studio 2019
- SQL Server 2019
## Youtube tutorial
- Video list: https://www.youtube.com/playlist?list=PLRhlTlpDUWsyN_FiVQrDWMtHix_E2A_UD
## Cách configure và chạy project
- Clone code from Github: git clone https://github.com/teduinternational/eShopSolution
- Open solution eShopSolution.sln in Visual Studio 2019
- Set startup project is eShopSolution.Data
- Change connection string in Appsetting.json in eShopSolution.Data project
- Open Tools --> Nuget Package Manager -->  Package Manager Console in Visual Studio
- Run Update-database and Enter.
- After migrate database successful, set Startup Project is eShopSolution.WebApp
- Change database connection in appsettings.Development.json in eShopSolution.WebApp project.
- You need to change 3 projects to self-host profile.
- Set multiple run project: Right click to Solution and choose Properties and set Multiple Project, choose Start for 3 Projects: BackendApi, WebApp and AdminApp.
- Choose profile to run or press F5

## Admin template: https://startbootstrap.com/templates/sb-admin/
## Portal template: https://www.free-css.com/free-css-templates/page194/bootstrap-shop

## I18N (Internalization)
- References: https://medium.com/swlh/step-by-step-tutorial-to-build-multi-cultural-asp-net-core-web-app-3fac9a960c43
- Source code: https://github.com/LazZiya/ExpressLocalizationSampleCore3


