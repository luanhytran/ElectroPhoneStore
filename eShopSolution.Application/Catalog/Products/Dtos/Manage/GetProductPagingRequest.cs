using eShopSolution.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.Application.Catalog.Products.Dtos.Manage
{
    public class GetProductPagingRequest : PagingRequestBase
    {
        // keyword để tìm kiếm sản phẩm
        public string Keyword { get; set; }
        public List<int> CategoryIds { get; set; }
    }
}
