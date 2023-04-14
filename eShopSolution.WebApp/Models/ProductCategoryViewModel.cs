using eShopSolution.ViewModels.Catalog.Categories;
using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolution.WebApp.Models
{
    public class ProductCategoryViewModel : PagingRequestBase
    {
        public CategoryViewModel Category { get; set; }

        public PagedResult<ProductViewModel> Products { get; set; }
    }
}
