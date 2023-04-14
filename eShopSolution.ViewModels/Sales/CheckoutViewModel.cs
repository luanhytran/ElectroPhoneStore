using eShopSolution.ViewModels.Sales;
using eShopSolution.ViewModels.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolution.ViewModels.Sales
{
    public class CheckoutViewModel
    {
        public List<CartItemViewModel> CartItems { get; set; }
        public CheckoutRequest CheckoutModel { get; set; }
        public string? Email { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public int Promotion { get; set; }
        public string CouponCode { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
    }
}