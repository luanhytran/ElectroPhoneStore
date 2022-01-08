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

        public object GetValue(object key)
        {
            return pscCache.GetValue(key);
        }

        public void SetCache(string key, PagedResult<ProductViewModel> data)
        {
            pscCache.SetCache(key, data);
        }
    }
}