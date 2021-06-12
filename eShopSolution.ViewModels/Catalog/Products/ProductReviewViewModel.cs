using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.ViewModels.Catalog.Products
{
    public class ProductReviewViewModel
    {
        public string Title { get; set; }
        public List<ReviewViewModel> ListOfReviews { get; set; }
        public string Review { get; set; }
        public int ProductId { get; set; }
        public int Rating { get; set; }
    }
}