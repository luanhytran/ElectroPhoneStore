using eShopSolution.ViewModels.Catalog.Categories;
using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Utilities.Slides;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolution.WebApp.Models
{
    public class HomeViewModel
    {
        public List<ProductViewModel> FeaturedProducts { get; set; }

        public List<ProductViewModel> LatestProducts { get; set; }

        public List<CategoryViewModel> Categories { get; set; }
    }
}
