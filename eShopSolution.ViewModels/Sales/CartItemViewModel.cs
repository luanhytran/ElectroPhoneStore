using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolution.ViewModels.Sales
{
    public class CartItemViewModel
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public decimal Price { get; set; }
    }
}