using eShopSolution.ViewModels.Catalog.Categories;
using System;
using System.Collections.Generic;

namespace eShopSolution.ViewModels.Catalog.Products
{
    public interface ProductPrototype
    {
        ProductPrototype Clone();
    }

    public class ProductViewModel : ProductPrototype
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

        public ProductPrototype Clone()
        {
            ProductViewModel newProduct = new ProductViewModel();
            newProduct.Price = Price;
            newProduct.Stock = Stock;
            newProduct.Name = Name;
            newProduct.Category = Category;
            newProduct.CategoryId = CategoryId;
            newProduct.Description = Description;
            newProduct.Details = Details;
            newProduct.ThumbnailImage = ThumbnailImage;
            newProduct.ProductImage = ProductImage;

            return newProduct;

        }
    }
}