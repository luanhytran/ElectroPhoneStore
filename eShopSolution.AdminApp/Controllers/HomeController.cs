using eShopSolution.AdminApp.Models;
using eShopSolution.Utilities.Constants;
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

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            // lấy user name đăng nhập
            var user = User.Identity.Name;
            var expireTime = HttpContext.Items["ExpiresUTC"];
            return View();
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