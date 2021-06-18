using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.ViewModels.Sales
{
    public class CouponUpdateRequest
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public int Count { get; set; }
        public int Promotion { get; set; }
        public string Describe { get; set; }
    }
}