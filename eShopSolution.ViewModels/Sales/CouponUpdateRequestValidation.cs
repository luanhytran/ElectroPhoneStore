using FluentValidation;

namespace eShopSolution.ViewModels.Sales
{
    public class CouponUpdateRequestValidation : AbstractValidator<CouponUpdateRequest>

    {
        public CouponUpdateRequestValidation()
        {
            RuleFor(x => x.Code).NotEmpty().WithMessage("Mã coupon không được để trống")
                .MaximumLength(5).WithMessage("Mã coupon tối đa 5 kí tự");

            RuleFor(x => x.Count).NotEmpty().WithMessage("Số lượng coupon không được để trống")
                .LessThan(1000).WithMessage("Số lượng coupon được phép sử dụng có tối đa 1.000 lần")
                .GreaterThan(0).WithMessage("Số lượng coupon được phép sử dụng phải lớn hơn 0");

            RuleFor(x => x.Promotion).NotEmpty().WithMessage("Phần trăm giảm không được để trống")
                .LessThan(90).WithMessage("Phần trăm giảm tối đa 90%")
                .GreaterThan(0).WithMessage("Phần trăm giảm phải lớn hơn 0");

            RuleFor(x => x.Describe).NotEmpty().WithMessage("Mô tả coupon không được để trống")
               .MaximumLength(4000).WithMessage("Mô tả coupon có tối đa 4000 kí tự");
        }
    }
}