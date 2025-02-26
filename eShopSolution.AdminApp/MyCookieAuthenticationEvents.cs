using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace eShopSolution.AdminApp
{
    public class MyCookieAuthenticationEvents : CookieAuthenticationEvents
    {
        public override async Task ValidatePrincipal(CookieValidatePrincipalContext context)
        {
            context.Request.HttpContext.Items.Add("ExpiresUTC", context.Properties.ExpiresUtc);
        }
    }
}
