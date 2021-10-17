using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace eShopSolution.WebApp.Controllers
{
    [Authorize]
    public abstract class BaseControllerTemplateMethod : Controller
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var sessions = context.HttpContext.Session.GetString("Token");
            if (sessions == null)
            {
                context.Result = new RedirectToActionResult("Login", "Login", null);
            }
            base.OnActionExecuting(context);
        }

        protected abstract void PrintRoutes();
        protected abstract void PrintDIs();


        public void PrintInformation()
        {
            PrintRoutes();
            PrintDIs();
        }
    }
}
