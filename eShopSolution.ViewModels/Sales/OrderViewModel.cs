using System;
using System.Collections.Generic;
using System.Text;
using eShopSolution.ViewModels.Utilities.Enums;

namespace eShopSolution.ViewModels.Sales
{
    public class OrderViewModel
    {
        public int Id { set; get; }
        public Guid? UserID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime OrderDate { set; get; }
        public OrderStatus Status { set; get; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public decimal Price { get; set; }
        //public List<OrderDetailViewModel> OrderDetails { get; set; } = new List<OrderDetailViewModel>();
    }
}
