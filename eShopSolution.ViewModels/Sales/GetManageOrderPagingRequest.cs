using eShopSolution.ViewModels.Common;

namespace eShopSolution.ViewModels.Sales
{
    public class GetManageOrderPagingRequest : PagingRequestBase
    {
        public string Keyword { get; set; }
        public string? SortOption { get; set; }
    }
}