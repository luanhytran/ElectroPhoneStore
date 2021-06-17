using eShopSolution.ApiIntegration;
using eShopSolution.Utilities.Constants;
using eShopSolution.ViewModels.Sales;
using eShopSolution.WebApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;
using Stripe;
using System.Net.Http;
using System.Text;
using Stripe.Checkout;

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
        [Authorize]
        public IActionResult Checkout()
        {
            return View(GetCheckoutViewModel());
        }

        [HttpPost]
        [Authorize]
        //[Consumes("multipart/form-data")]
        public async Task<IActionResult> Checkout(CheckoutViewModel request)
        {
            if (!ModelState.IsValid)
            {
                return View(request);
            }

            // Tìm Guid của người mua để gán vào order
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

            // Set your secret key. Remember to switch to your live secret key in production.
            // See your keys here: https://dashboard.stripe.com/apikeys

            var result = await _orderApiClient.CreateOrder(checkoutRequest);

            if (result)
            {
                // mail admin when have new email
                //var message = await MailUtils.MailUtils.SendGmail("hytranluan@gmail.com", "hytranluan@gmail.com",
                //                                                  "ĐƠN HÀNG MỚI", $"Đơn đặt hàng mới từ khách hàng có số điện thoại là {checkoutRequest.PhoneNumber} và email là {checkoutRequest.Email} cần duyệt",
                //                                                  "your_email_here", "your_password_here");
                var email1 = new EmailService.EmailService();
                email1.Send("hytranluan@gmail.com", "hytranluan@gmail.com", "ĐƠN HÀNG MỚI", $"Đơn đặt hàng mới từ khách hàng có số điện thoại là {checkoutRequest.PhoneNumber} và email là {checkoutRequest.Email} cần duyệt");

                // mail client when placed order successfully
                //var clientMessage = await MailUtils.MailUtils.SendGmail("hytranluan@gmail.com", checkoutRequest.Email,
                //                                                 "ĐẶT HÀNG THÀNH CÔNG", $"Quý khách đã đặt hàng thành công ! Electro xin cảm ơn quý khách hàng.",
                //                                                 "your_email_here", "your_password_here");
                var email2 = new EmailService.EmailService();
                email2.Send("hytranluan@gmail.com", checkoutRequest.Email, "ĐẶT HÀNG THÀNH CÔNG", $"Quý khách đã đặt hàng thành công ! Electro xin cảm ơn quý khách hàng.");

                var session = HttpContext.Session.GetString(SystemConstants.CartSession);
                var currentCart = JsonConvert.DeserializeObject<List<CartItemViewModel>>(session);
                currentCart.Clear();
                HttpContext.Session.SetString(SystemConstants.CartSession, JsonConvert.SerializeObject(currentCart));
                TempData["SuccessMsg"] = "Order purchased successful";
                return View(request);
            }

            // TODO: Add to API
            //Sau khi có checkoutRequest thì ta sẽ đẩy vào OrerApiClient để tích hợp với Api và là bài tập tự làm
            ModelState.AddModelError("", "Đặt hàng thất bại");
            return View(request);
        }

        [TempData]
        public string TotalAmount { get; set; }

        [HttpGet]
        public IActionResult Payment()
        {
            var session = HttpContext.Session.GetString(SystemConstants.CartSession);

            List<CartItemViewModel> currentCart = new List<CartItemViewModel>();
            currentCart = JsonConvert.DeserializeObject<List<CartItemViewModel>>(session);

            ViewBag.cart = currentCart;
            ViewBag.DollarAmount = currentCart.Sum(x => x.Price * x.Quantity);
            ViewBag.total = Math.Round(ViewBag.DollarAmount, 2) * 100;
            ViewBag.total = Convert.ToInt64(ViewBag.total);
            long total = ViewBag.total;
            TotalAmount = total.ToString();
            return View();
        }

        [HttpPost]
        public IActionResult Processing(string stripeToken, string stripeEmail)
        {
            var optionsCust = new CustomerCreateOptions
            {
                Email = stripeEmail,
                Name = "Robert",
                Phone = "04-234567"
            };
            var serviceCust = new CustomerService();
            Customer customer = serviceCust.Create(optionsCust);
            var optionsCharge = new ChargeCreateOptions
            {
                /*Amount = HttpContext.Session.GetLong("Amount")*/
                Amount = Convert.ToInt64(TempData["TotalAmount"]),
                Currency = "USD",
                Description = "Buying Flowers",
                Source = stripeToken,
                ReceiptEmail = stripeEmail,
            };
            var service = new ChargeService();
            Charge charge = service.Create(optionsCharge);
            if (charge.Status == "succeeded")
            {
                string BalanceTransactionId = charge.BalanceTransactionId;
                ViewBag.AmountPaid = Convert.ToDecimal(charge.Amount) % 100 / 100 + (charge.Amount) / 100;
                ViewBag.BalanceTxId = BalanceTransactionId;
                ViewBag.Customer = customer.Name;
                //return View();
            }

            return View("Checkout");
        }

        private CheckoutViewModel GetCheckoutViewModel()
        {
            var session = HttpContext.Session.GetString(SystemConstants.CartSession);

            //var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();
            var claims = User.Claims.ToList();

            var name = claims.FirstOrDefault(x => x.Type == ClaimTypes.GivenName).Value;
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
                if (currentCart.First(x => x.ProductId == id).Quantity == product.Stock)
                {
                    return Ok(currentCart);
                }

                quantity = currentCart.First(x => x.ProductId == id).Quantity + quantity;
                currentCart.First(x => x.ProductId == id).Quantity = quantity;
            }
            else
            {
                var cartItem = new CartItemViewModel()
                {
                    ProductId = id,
                    Image = product.ThumbnailImage,
                    Name = product.Name,
                    Price = product.Price,
                    Quantity = quantity
                };

                currentCart.Add(cartItem);
            }

            HttpContext.Session.SetString(SystemConstants.CartSession, JsonConvert.SerializeObject(currentCart));

            return Ok(currentCart);
        }

        public async Task<IActionResult> UpdateCart(int id, int quantity)
        {
            var session = HttpContext.Session.GetString(SystemConstants.CartSession);

            List<CartItemViewModel> currentCart = new List<CartItemViewModel>();

            if (session != null)
                currentCart = JsonConvert.DeserializeObject<List<CartItemViewModel>>(session);

            foreach (var item in currentCart)
            {
                if (item.ProductId == id)
                {
                    var product = await _productApiClient.GetById(item.ProductId);
                    var productStock = product.Stock;
                    if (quantity == 0)
                    {
                        currentCart.Remove(item);
                        break;
                    }
                    else if (quantity > productStock)
                    {
                        return StatusCode(406, "Số lượng mua lớn hơn số lượng trong kho của sán phẩm !");
                    }
                    item.Quantity = quantity;
                }
            }

            HttpContext.Session.SetString(SystemConstants.CartSession, JsonConvert.SerializeObject(currentCart));

            return Ok(currentCart);
        }
    }
}