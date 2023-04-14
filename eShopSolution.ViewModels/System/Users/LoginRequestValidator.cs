using FluentValidation;
using System;

namespace eShopSolution.ViewModels.System.Users
{
    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator()
        {
            // Đây là một phương thức của abstract validator
            RuleFor(x => x.UserName).NotEmpty().WithMessage("Tên tài khoản không được để trống");

            RuleFor(x => x.Password).NotEmpty().WithMessage("Mật khẩu không được để trống");
        }
    }
}