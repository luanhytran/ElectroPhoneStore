using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.ViewModels.Catalog.ProductImages
{
    public class ProductImageCreateRequest
    {
        //không cần product id  vì bên ngoài api productcontroller đã có tham số product id 
        //public int ProductId { get; set; }

        public string Caption { get; set; }

        public bool IsDefault { get; set; }

        public int SortOrder { get; set; }

        public IFormFile ImageFile { get; set; }
    }
}
