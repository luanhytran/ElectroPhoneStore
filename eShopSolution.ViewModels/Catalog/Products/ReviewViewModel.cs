using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.ViewModels.Catalog.Products
{
    public class ReviewViewModel
    {
        public int Id { get; set; }
        public Guid UserId { set; get; }
        public string UserName { get; set; }
        public int ProductId { get; set; }
        public int Rating { get; set; }
        public string Comments { get; set; }
        public DateTime PublishedDate { get; set; }
    }
}