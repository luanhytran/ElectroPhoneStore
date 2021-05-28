using eShopSolution.Data.EF;
using eShopSolution.Data.Entities;
using eShopSolution.ViewModels.Common;
using eShopSolution.ViewModels.Sales;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eShopSolution.Application.Catalog.Orders
{
    public class OrderService : IOrderService
    {
        private readonly EShopDbContext _context;
        private readonly UserManager<AppUser> _userManager;


        public OrderService(EShopDbContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public int Create(CheckoutRequest request)
        {
            var orderDetails = new List<OrderDetail>();

            foreach (var item in request.OrderDetails)
            {
                var product =  _context.Products.Find(item.ProductId);
                orderDetails.Add(new OrderDetail()
                {
                    Product = product,
                    Quantity = item.Quantity,
                });
            }

            //Guid g = new Guid("69BD714F-9576-45BA-B5B7-F00649BE00DE");
            //var user = _context.Users.Find(g);

            var order = new Order()
            {
                OrderDate = DateTime.Now,
                OrderDetails = orderDetails,
                //AppUser = user
            };

            _context.Orders.Add(order);
            return _context.SaveChanges();
        }
    }
}
