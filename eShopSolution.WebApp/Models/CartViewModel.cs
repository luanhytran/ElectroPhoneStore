using eShopSolution.ViewModels.Sales;
using System.Collections.Generic;

namespace eShopSolution.WebApp.Models
{
    public class CartViewModel
    {
        public List<CartItemViewModel> CartItems { get; set; }
        public int Promotion { get; set; }
        public string CouponCode { get; set; }
    }
}