using eShopSolution.Utilities.Constants;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace eShopSolution.ViewModels.Catalog.Products
{
    // create thì không cần id, vì khi create sql sẽ tự động generate id tăng dần
    public class ProductCreateRequest
    {
        [Display(Name = "Giá tiền")]
        public decimal Price { get; set; }

        [Display(Name = "Giá gốc")]
        public decimal OriginalPrice { set; get; }

        [Display(Name = "Số lượng")]
        public int Stock { set; get; }

        [Display(Name = "Tên")]
        public string Name { get; set; }

        [Display(Name = "Mô tả")]
        public string Description { set; get; }

        [Display(Name = "Mô tả chi tiết")]
        public string Details { set; get; }

        [Display(Name = "Mô tả Seo")]
        public string SeoDescription { set; get; }

        [Display(Name = "Tiêu đề Seo")]
        public string SeoTitle { set; get; }

        [Display(Name = "Bí danh Seo")]
        public string SeoAlias { get; set; }

        public string LanguageId { set; get; }

        [Display(Name = "Hình ảnh")]
        public IFormFile ThumbnailImage { get; set; }
    }
}