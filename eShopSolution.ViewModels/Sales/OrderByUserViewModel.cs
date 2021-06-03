using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.ViewModels.Sales
{
    public class OrderByUserViewModel
    {
        public Guid? UserID { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public List<OrderViewModel> Orders { get; set; } 
    }
}
