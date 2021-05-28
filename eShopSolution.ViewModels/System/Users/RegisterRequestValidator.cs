using FluentValidation;
using System;

namespace eShopSolution.ViewModels.System.Users
{
    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator()
        {
            // Đây là một phương thức của abstract validator
            RuleFor(x => x.Name).NotEmpty().WithMessage("Tên là bắt buộc")
                .MaximumLength(200).WithMessage("Tên không được quá 200 ký tự");
                
            RuleFor(x => x.Email).NotEmpty().WithMessage("Email là bắt buộc")
                .Matches(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")
                .WithMessage("Định dạng Email không đúng");
                
            RuleFor(x => x.PhoneNumber).NotEmpty().WithMessage("Số điện thoại là bắt buộc");
            
            RuleFor(x => x.UserName).NotEmpty().WithMessage("Tên người dùng là bắt buộc");
            
            RuleFor(x => x.Password).NotEmpty().WithMessage("Mật khẩu là bắt buộc")
                .MinimumLength(6).WithMessage("Mật khẩu phải ít nhất 6 kí tự trở lên");

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