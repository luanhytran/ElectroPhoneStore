using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.ViewModels.Catalog.Products
{
    public class ProductCreateRequestValidation : AbstractValidator<ProductCreateRequest>
    {
        public ProductCreateRequestValidation()
        {
            RuleFor(x => x.Price)
                .LessThan(100000000).WithMessage("Giá tiền phải nhỏ hơn 100.000.000")
                .GreaterThanOrEqualTo(0).WithMessage("Giá tiền phải lớn hơn 0");

            RuleFor(x => x.OriginalPrice)
                .LessThan(100000000).WithMessage("Giá gốc phải lớn hơn 0")
                .GreaterThanOrEqualTo(0).WithMessage("Giá gốc phải nhỏ hơn 100.000.000");

            RuleFor(x => x.Stock)
                .LessThan(10000).WithMessage("Só lượng phải lớn hơn 0")
                .GreaterThanOrEqualTo(0).WithMessage("Số lượng phải nhỏ hơn 10.000");

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