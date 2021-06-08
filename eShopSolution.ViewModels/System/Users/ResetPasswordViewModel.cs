using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace eShopSolution.ViewModels.System.Users
{
    public class ResetPasswordViewModel
    {
        [EmailAddress]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu xác nhận")]
        [Compare("Password", ErrorMessage = "Mật khẩu xác nhận và mật khẩu bạn đã nhập phải khớp với nhau")]
        public string ConfirmPassword { get; set; }
        public string Token { get; set; }
    }
}
