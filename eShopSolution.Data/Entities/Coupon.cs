using System.Collections.Generic;

namespace eShopSolution.Data.Entities
{
    public class Coupon
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public int Count { get; set; }
        public int Promotion { get; set; }
        public string Describe { get; set; }
        public List<Order> Orders { get; set; }
    }
}