using eShopSolution.ViewModels.Common;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolution.AdminApp.Controllers.Components
{
    public class PagerViewComponent : ViewComponent
    {
        public Task<IViewComponentResult> InvokeAsync(PagedResultBase result)
        {
            // Tất cả những thằng nào mà muốn phân trang thì chỉ cần truyền vào đây thôi
            return Task.FromResult((IViewComponentResult)View("Default", result));
        }
    }
}
