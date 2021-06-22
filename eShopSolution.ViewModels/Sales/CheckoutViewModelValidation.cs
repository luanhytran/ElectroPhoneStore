using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.ViewModels.Sales
{
    public class CheckoutViewModelValidation : AbstractValidator<CheckoutViewModel>
    {
        public CheckoutViewModelValidation()
        {
            RuleFor(x => x.CheckoutModel.Name).NotEmpty().WithMessage("Tên không được để trống")
                .MaximumLength(200).WithMessage("Tên không được quá 200 ký tự");

            RuleFor(x => x.CheckoutModel.Address).NotEmpty().WithMessage("Địa chỉ không được để trống")
                .MaximumLength(500).WithMessage("Địa chỉ không được quá 500 kí tự");

            RuleFor(x => x.CheckoutModel.PhoneNumber).NotEmpty().WithMessage("Số điện thoại không được để trống")
                .MaximumLength(12).WithMessage("Số điện thoại không được quá 12 kí tự");
        }
    }
}