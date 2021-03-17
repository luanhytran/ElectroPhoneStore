using eShopSolution.ViewModels.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.ViewModels.Catalog.Products.Manage
{
    public class GetProductPagingRequest : PagingRequestBase
    {
        // keyword để tìm kiếm sản phẩm
        public string Keyword { get; set; }
        public List<int> CategoryIds { get; set; }
    }
}
