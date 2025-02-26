using eShopSolution.ViewModels.Utilities.Enums;

namespace eShopSolution.ViewModels.Sales
{
    public class UpdateOrderStatusViewModel
    {
        public int OrderId { get; set; }
        public OrderStatus status { get; set; }
    }
}
