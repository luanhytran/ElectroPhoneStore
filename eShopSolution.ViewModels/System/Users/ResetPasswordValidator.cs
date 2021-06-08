using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.ViewModels.System.Users
{
    public class ResetPasswordValidator : AbstractValidator<ResetPasswordViewModel>
    {
        public ResetPasswordValidator()
        {
            RuleFor(x => x.Email).NotEmpty().WithMessage("Email không được để trống");

            RuleFor(x => x.Password).NotEmpty().WithMessage("Mật khẩu không được để trống");
        }
    }
}
