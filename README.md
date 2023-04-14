# Electro Phone Store 
## Demo: 
- Video: https://youtu.be/4J0rz99bUKU
- Front End: https://electroshop.azurewebsites.net/
- Admin area: https://electroadmin.azurewebsites.net/


## Technologies
- ASP.NET Core 3.1
- Entity Framework Core 3.1

## Install Tools
- .NET Core SDK 3.1
- Git client
- Visual Studio 2019
- SQL Server 2019

## How to configure and run
- Clone code from Github: git clone https://github.com/luanhytran/asp-electro-phone-store.git
- Open solution eShopSolution.sln in Visual Studio 2019
- Set startup project is eShopSolution.Data
- Change connection string in Appsetting.json in eShopSolution.Data project
- Open Tools --> Nuget Package Manager -->  Package Manager Console in Visual Studio
- Run Update-database and Enter.
- After migrate database successful, set Startup Project is eShopSolution.WebApp
- Change database connection in appsettings.Development.json in eShopSolution.WebApp project.
- You need to change 3 projects to self-host profile.

  <img src="https://github.com/luanhytran/web-ban-dien-thoai-cnpmnc/blob/master/image/1.set%20launch%20setting%20for%20each%20project.gif">
  
- Set multiple run project: Right click to Solution and choose Properties and set Multiple Project, choose Start for 3 Projects: BackendApi, WebApp and AdminApp.
- Choose profile to run or press F5

## How to contribute
- Fork and create your branch
- Create Pull request to us.

## Reference
https://github.com/teduinternational/eShopSolution