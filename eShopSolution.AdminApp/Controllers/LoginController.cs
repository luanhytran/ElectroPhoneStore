using eShopSolution.ApiIntegration;
using eShopSolution.Utilities.Constants;
using eShopSolution.ViewModels.System.Users;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace eShopSolution.AdminApp.Controllers
{
    // Không kế thừa BaseController vì khi log in thì không cần kiểm tra có token hay không
    public class LoginController : Controller
    {
        private readonly IUserApiClient _userApiClient;

        // Dùng config để lấy key và issuer trong appsettings.json
        private readonly IConfiguration _configuration;

        public LoginController(IUserApiClient userApiClient, IConfiguration configuration)
        {
            _userApiClient = userApiClient;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            string cookie = Request.Cookies["userToken"];
            if(cookie != null)
            {
                var userPrincipal = this.ValidateToken(cookie);

                // tập properties của cookie
                var authProperties = new AuthenticationProperties
                {
                    ExpiresUtc = DateTimeOffset.UtcNow.AddMonths(1),
                    IsPersistent = true,
                    IssuedUtc = DateTimeOffset.UtcNow.AddMonths(1),
                };

                // Set key defaultlanguageId trong session lấy value trong appsettings.json
                HttpContext.Session.SetString(SystemConstants.AppSettings.DefaultLanguageId, _configuration[SystemConstants.AppSettings.DefaultLanguageId]);

                // Set key token trong session bằng token nhận được khi authenticate
                HttpContext.Session.SetString(SystemConstants.AppSettings.Token, cookie);


                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    userPrincipal,
                    authProperties);

                return RedirectToAction("Index", "Home");
            }
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Index(LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return View(request);
            }

            var user = await _userApiClient.GetByUserName(request.UserName);
            
            if(user.ResultObj.Roles.ToString() != "admin")
            {
                ModelState.AddModelError(nameof(request.UserName), "Tài khoản không có quyền truy cập vào trang này");
                return View(request);
            }

            /* Khi đăng nhập thành công thì chúng ta sẽ giả mã token này ra có những claim gì */

            // Nhận 1 token được mã hóa
            var result = await _userApiClient.Authenticate(request);

            if(result.ResultObj == null)
            {
                // Hiển thị thông báo Tài khoản không tồn tại
                ModelState.AddModelError("", result.Message);
                return View();
            }

            if(request.RememberMe == true)
            {
                CookieOptions option = new CookieOptions();
                option.Expires = DateTime.Now.AddMonths(1);
                Response.Cookies.Append("userToken", result.ResultObj, option);
            }

            // Giải mã token đã mã hóa và lấy token, lấy cả các claim đã định nghĩa trong UserService
            // khi debug sẽ thấy nhận được gì  ( có nhận được cả issuer )
            var userPrincipal = this.ValidateToken(result.ResultObj);

            // tập properties của cookie
            var authProperties = new AuthenticationProperties
            {
                ExpiresUtc = DateTimeOffset.UtcNow.AddMonths(1),
                IsPersistent = request.RememberMe,
                IssuedUtc = DateTimeOffset.UtcNow.AddMonths(1),
            };

            // Set key defaultlanguageId trong session lấy value trong appsettings.json
            HttpContext.Session.SetString(SystemConstants.AppSettings.DefaultLanguageId, _configuration[SystemConstants.AppSettings.DefaultLanguageId]);
            
            // Set key token trong session bằng token nhận được khi authenticate
            HttpContext.Session.SetString(SystemConstants.AppSettings.Token, result.ResultObj);


            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                userPrincipal,
                authProperties);

            return RedirectToAction("Index", "Home");
        }

        // Hàm giải mã token ( chứa thông tin về đăng nhập )
        private ClaimsPrincipal ValidateToken(string jwtToken)
        {
            IdentityModelEventSource.ShowPII = true;

            SecurityToken validatedToken;
            TokenValidationParameters validationParameters = new TokenValidationParameters();

            validationParameters.ValidateLifetime = true;

            validationParameters.ValidAudience = _configuration["Tokens:Issuer"];
            validationParameters.ValidIssuer = _configuration["Tokens:Issuer"];
            validationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Tokens:Key"]));


            // Giải mã thông tin claim mà ta đã gắn cho token ấy ( định nghĩa claim trong UserService.cs )
            ClaimsPrincipal principal = new JwtSecurityTokenHandler().ValidateToken(jwtToken, validationParameters, out validatedToken);

            // trả về một principal có token đã giải mã
            return principal;
        }
    }
}
