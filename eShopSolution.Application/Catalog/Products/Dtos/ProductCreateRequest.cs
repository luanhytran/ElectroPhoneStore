using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.Application.Catalog.Products.Dtos
{
    public class ProductCreateRequest
    {
        public decimal Price { get; set; }
        public string Name { get; set; }
    }
}
