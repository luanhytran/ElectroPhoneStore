using FluentValidation;
using System;

namespace eShopSolution.ViewModels.System.Users
{
    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator()
        {
            // Đây là một phương thức của abstract validator
            RuleFor(x => x.Name).NotEmpty().WithMessage("Tên khách hàng không được để trống")
                .MaximumLength(200).WithMessage("Tên không được quá 200 ký tự");

            RuleFor(x => x.Email).NotEmpty().WithMessage("Email không được để trống")
                .Matches(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")
                .WithMessage("Định dạng Email không đúng");

            RuleFor(x => x.PhoneNumber).NotEmpty().WithMessage("Số điện thoại không được để trống")
                .MaximumLength(12).WithMessage("Số điện thoại không được quá 12 kí tự");

            RuleFor(x => x.UserName).NotEmpty().WithMessage("Tên tài khoản không được để trống");

            RuleFor(x => x.Address).NotEmpty().WithMessage("Địa chỉ không được để trống")
                .MaximumLength(500).WithMessage("Địa chỉ không được quá 500 kí tự");

            RuleFor(x => x.Password).NotEmpty().WithMessage("Mật khẩu không được để trống")
                .MinimumLength(8).WithMessage("Mật khẩu phải ít nhất 8 kí tự")
                .Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")
                .WithMessage("Mật khẩu phải bao gồm chữ cái viết hoa, thường và một con số");

            // Khi ta viết => {} thì sẽ tự động hiểu request là của Register và context là của CustomContext
            RuleFor(x => x).Custom((request, context) =>
              {
                  if (request.Password != request.ConfirmPassword)
                  {
                      context.AddFailure("Mật khẩu xác nhận không khớp với mật khẩu");
                  }
              });
        }
    }
}