using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Common;
using Microsoft.Extensions.Caching.Memory;
using System;

namespace eShopSolution.AdminApp.Controllers.ProductControllerFacade
{
    public class ProductSubControllerCache
    {
        private readonly IMemoryCache _cache;

        public ProductSubControllerCache(IMemoryCache cache)
        {
            _cache = cache;
        }

        public object GetValue(object key)
        {
            return _cache.Get(key);
        }

        public void SetCache(string key, PagedResult<ProductViewModel> data)
        {
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                        .SetSlidingExpiration(TimeSpan.FromMinutes(1));
            _cache.Set(key, data, cacheEntryOptions);
        }
    }
}