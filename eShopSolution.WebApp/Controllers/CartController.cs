using eShopSolution.ApiIntegration;
using eShopSolution.Utilities.Constants;
using eShopSolution.ViewModels.Sales;
using eShopSolution.WebApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace eShopSolution.WebApp.Controllers
{
    public class CartController : Controller
    {
        private readonly IProductApiClient _productApiClient;
        private readonly IOrderApiClient _orderApiClient;
        private readonly IUserApiClient _userApiClient;


        public CartController(IProductApiClient productApiClient, IOrderApiClient orderApiClient, IUserApiClient userApiClient)
        {
            _productApiClient = productApiClient;
            _orderApiClient = orderApiClient;
            _userApiClient = userApiClient;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Checkout()
        {
            return View(GetCheckoutViewModel());
        }

        [HttpPost]
        //[Consumes("multipart/form-data")]
        public async Task<IActionResult> Checkout(CheckoutViewModel request)
        {
            if (!ModelState.IsValid)
            {
                return View(request);
            }

            if (User.Identity.IsAuthenticated)
            {
                var users = await _userApiClient.GetAll();

                var x = users.FirstOrDefault(x => x.Email == request.CheckoutModel.Email);

                // Order detail là lấy từ session chứ không lấy qua CheckoutViewModel, vì model binding không có bind cái danh sách sản phẩm
                var model = GetCheckoutViewModel();
                var orderDetails = new List<OrderDetailViewModel>();

                foreach (var item in model.CartItems)
                {
                    orderDetails.Add(new OrderDetailViewModel()
                    {
                        ProductId = item.ProductId,
                        Quantity = item.Quantity
                    });
                }
                var checkoutRequest = new CheckoutRequest()
                {
                    UserID = x.Id,
                    Address = request.CheckoutModel.Address,
                    Name = request.CheckoutModel.Name,
                    Email = request.CheckoutModel.Email,
                    PhoneNumber = request.CheckoutModel.PhoneNumber,
                    OrderDetails = orderDetails,
                };

                var result = await _orderApiClient.CreateOrder(checkoutRequest);

                if (result)
                {
                    TempData["SuccessMsg"] = "Order purchased successful";
                    return View(request);
                }

                // TODO: Add to API
                //Sau khi có checkoutRequest thì ta sẽ đẩy vào OrerApiClient để tích hợp với Api và là bài tập tự làm
                ModelState.AddModelError("", "Đặt hàng thất bại");
                return View(request);
            }
            else
            {
                // Order detail là lấy từ session chứ không lấy qua CheckoutViewModel, vì model binding không có bind cái danh sách sản phẩm
                var model = GetCheckoutViewModel();
                var orderDetails = new List<OrderDetailViewModel>();

                foreach (var item in model.CartItems)
                {
                    orderDetails.Add(new OrderDetailViewModel()
                    {
                        ProductId = item.ProductId,
                        Quantity = item.Quantity
                    });
                }
                var checkoutRequest = new CheckoutRequest()
                {
                    Address = request.CheckoutModel.Address,
                    Name = request.CheckoutModel.Name,
                    Email = request.CheckoutModel.Email,
                    PhoneNumber = request.CheckoutModel.PhoneNumber,
                    OrderDetails = orderDetails,
                };

                var result = await _orderApiClient.CreateOrder(checkoutRequest);

                if (result)
                {
                    TempData["SuccessMsg"] = "Order purchased successful";
                    return View(request);
                }

                // TODO: Add to API
                //Sau khi có checkoutRequest thì ta sẽ đẩy vào OrerApiClient để tích hợp với Api và là bài tập tự làm
                ModelState.AddModelError("", "Đặt hàng thất bại");
                return View(request);
            }
        }

        private CheckoutViewModel GetCheckoutViewModel()
        {
            var session = HttpContext.Session.GetString(SystemConstants.CartSession);

            //var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();
            var claims = User.Claims.ToList();
            if (User.Identity.IsAuthenticated)
            {
                var name = claims.FirstOrDefault(x => x.Type == ClaimTypes.Name).Value;
                var email = claims.FirstOrDefault(x => x.Type == ClaimTypes.Email).Value;
                var address = claims.FirstOrDefault(x => x.Type == ClaimTypes.StreetAddress).Value;
                var phoneNumber = claims.FirstOrDefault(x => x.Type == ClaimTypes.MobilePhone).Value;

                List<CartItemViewModel> currentCart = new List<CartItemViewModel>();

                if (session != null)
                    currentCart = JsonConvert.DeserializeObject<List<CartItemViewModel>>(session);

                var checkoutVm = new CheckoutViewModel()
                {
                    CartItems = currentCart,
                    CheckoutModel = new CheckoutRequest(),
                    Name = name.ToString(),
                    Email = email.ToString(),
                    Address = address.ToString(),
                    PhoneNumber = phoneNumber.ToString()
                };
                return checkoutVm;
            }
            else
            {
                List<CartItemViewModel> currentCart = new List<CartItemViewModel>();

                if (session != null)
                    currentCart = JsonConvert.DeserializeObject<List<CartItemViewModel>>(session);

                var checkoutVm = new CheckoutViewModel()
                {
                    CartItems = currentCart,
                    CheckoutModel = new CheckoutRequest(),
                };
                return checkoutVm;
            }
        }

        [HttpGet]
        public IActionResult GetListItems()
        {
            var session = HttpContext.Session.GetString(SystemConstants.CartSession);

            List<CartItemViewModel> currentCart = new List<CartItemViewModel>();

            if (session != null)
                currentCart = JsonConvert.DeserializeObject<List<CartItemViewModel>>(session);

            return Ok(currentCart);
        }

        public async Task<IActionResult> AddToCart(int id)
        {
            var product = await _productApiClient.GetById(id);

            var session = HttpContext.Session.GetString(SystemConstants.CartSession);

            List<CartItemViewModel> currentCart = new List<CartItemViewModel>();

            if (session != null)
                currentCart = JsonConvert.DeserializeObject<List<CartItemViewModel>>(session);

            int quantity = 1;

            if (currentCart.Any(x => x.ProductId == id))
            {
                quantity = currentCart.First(x => x.ProductId == id).Quantity + quantity;
            }

            var cartItem = new CartItemViewModel()
            {
                ProductId = id,
                Image = product.ThumbnailImage,
                Name = product.Name,
                Price = product.Price,
                Quantity = quantity
            };

            currentCart.Add(cartItem);

            HttpContext.Session.SetString(SystemConstants.CartSession, JsonConvert.SerializeObject(currentCart));

            return Ok(currentCart);
        }

        public IActionResult UpdateCart(int id, int quantity)
        {
            var session = HttpContext.Session.GetString(SystemConstants.CartSession);

            List<CartItemViewModel> currentCart = new List<CartItemViewModel>();

            if (session != null)
                currentCart = JsonConvert.DeserializeObject<List<CartItemViewModel>>(session);

            foreach (var item in currentCart)
            {
                if (item.ProductId == id)
                {
                    if (quantity == 0)
                    {
                        currentCart.Remove(item);
                        break;
                    }
                    item.Quantity = quantity;
                }
            }

            HttpContext.Session.SetString(SystemConstants.CartSession, JsonConvert.SerializeObject(currentCart));

            return Ok(currentCart);
        }

     
    }
}