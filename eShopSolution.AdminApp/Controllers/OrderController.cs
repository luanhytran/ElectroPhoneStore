using eShopSolution.ApiIntegration;
using eShopSolution.ViewModels.Sales;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolution.AdminApp.Controllers
{
    public class OrderController : Controller
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


            return View(data);
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

            ModelState.AddModelError("", "Cập nhật trạng thái đơn hàng thành công");
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

            ModelState.AddModelError("", "Huỷ đơn hàng thành công");
            return RedirectToAction("Index", "Order");
        }
    }
}
