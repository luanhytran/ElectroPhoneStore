using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Common;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

namespace eShopSolution.AdminApp.Controllers.ProductControllerFacade
{
    public class ProductFacade
    {
        private ProductSubControllerLogger pscLogger;
        private ProductSubControllerCache pscCache;

        public ProductFacade(ILogger<ProductController> logger, IMemoryCache cache)
        {
            pscLogger = new ProductSubControllerLogger(logger);
            pscCache = new ProductSubControllerCache(cache);
        }

        public void PrintRoutes()
        {
            pscLogger.PrintRoutes();
        }

        public bool TryGetValue(object key, out PagedResult<ProductViewModel> data)
        {
            return pscCache.TryGetValue(key, out data);
        }

        public void SetCache(object key, PagedResult<ProductViewModel> data)
        {
            pscCache.SetCache(key, data);
        }
    }
}