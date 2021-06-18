using eShopSolution.Utilities.Constants;
using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Common;
using eShopSolution.ViewModels.Sales;
using eShopSolution.ViewModels.Utilities.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace eShopSolution.ApiIntegration
{
    public class OrderApiClient : BaseApiClient, IOrderApiClient
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _configuration;

        public OrderApiClient(IHttpClientFactory httpClientFactory, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
            : base(httpClientFactory, httpContextAccessor, configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<string> CreateOrder(CheckoutRequest request)
        {
            var sessions = _httpContextAccessor
                            .HttpContext
                            .Session
                            .GetString(SystemConstants.AppSettings.Token);

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_configuration[SystemConstants.AppSettings.BaseAddress]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", sessions);
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync($"/api/orders/createOrder", httpContent);
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadAsStringAsync();
            }
            return "Failed";
        }

        public async Task<PagedResult<OrderViewModel>> GetPagings(GetManageOrderPagingRequest request)
        {
            var data = await GetAsync<PagedResult<OrderViewModel>>(
                $"/api/orders/paging?pageIndex={request.PageIndex}" +
                $"&pageSize={request.PageSize}");

            return data;
        }

        public async Task<OrderByUserViewModel> GetOrderByUser(string id)
        {
            var data = await GetAsync<OrderByUserViewModel>(
                $"/api/orders/userOrders/{id}");

            return data;
        }

        public async Task<OrderViewModel> GetOrderById(int orderId)
        {
            var data = await GetAsync<OrderViewModel>(
                $"/api/orders/getOrderById/{orderId}");

            return data;
        }

        public async Task<bool> UpdateOrderStatus(int id)
        {
            var sessions = _httpContextAccessor
                             .HttpContext
                             .Session
                             .GetString(SystemConstants.AppSettings.Token);
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_configuration[SystemConstants.AppSettings.BaseAddress]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", sessions);
            var json = JsonConvert.SerializeObject(id);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PatchAsync($"/api/orders/updateOrderStatus/{id}", httpContent);
            if (response.IsSuccessStatusCode)
                return true;
            return false;
        }

        public async Task<bool> CancelOrderStatus(int id)
        {
            var sessions = _httpContextAccessor
                            .HttpContext
                            .Session
                            .GetString(SystemConstants.AppSettings.Token);

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_configuration[SystemConstants.AppSettings.BaseAddress]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", sessions);
            var json = JsonConvert.SerializeObject(id);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PatchAsync($"/api/orders/cancelOrderStatus/{id}", httpContent);
            if (response.IsSuccessStatusCode)
                return true;
            return false;
        }
    }
}