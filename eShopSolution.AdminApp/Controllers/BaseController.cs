﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace eShopSolution.AdminApp.Controllers
{
    [Authorize]
    public class BaseController : Controller
    {
       
            public override void OnActionExecuting(ActionExecutingContext context)
            {
                var sessions = context.HttpContext.Session.GetString("Token");
                if (sessions == null)
                {
                    context.Result = new RedirectToActionResult("Index", "Login", null);
                }
                base.OnActionExecuting(context);
            }
    }
}
