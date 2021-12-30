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

        public bool TryGetValue(object key, out PagedResult<ProductViewModel> data)
        {
            return _cache.TryGetValue(key, out data);
        }

        public void SetCache(object key, PagedResult<ProductViewModel> data)
        {
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                        .SetSlidingExpiration(TimeSpan.FromMinutes(300));
            _cache.Set(key, data, cacheEntryOptions);
        }
    }
}