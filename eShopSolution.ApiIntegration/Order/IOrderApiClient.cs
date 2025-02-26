using System.Threading.Tasks;
using eShopSolution.ViewModels.Common;
using eShopSolution.ViewModels.Sales;

namespace eShopSolution.ApiIntegration.Order
{
    public interface IOrderApiClient
    {
        Task<string> CreateOrder(CheckoutRequest request);

        Task<PagedResult<OrderViewModel>> GetPagings(GetManageOrderPagingRequest request);

        Task<bool> UpdateOrderStatus(int id);

        Task<bool> CancelOrderStatus(int id);

        Task<OrderByUserViewModel> GetOrderByUser(string id);

        Task<OrderViewModel> GetOrderById(int orderId);
    }
}