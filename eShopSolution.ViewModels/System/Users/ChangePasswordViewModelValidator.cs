using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.ViewModels.System.Users
{
    public class ChangePasswordViewModelValidator : AbstractValidator<ChangePasswordViewModel>
    {
        public ChangePasswordViewModelValidator()
        {
            RuleFor(x => x.NewPassword).NotEmpty().WithMessage("Mật khẩu không được để trống")
                 .MinimumLength(8).WithMessage("Mật khẩu phải ít nhất 8 kí tự")
               .Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")
               .WithMessage("Mật khẩu phải bao gồm chữ cái viết hoa, thường và một con số");
        }
    }
}