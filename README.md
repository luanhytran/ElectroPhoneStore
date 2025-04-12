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
### Watch video
https://youtu.be/S7mxYxmmoi8?si=WNN-m_Zse2L96kD5

### Or follow below steps:

- Clone code from Github: git clone https://github.com/luanhytran/asp-electro-phone-store.git
- Open solution eShopSolution.sln
- Set startup project is eShopSolution.Data
- Change connection string in `eShopSolution.Data\appsettings.json` and `eShopSolutionBackendApi\appsettings.Development.json`
- Open Tools --> Nuget Package Manager -->  Package Manager Console in Visual Studio
- Set Default project in the console to eShopSolution.Data

  <img src="https://github.com/user-attachments/assets/1d577aec-70d0-4952-bc45-1854f7e783f7" width="500" />

- Run Update-database and Enter.
- After migrate database successful, set Startup Project is eShopSolution.WebApp
- Change database connection in appsettings.Development.json in eShopSolution.WebApp project.
- You need to change 3 projects to self-host profile.

  <img src="https://github.com/luanhytran/web-ban-dien-thoai-cnpmnc/blob/master/image/1.set%20launch%20setting%20for%20each%20project.gif">
  
- Set multiple run project: Right click to Solution and choose Properties and set Multiple Project, choose Start for 3 Projects: BackendApi, WebApp and AdminApp.
- Choose profile to run or press F5
### Setup Email and Stripe
eShopSolution.WebApp/appsettings.json

<img width="486" alt="Screenshot 2025-04-12 at 17 17 18" src="https://github.com/user-attachments/assets/6faf0084-ce6e-4e23-ab29-ee8fed2608b6" />

## How to contribute
- Fork and create your branch
- Create Pull request to us.

## Reference
https://github.com/teduinternational/eShopSolution
