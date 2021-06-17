using eShopSolution.ViewModels.Catalog.Categories;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.ViewModels.Catalog.Products
{
    public class ProductViewModel
    {
        public int Id { set; get; }
        public decimal Price { set; get; }
        public int CategoryId { set; get; }
        public int Stock { set; get; }
        public DateTime DateCreated { get; set; }
        public string Name { set; get; }
        public string Description { set; get; }
        public string Details { set; get; }
        public string ThumbnailImage { get; set; }
        public string ProductImage { get; set; }
        public int Rating { get; set; }
        public string Review { get; set; }
        public CategoryViewModel Category { get; set; }
        public List<ReviewViewModel> Reviews { get; set; }
    }
}