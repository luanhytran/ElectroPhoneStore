using eShopSolution.Application.Catalog.Products;
using eShopSolution.Application.System.Users;
using eShopSolution.ViewModels.System.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolutionBackendApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("authenticate")]
        // Cho phép người lạ truy cập
        [AllowAnonymous]
        // dùng FromBody thì mới lấy Json được còn FromForm thì không
        public async Task<IActionResult> Authenticate([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Truyền token vào hàm Authencate của UserService để mã hóa token
            var resultToken = await _userService.Authenticate(request);

            if (string.IsNullOrEmpty(resultToken))
            {
                return BadRequest("User name or Password is incorrect");
            }
        
            return Ok(resultToken);
        }

        [HttpPost]
        // Cho phép người lạ truy cập
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _userService.Register(request);
            if (!result)
            {
                return BadRequest("Register is unsucceessful.");
            }
            return Ok();
        }

        // Đường dẫn ví dụ của GetAllPaging
        // http://localhost/api/users/paging?pageIndex=1&pageSize=10&Keyword='Hy'
        [HttpGet("paging")]
        public async Task<IActionResult> GetAllPaging([FromQuery] GetUserPagingRequest request)
        {
            var product = await _userService.GetUserPaging(request);
            return Ok(product);
        }
    }
}