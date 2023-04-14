using eShopSolution.ApiIntegration;
using eShopSolution.ViewModels.Sales;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolution.AdminApp.Controllers
{
    public class OrderController : BaseController
    {
        private readonly IOrderApiClient _orderApiClient;
        private readonly IProductApiClient _productApiClient;

        public OrderController(IOrderApiClient orderApiClient, IProductApiClient productApiClient)
        {
            _orderApiClient = orderApiClient;
            _productApiClient = productApiClient;
        }

        public async Task<IActionResult> Index(string keyword, int pageIndex = 1, int pageSize = 10)
        {
            var request = new GetManageOrderPagingRequest()
            {
                Keyword = keyword,
                PageIndex = pageIndex,
                PageSize = pageSize,
            };

            var data = await _orderApiClient.GetPagings(request);

            if (TempData["result"] != null)
            {
                ViewBag.SuccessMsg = TempData["result"];
            }
            else
            {
                ViewBag.FailMsg = TempData["resultFail"];
            }

            return View(data);
        }

        public async Task<IActionResult> Detail(string name, int orderId)
        {
            var order = await _orderApiClient.GetOrderById(orderId);
            order.Name = name;

            foreach (var item in order.OrderDetails)
            {
                var product = await _productApiClient.GetById(item.ProductId);
                item.Name = product.Name;
                item.Price = product.Price;
                item.ThumbnailImage = product.ThumbnailImage;
            }

            return View(order);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateOrderStatus(int orderId)
        {
            var result = await _orderApiClient.UpdateOrderStatus(orderId);
            if (result)
            {
                TempData["result"] = "Cập nhật trạng thái đơn hàng thành công";
                return RedirectToAction("Index");
            }

            TempData["resultFail"] = "Cập nhật trạng thái đơn hàng không thành công";
            return RedirectToAction("Index", "Order");
        }

        [HttpPost]
        public async Task<IActionResult> CancelOrderStatus(int orderId)
        {
            var result = await _orderApiClient.CancelOrderStatus(orderId);
            if (result)
            {
                TempData["CancelOrderSuccessful"] = "Huỷ đơn hàng thành công";
                return RedirectToAction("Index", "Order");
            }

            //ModelState.AddModelError("", "Huỷ đơn hàng thành công");
            TempData["resultFail"] = "Huỷ đơn hàng không thành công";
            return RedirectToAction("Index", "Order");
        }
    }
}