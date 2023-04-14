using EmailService;
using eShopSolution.ApiIntegration;
using eShopSolution.Utilities.Constants;
using eShopSolution.ViewModels.System.Users;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace eShopSolution.WebApp.Controllers
{
    public class LoginController : Controller
    {
        private readonly IUserApiClient _userApiClient;
        private readonly IOrderApiClient _orderApiClient;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public LoginController(IUserApiClient userApiClient, IOrderApiClient orderApiClient,
            IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _userApiClient = userApiClient;
            _orderApiClient = orderApiClient;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public async Task<IActionResult> Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            if (!ModelState.IsValid)
                return View(request);

            var result = await _userApiClient.Authenticate(request);

            if (!result.IsSuccessed)
            {
                ModelState.AddModelError("", result.Message);
                return View(request);
            }

            if (request.RememberMe == true)
            {
                CookieOptions option = new CookieOptions();
                option.Expires = DateTime.Now.AddMonths(1);
                Response.Cookies.Append("customerToken", result.ResultObj, option);
            }

            var userPrincipal = this.ValidateToken(result.ResultObj);

            var authProperties = new AuthenticationProperties
            {
                ExpiresUtc = DateTimeOffset.UtcNow.AddMonths(1),
                IsPersistent = request.RememberMe
            };

            HttpContext.Session.SetString(SystemConstants.AppSettings.Token, result.ResultObj);

            await HttpContext.SignInAsync(
                        CookieAuthenticationDefaults.AuthenticationScheme,
                        userPrincipal,
                        authProperties);

            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            Response.Cookies.Delete("customerToken");
            await HttpContext.SignOutAsync(
                        CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterRequest registerRequest)
        {
            if (!ModelState.IsValid)
                return View(registerRequest);

            var result = await _userApiClient.RegisterUser(registerRequest);

            if (!result.IsSuccessed)
            {
                ModelState.AddModelError("", result.Message);
                return View(registerRequest);
            }

            var token = result.ResultObj;
            var user = await _userApiClient.GetByUserName(registerRequest.UserName);
            var confirmationLink = Url.Action(nameof(ConfirmEmail), "Login", new { token, email = user.ResultObj.Email }, Request.Scheme);
            //var message = await MailUtils.MailUtils.SendGmail("hytranluan@gmail.com", user.ResultObj.Email,
            //                                                  "Link xác nhận email", confirmationLink,
            //                                                  "your_email_here", "your_password_here");

            var email = new EmailService.EmailService();
            email.Send("hytranluan@gmail.com", user.ResultObj.Email, "XÁC NHẬN TÀI KHOẢN", confirmationLink);
            return RedirectToAction(nameof(SuccessRegistration));
        }

        [HttpGet]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var confirmEmailVm = new ConfirmEmailViewModel()
            {
                token = token,
                email = email
            };

            var result = await _userApiClient.ConfirmEmail(confirmEmailVm);

            return View(result.IsSuccessed ? nameof(ConfirmEmail) : "Error");
        }

        [HttpGet]
        public IActionResult SuccessRegistration()
        {
            return View();
        }

        private ClaimsPrincipal ValidateToken(string jwtToken)
        {
            IdentityModelEventSource.ShowPII = true;

            SecurityToken validatedToken;
            TokenValidationParameters validationParameters = new TokenValidationParameters();

            validationParameters.ValidateLifetime = true;

            validationParameters.ValidAudience = _configuration["Tokens:Issuer"];
            validationParameters.ValidIssuer = _configuration["Tokens:Issuer"];
            validationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Tokens:Key"]));

            ClaimsPrincipal principal = new JwtSecurityTokenHandler().ValidateToken(jwtToken, validationParameters, out validatedToken);

            return principal;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel request)
        {
            if (!ModelState.IsValid)
                return View(request);

            var token = await _userApiClient.ForgotPassword(request);
            var passwordResetLink = Url.Action(nameof(ResetPassword), "Login",
                                    new { email = request.Email, token = token.ResultObj }, Request.Scheme);
            //var message = await MailUtils.MailUtils.SendGmail("hytranluan@gmail.com", request.Email,
            //                                            "Link khôi phục mật khẩu", passwordResetLink,
            //                                            "your_email_here", "your_password_here");

            var email = new EmailService.EmailService();
            email.Send("hytranluan@gmail.com", request.Email, "Link khôi phục mật khẩu", passwordResetLink);

            return View("ForgotPasswordConfirmation");
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPassword(string token, string email)
        {
            if (token == null || email == null)
            {
                ModelState.AddModelError("", "Token khôi phục mật khẩu không phù hợp");
            }
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            var resetPasswordVm = new ResetPasswordViewModel()
            {
                Token = model.Token,
                Email = model.Email,
                Password = model.Password,
                ConfirmPassword = model.ConfirmPassword
            };

            var result = await _userApiClient.ResetPassword(resetPasswordVm);

            return View(result.IsSuccessed ? "ResetPasswordConfirmation" : "Error");
        }
    }
}