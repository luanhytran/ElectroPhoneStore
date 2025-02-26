using System;
using System.Collections.Generic;
using eShopSolution.ViewModels.Utilities.Enums;

namespace eShopSolution.ViewModels.Sales
{
    public class CheckoutRequest
    {
        public Guid? UserID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string? Email { get; set; }
        public string PhoneNumber { get; set; }
        public decimal Total { get; set; }
        public int CouponId { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public List<OrderDetailViewModel> OrderDetails { get; set; } = new List<OrderDetailViewModel>();
    }
}