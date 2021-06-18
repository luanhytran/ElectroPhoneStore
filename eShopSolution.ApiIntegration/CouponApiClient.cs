using eShopSolution.Utilities.Constants;
using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Common;
using eShopSolution.ViewModels.Sales;
using Microsoft.AspNetCore.Http;
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
    public class CouponApiClient : BaseApiClient, ICouponApiClient
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;

        public CouponApiClient(IHttpClientFactory httpClientFactory,
                   IHttpContextAccessor httpContextAccessor,
                    IConfiguration configuration)
            : base(httpClientFactory, httpContextAccessor, configuration)
        {
            _httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
            _httpClientFactory = httpClientFactory;
        }

        public async Task<bool> CreateCoupon(CouponCreateRequest request)
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
            var response = await client.PostAsync($"/api/coupons/", httpContent);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> DeleteCoupon(int id)
        {
            return await Delete($"/api/coupons/" + id);
        }

        public async Task<PagedResult<CouponViewModel>> GetAllPaging(GetManageProductPagingRequest request)
        {
            var data = await GetAsync<PagedResult<CouponViewModel>>(
               $"/api/coupons/paging?pageIndex={request.PageIndex}" +
               $"&pageSize={request.PageSize}" +
               $"&keyword={request.Keyword}&sortOption={request.SortOption}");

            return data;
        }

        public async Task<List<CouponViewModel>> GetAll()
        {
            return await GetListAsync<CouponViewModel>("/api/coupons");
        }

        public async Task<CouponViewModel> GetById(int id)
        {
            return await GetAsync<CouponViewModel>($"/api/coupons/{id}");
        }

        public async Task<bool> UpdateCoupon(CouponUpdateRequest request)
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
            var response = await client.PutAsync($"/api/coupons/updateCoupon", httpContent);
            return response.IsSuccessStatusCode;
        }
    }
}