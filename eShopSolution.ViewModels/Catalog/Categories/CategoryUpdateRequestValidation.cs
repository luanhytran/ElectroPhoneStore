﻿using FluentValidation;

namespace eShopSolution.ViewModels.Catalog.Categories
{
    public class CategoryUpdateRequestValidation : AbstractValidator<CategoryCreateRequest>
    {
        public CategoryUpdateRequestValidation()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("Tên danh mục không được để trống")
                .MaximumLength(200).WithMessage("Tên danh mục không được vượt quá 200 kí tự");
        }
    }
}
