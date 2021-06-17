using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.ViewModels.Sales
{
    public class OrderDetailViewModel
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { set; get; }
        public string Name { set; get; }
        public string Category { get; set; }
        public string ThumbnailImage { get; set; }
    }
}