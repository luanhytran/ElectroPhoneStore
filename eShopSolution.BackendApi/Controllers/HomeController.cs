using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace eShopSolution.BackendApi.Controllers
{
    public class HomeController : Controller
    {
        public HomeController() { }

        public IActionResult Index()
        {
            return Ok();
        }
    }
}
