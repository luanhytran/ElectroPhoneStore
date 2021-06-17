using eShopSolution.Data.EF;
using eShopSolution.Data.Entities;
using eShopSolution.ViewModels.Common;
using eShopSolution.ViewModels.Utilities.Enums;
using eShopSolution.ViewModels.Sales;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using eShopSolution.ViewModels.System.Users;

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

        // Create Order
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

                product.Stock -= item.Quantity;
            }

            var order = new Order()
            {
                UserId = request?.UserID,
                OrderDate = DateTime.Now,
                OrderDetails = orderDetails,
                Status = (Data.Enums.OrderStatus) 1,
                ShipName = request.Name,
                ShipAddress = request.Address,
                ShipPhoneNumber = request.PhoneNumber
            };

            _context.Orders.Add(order);
            return _context.SaveChanges();
        }

        public async Task<ApiResult<bool>> UpdateOrderStatus(int orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            var status = (int) order.Status;

            switch (status)
            {
                case 1:
                    order.Status = (Data.Enums.OrderStatus) 2;
                    break;
                case 2:
                    order.Status = (Data.Enums.OrderStatus)3;
                    break;
                case 3:
                    order.Status = (Data.Enums.OrderStatus)4;
                    break;
            }

            await _context.SaveChangesAsync();
            return new ApiSuccessResult<bool>();
        }

        public async Task<ApiResult<bool>> CancelOrderStatus(int orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);

            order.Status = (Data.Enums.OrderStatus) 5;

            await _context.SaveChangesAsync();
            return new ApiSuccessResult<bool>();
        }

        public async Task<PagedResult<OrderViewModel>> GetAllPaging(GetManageOrderPagingRequest request)
        {
            var query = from o in _context.Orders 
                        join c in _userManager.Users on o.UserId equals c.Id
                        select new { o, c };


            //3. Paging
            int totalRow = await query.CountAsync();

            var data = await query.Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(x => new OrderViewModel()
                {
                    Id = x.o.Id,
                    UserID = x.o.UserId,
                    Name = x.c.Name,
                    Address = x.c.Address,
                    PhoneNumber = x.c.PhoneNumber,
                    Email = x.c.Email,
                    OrderDate = x.o.OrderDate,
                    Status = (OrderStatus)x.o.Status,
                    ShipName = x.o.ShipName,
                    ShipAddress = x.o.ShipAddress,
                    ShipPhoneNumber = x.o.ShipPhoneNumber,
                }).ToListAsync();

            var order = data.ToList();
            foreach(var item in order)
            {
                item.Price = GetOrderPrice(GetOrderDetails(item.Id));
                //item.OrderDetails = GetOrderDetails(item.Id);
            }

            //4. Select and projection
            var pagedResult = new PagedResult<OrderViewModel>()
            {
                TotalRecords = totalRow,
                PageSize = request.PageSize,
                PageIndex = request.PageIndex,
                Items = data
            };
            return pagedResult;
        }

        public async Task<OrderByUserViewModel> GetOrderByUser(string userId)
        {
            var Guid = new Guid(userId);

            // get user's order
            var query = from o in _context.Orders
                        join c in _userManager.Users on o.UserId equals c.Id
                        where c.Id == Guid
                        select new { o, c };

            var data = await query
                 .Select(x => new OrderViewModel()
                 {
                     Id = x.o.Id,
                     UserID = x.o.UserId,
                     Name = x.c.Name,
                     Address = x.c.Address,
                     PhoneNumber = x.c.PhoneNumber,
                     Email = x.c.Email,
                     OrderDate = x.o.OrderDate,
                     Status = (OrderStatus)x.o.Status,
                     ShipName = x.o.ShipName,
                     ShipAddress = x.o.ShipAddress,
                     ShipPhoneNumber = x.o.ShipPhoneNumber,

                 }).ToListAsync();

            var orderList = data.ToList();

            foreach (var item in orderList)
            {
                item.Price = GetOrderPrice(GetOrderDetails(item.Id));
                //item.OrderDetails = GetOrderDetails(item.Id);
            }

            // get user information
            var userInformation = await _userManager.FindByIdAsync(Guid.ToString());

            var userID = Guid;
            var name = userInformation.Name;
            var username = userInformation.UserName;
            var address = userInformation.Address;
            var phoneNumber = userInformation.PhoneNumber;
            var email = userInformation.Email;

            var orderByUserVM = new OrderByUserViewModel()
            {
                UserID = userID,
                Name = name,
                UserName = username,
                Address = address,
                PhoneNumber = phoneNumber,
                Email = email,
                Orders = orderList,
            };

            return orderByUserVM;
        }

        public OrderViewModel GetOrderById(int orderId)
        {
            var query = from o in _context.Orders
                        select new { o };

            var orders = query.ToList();

            var order = orders.FirstOrDefault(x => x.o.Id == orderId);

            var oderVM = new OrderViewModel()
            {
                Id = order.o.Id,
                UserID = order.o.UserId,
                OrderDate = order.o.OrderDate,
                Status = (OrderStatus)order.o.Status,
                ShipName = order.o.ShipName,
                ShipAddress = order.o.ShipAddress,
                ShipPhoneNumber = order.o.ShipPhoneNumber,
                Price = GetOrderPrice(GetOrderDetails(order.o.Id))
            };

            return oderVM;
        }

        public List<OrderDetailViewModel> GetOrderDetails(int orderId)
        {
            var order = _context.OrderDetails.Where(x=> x.OrderId == orderId);

            var orderDetails = new List<OrderDetailViewModel>();

            foreach (var item in order)
            {
                orderDetails.Add(new OrderDetailViewModel()
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                });
            }

            return orderDetails;
        }

        public decimal GetOrderPrice(List<OrderDetailViewModel> orderDetails)
        {
            decimal price = 0;
            foreach (var item in orderDetails)
            {
                var product = _context.Products.Find(item.ProductId);
                price +=  product.Price * item.Quantity; 
            }

            return price;
        }

       
    }
}
