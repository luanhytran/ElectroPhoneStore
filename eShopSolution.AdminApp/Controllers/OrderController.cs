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
        public OrderController(IOrderApiClient orderApiClient)
        {
            _orderApiClient = orderApiClient;
        }

        public async Task<IActionResult> Index(int pageIndex = 1, int pageSize = 10)
        {
            var request = new GetManageOrderPagingRequest()
            {
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

            return View(order);
        }

        [HttpGet]
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

        [HttpGet]
        public async Task<IActionResult> CancelOrderStatus(int orderId)
        {
            var result = await _orderApiClient.CancelOrderStatus(orderId);
            if (result)
            {
                TempData["result"] = "Huỷ đơn hàng thành công";
                return RedirectToAction("Index", "Order");
            }

            //ModelState.AddModelError("", "Huỷ đơn hàng thành công");
            TempData["resultFail"] = "Huỷ đơn hàng không thành công";
            return RedirectToAction("Index", "Order");
        }
    }
}
