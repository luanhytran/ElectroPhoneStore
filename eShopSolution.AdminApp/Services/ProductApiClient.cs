using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace eShopSolution.AdminApp.Services
{
    // Chỉ kế thừa được 1 class nhưng implement được nhiều interface
    public class ProductApiClient : BaseApiClient, IProductApiClient
    {
        // Dùng chung các properties với base class nên không cần khai báo
        public ProductApiClient(IHttpClientFactory httpClientFactory,
                   IHttpContextAccessor httpContextAccessor,
                    IConfiguration configuration) : base(httpClientFactory, httpContextAccessor,  configuration)
        {
        }


        public async Task<PagedResult<ProductViewModel>> GetPagings(GetManageProductPagingRequest request)
        {
            // Lấy tất cả sản phẩm ra: gọi đến hàm GetAllPaging trong project BackendApi
            var data = await GetAsync<PagedResult<ProductViewModel>>(
                $"/api/products/paging?pageIndex={request.PageIndex}" +
                $"&pageSize={request.PageSize}" + 
                $"&keyword={request.Keyword}&languageId={request.LanguageId}");

            return data;
        }
    }
}
