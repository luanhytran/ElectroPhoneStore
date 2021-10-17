using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolution.AdminApp.Models
{
    public class StatisViewModel
    {
        public int Products { get; set; }
        public int Customers { get; set; }
        public int Orders { get; set; }
        public int Coupons { get; set; }
    }
}