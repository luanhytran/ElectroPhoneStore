using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.ViewModels.Catalog.Products
{
    public class ProductUpdateRequestValidation : AbstractValidator<ProductUpdateRequest>
    {
        public ProductUpdateRequestValidation()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("Tên sản phẩm không được để trống")
               .MaximumLength(200).WithMessage("Tên không được quá 200 ký tự");

            RuleFor(x => x.Description)
               .MaximumLength(1000).WithMessage("Mô tả không được quá 1000 ký tự");

            RuleFor(x => x.Details)
                .MaximumLength(10000).WithMessage("Mô tả chi tiết không được quá 10000 ký tự");

            RuleFor(x => x.SeoDescription)
                .MaximumLength(200).WithMessage("Mô tả Seo không được quá 200 ký tự");

            RuleFor(x => x.SeoAlias)
                .MaximumLength(200).WithMessage("Bí danh Seo không được quá 200 ký tự");

            RuleFor(x => x.SeoTitle)
                .MaximumLength(200).WithMessage("Tiêu đề Seo không được quá 200 ký tự");
        }
    }
}