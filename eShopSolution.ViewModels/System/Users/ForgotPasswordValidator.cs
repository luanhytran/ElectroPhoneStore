using FluentValidation;

namespace eShopSolution.ViewModels.System.Users
{
    public class ForgotPasswordValidator : AbstractValidator<ForgotPasswordViewModel>
    {
        public ForgotPasswordValidator()
        {
            RuleFor(x => x.Email).NotEmpty().WithMessage("Email không được để trống");
        }
    }
}
