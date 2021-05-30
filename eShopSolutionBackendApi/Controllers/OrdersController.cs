using eShopSolution.Application.Catalog.Orders;
using eShopSolution.Data.Enums;
using eShopSolution.ViewModels.Common;
using eShopSolution.ViewModels.Sales;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolutionBackendApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }


        [HttpPost("createOrder")]
        [AllowAnonymous]
        public IActionResult CreateOrder([FromBody] CheckoutRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = _orderService.Create(request);

            return Ok();
        }

        [HttpGet("paging")]
        public async Task<IActionResult> GetAllPaging([FromQuery] GetManageOrderPagingRequest request)
        {
            var order = await _orderService.GetAllPaging(request);
            return Ok(order);
        }

        [HttpPut("updateOrderStatus/{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateOrderStatus([FromRoute] int id)
        {
            await _orderService.UpdateOrderStatus(id);
            return Ok();
        }

        [HttpPut("cancelOrderStatus/{id}")]
        [Authorize]
        public async Task<IActionResult> CancelOrderStatus([FromRoute] int id)
        {
            await _orderService.CancelOrderStatus(id);
            return Ok();
        }
    }
}