using eShopSolution.AdminApp.Models;
using eShopSolution.ApiIntegration;
using eShopSolution.Utilities.Constants;
using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Sales;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolution.AdminApp.Controllers
{
    // Authorize: Sẽ chuyển sang trang User/Login ( định nghĩa trong startup bằng serivces.AddAuthorization )
    // Sau đó phải đăng nhập rồi mới được dùng mấy trang này
    [Authorize]
    public class HomeController : BaseController
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IProductApiClient productApiClient;
        private readonly IUserApiClient userApiClient;
        private readonly IOrderApiClient orderApiClient;
        private readonly ICouponApiClient couponApiClient;

        public HomeController(ILogger<HomeController> logger, IProductApiClient productApiClient, IUserApiClient userApiClient,
            IOrderApiClient orderApiClient, ICouponApiClient couponApiClient)
        {
            _logger = logger;
            this.productApiClient = productApiClient;
            this.userApiClient = userApiClient;
            this.orderApiClient = orderApiClient;
            this.couponApiClient = couponApiClient;
        }

        public async Task<IActionResult> Index()
        {
            var products = await productApiClient.GetAll();

            var customers = await userApiClient.GetAll();

            var orders = await orderApiClient.GetAll();

            var coupons = await couponApiClient.GetAll();

            var statisViewModel = new StatisViewModel()
            {
                Products = products.Count(),
                Customers = customers.Count(),
                Orders = orders.Count(),
                Coupons = coupons.Count()
            };

            return View(statisViewModel);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        // Trang error
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public IActionResult Language(NavigationViewModel viewModel)
        {
            HttpContext.Session.SetString(SystemConstants.AppSettings.DefaultLanguageId,
                viewModel.CurrentLanguageId);

            return Redirect(viewModel.ReturnUrl);
        }
    }
}