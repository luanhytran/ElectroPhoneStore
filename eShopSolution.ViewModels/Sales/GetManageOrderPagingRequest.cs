using eShopSolution.ViewModels.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.ViewModels.Sales
{
    public class GetManageOrderPagingRequest : PagingRequestBase
    {
        public string Keyword { get; set; }
        public string? SortOption { get; set; }
    }
}