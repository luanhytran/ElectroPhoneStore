using System.Threading.Tasks;
using eShopSolution.ApiIntegration.Category;
using Microsoft.AspNetCore.Mvc;

namespace eShopSolution.WebApp.Controllers.Components
{
    public class NavigationViewComponent : ViewComponent
    {
        private readonly ICategoryApiClient _categoryApiClient;

        public NavigationViewComponent(ICategoryApiClient categoryApiClient)
        {
            _categoryApiClient = categoryApiClient;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var categoryList = await _categoryApiClient.GetAll();

            return View("Default", categoryList);
        }
    }
}