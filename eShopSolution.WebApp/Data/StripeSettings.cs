using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolution.WebApp.Data
{
    public class StripeSettings
    {
        public string PublishableKey { get; set; }
        public string SecretKey { get; set; }
    }
}