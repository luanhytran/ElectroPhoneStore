using eShopSolution.Data.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.Data.Entities
{
    public class Order
    {
        public int Id { set; get; }
        public Guid? UserId { set; get; }

        public DateTime OrderDate { set; get; }

        public OrderStatus Status { set; get; }

        public List<OrderDetail> OrderDetails { get; set; }

        // có property Guid UserId cho nên có khóa ngoại AppUser
        public AppUser AppUser { get; set; }
    }
}
