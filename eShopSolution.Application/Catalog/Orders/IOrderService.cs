using eShopSolution.Data.Enums;
using eShopSolution.ViewModels.Common;
using eShopSolution.ViewModels.Sales;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eShopSolution.Application.Catalog.Orders
{
    public interface IOrderService
    {
        int Create(CheckoutRequest request);

        Task<PagedResult<OrderViewModel>> GetAllPaging(GetManageOrderPagingRequest request);

        Task<ApiResult<bool>> UpdateOrderStatus(int orderId);

        Task<ApiResult<bool>> CancelOrderStatus(int orderId);

        Task<OrderByUserViewModel> GetOrderByUser(string userId);

        List<OrderDetailViewModel> GetOrderDetails(int orderId);

        OrderViewModel GetOrderById(int orderId);
    }
}