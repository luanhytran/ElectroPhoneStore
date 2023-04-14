using eShopSolution.ViewModels.Catalog.Categories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace eShopSolution.ViewModels.Catalog.Products
{
    // thường ta chỉ update các property trong translation
    public class ProductUpdateRequest
    {
        public int Id { set; get; }

        [Display(Name = "Tên sản phẩm")]
        public string Name { get; set; }

        [Display(Name = "Danh mục")]
        public int CategoryId { set; get; }

        [Display(Name = "Giá tiền")]
        public decimal Price { get; set; }

        [Display(Name = "Số lượng")]
        public int Stock { set; get; }

        [Display(Name = "Thông số kỹ thuật")]
        public string Description { set; get; }

        [Display(Name = "Mô tả chi tiết")]
        public string Details { set; get; }

        [Display(Name = "Ảnh đại diện")]
        public IFormFile ThumbnailImage { get; set; }

        [Display(Name = "Ảnh đầy đủ")]
        public IFormFile ProductImage { get; set; }

        public List<CategoryViewModel> Categories { get; set; } = new List<CategoryViewModel>();
    }
}
