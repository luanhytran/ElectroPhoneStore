using eShopSolution.Data.Entities;
using eShopSolution.ViewModels.Common;
using eShopSolution.ViewModels.System.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace eShopSolution.Application.System.Users
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly IConfiguration _config;

        public UserService(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
            RoleManager<AppRole> roleManager, IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _config = config;
        }

        // Phương thức Login
        public async Task<string> Authenticate(LoginRequest request)
        {
            // Trả về 1 object AppUser
            var user = await _userManager.FindByNameAsync(request.UserName);
            if (user == null) return null;

            // Tham số cuối là bool : true thì kích hoạt isPersistent ( khi đã login, thì khi tắt project run lại vẫn ko bị logout )
            var result = await _signInManager.PasswordSignInAsync(user, request.Password, request.RememberMe, true);
            if (!result.Succeeded)
            {
                return null;
            }
            var role = await _userManager.GetRolesAsync(user);
            var claims = new[]
            {
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.GivenName,user.FirstName),
                new Claim(ClaimTypes.Role,string.Join(";",role)),
                new Claim(ClaimTypes.Name, request.UserName)
            };

            // Sau khi có được claim thì ta cần mã hóa nó
            // Tokens key và issuer nằm ở appsettings.json và truy cập được thông qua DI 1 Iconfig
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // 1 SecurityToken ( cần cài jwt ) 
            var token = new JwtSecurityToken(_config["Tokens:Issuer"],
                _config["Tokens:Issuer"],
                claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: creds);

            // Khi thành công thì ta sẽ trả về 1 cái string token
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<bool> Register(RegisterRequest request)
        {
            var user = new AppUser()
            {
                Dob = request.Dob,
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                UserName = request.UserName,
                PhoneNumber = request.PhoneNumber
            };

            // Mặc định Password phải có ít nhất 1 lower case và 1 upper case
            var result = await _userManager.CreateAsync(user, request.Password);
            if (result.Succeeded)
            {
                return true;
            }
            return false;
        }

        // Giống get paging product bên Product
        public async Task<PagedResult<UserViewModel>> GetUserPaging(GetUserPagingRequest request)
        {
            var query = _userManager.Users;

            if (!string.IsNullOrEmpty(request.Keyword))
            {
                query = query.Where(x => x.UserName.Contains(request.Keyword)
                        || x.PhoneNumber.Contains(request.Keyword));

            }

            // 3.Paging
            int totalRow = await query.CountAsync();

            var data = await query.Skip((request.PageIndex - 1) * request.PageSize)
                            .Take(request.PageSize)
                            .Select(x => new UserViewModel()
                            {
                                Email = x.Email,
                                PhoneNumber = x.PhoneNumber,
                                UserName = x.UserName,
                                FirstName = x.FirstName,
                                LastName = x.LastName,
                                Id = x.Id
                            }).ToListAsync();

            //4. Select and projection
            var pagedResult = new PagedResult<UserViewModel>()
            {
                Items = data,
                TotalRecord = totalRow
            };

            return pagedResult;
        }
    }
}