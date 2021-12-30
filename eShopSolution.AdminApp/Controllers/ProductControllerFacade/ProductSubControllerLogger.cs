using Microsoft.Extensions.Logging;

namespace eShopSolution.AdminApp.Controllers.ProductControllerFacade
{
    public class ProductSubControllerLogger
    {
        private readonly ILogger<ProductController> _logger;

        public ProductSubControllerLogger(ILogger<ProductController> logger)
        {
            _logger = logger;
        }

        public void PrintRoutes()
        {
            _logger.LogInformation($@"{GetType().Name}
                Routes:
                GET: Product/Index/
                GET: Product/Create
                POST: Product/Create
                GET: Product/Edit/:id
                POST: Product/Edit/:id
                GET: Product/Detail/:id
                GET: Product/Delete/:id
                POST: Product/Delete/:id
                GET: Product/Duplicate/:id
                POST: Product/Duplicate/:id
                ");
        }
    }
}