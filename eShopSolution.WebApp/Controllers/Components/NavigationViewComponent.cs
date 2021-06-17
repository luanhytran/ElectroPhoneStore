using eShopSolution.ApiIntegration;
using eShopSolution.ViewModels.Catalog.Products;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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