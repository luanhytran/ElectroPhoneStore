using eShopSolution.ApiIntegration;
using eShopSolution.Utilities.Constants;
using eShopSolution.ViewModels.Sales;
using eShopSolution.WebApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
using PaymentMethod = eShopSolution.ViewModels.Utilities.Enums.PaymentMethod;

namespace eShopSolution.WebApp.Controllers
{
    public class CartController : Controller
    {
        private readonly IProductApiClient _productApiClient;
        private readonly IOrderApiClient _orderApiClient;
        private readonly IUserApiClient _userApiClient;
        private readonly ICouponApiClient _couponApiClient;

        public CartController(IProductApiClient productApiClient, IOrderApiClient orderApiClient, IUserApiClient userApiClient, ICouponApiClient couponApiClient)
        {
            _productApiClient = productApiClient;
            _orderApiClient = orderApiClient;
            _userApiClient = userApiClient;
            _couponApiClient = couponApiClient;
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

            var session = HttpContext.Session.GetString(SystemConstants.CartSession);

            var currentCart = new CartViewModel();
            currentCart = JsonConvert.DeserializeObject<CartViewModel>(session);
            long price = 0;
            float sub_price = 0;

            if (currentCart.Promotion != 0)
            {
                var promotion = currentCart.Promotion;
                sub_price = (float)(currentCart.CartItems.Sum(x => x.Price * x.Quantity));
                price = (long)((long)sub_price * (100f - promotion) / 100f);
            }
            else
            {
                price = (long)currentCart.CartItems.Sum(x => x.Price * x.Quantity);
            }

            // Tìm Guid của người mua để gán vào order
            var claims = User.Claims.ToList();
            var userId = claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            var users = await _userApiClient.GetAll();
            var x = users.FirstOrDefault(x => x.Id.ToString() == userId);

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
                PhoneNumber = request.CheckoutModel.PhoneNumber,
                OrderDetails = orderDetails,
                PaymentMethod = PaymentMethod.COD,
                Total = price,
            };

            if (model.CouponCode != null)
            {
                var coupons = await _couponApiClient.GetAll();
                var coupon = coupons.FirstOrDefault(x => x.Code == model.CouponCode);
                checkoutRequest.CouponId = coupon.Id;
            }

            var result = await _orderApiClient.CreateOrder(checkoutRequest);

            if (result != "Failed")
            {
                // mail admin when have new email
                var email1 = new EmailService.EmailService();
                email1.Send("hytranluan@gmail.com", "hytranluan@gmail.com",
                    "ĐƠN HÀNG MỚI", $"Mã đơn hàng là <strong>{result}</strong>, nhấn vào <a href='" + "https://localhost:5002/Order/Detail?orderId=" + result + "'>đây</a> để đến trang quản lý đơn hàng này.");

                var orderSummaryHtml = "<table border='1' style='border-collapse:collapse'>"
                        + "<thead>"
                        + "<tr>"
                        + "<th>Tên sản phẩm</th>"
                        + "<th>Đơn giá</th>"
                        + "<th>Số lượng mua</th>"
                        + "<th>Tổng cộng</th>"
                        + "</tr>"
                        + "</thead>"
                        + "<tbody>";
                decimal total = 0;
                decimal amount = 0;
                // mail client when placed order successfully
                foreach (var product in currentCart.CartItems)
                {
                    amount = product.Price * product.Quantity;
                    orderSummaryHtml +=
                        "<tr>"
                        + "<td>" + product.Name + "</td>"
                        + "<td>" + product.Price.ToString("N0") + " <span>&#8363;</span>" + "</td>"
                        + "<td>" + product.Quantity
                        + "</td>"
                        + "<td>" + amount.ToString("N0") + " <span>&#8363;</span>" + "</td>"
                        + "</tr>"
                        + "</tbody>";

                    total += amount;
                };

                if (currentCart.Promotion != 0)
                {
                    orderSummaryHtml +=
                        "<tfoot>"
                        + "<tr>"
                        + "<td><strong>Tổng giá đơn hàng</strong></td>"
                        + $"<td><strong> {sub_price:N0} <span> &#8363;</span></strong></td>"
                        + "</tr>"
                        + "<tr>"
                        + "<td><strong>Số tiền giảm</strong></td>"
                        + $"<td><strong> {sub_price - (sub_price * ((100f - model.Promotion) / 100f)):N0} <span> &#8363;</span></strong></td>"
                        + "</tr>"
                        + "<tr>"
                        + "<td><strong>Tổng giá đơn hàng đã giảm</strong></td>"
                        + $"<td><strong> {price:N0} <span> &#8363;</span></strong></td>"
                        + "</tr>"
                        + "</tfoot>"
                        + "</table>";
                }
                else
                {
                    orderSummaryHtml +=
                        "<tfoot>"
                        + "<tr>"
                        + "<td><strong>Tổng giá đơn hàng</strong></td>"
                        + $"<td><strong> {price:N0} <span> &#8363;</span></strong></td>"
                        + "</tr>"
                        + "</tfoot>"
                        + "</table>";
                }

                var templateHtml = "<h1>Electro Phone Store</h1>" + "<br>"
                            + $"<h2>Quý khách đã đặt hàng thành công ! Đơn hàng của quý khách sẽ được duyệt sớm"
                            + "<br>"
                            + $"Mã đơn là {result}"
                            + "<br>"
                            + "<h3>Danh sách sản phẩm đã đặt</h3>"
                            + "<br>";

                var userMail = claims.FirstOrDefault(x => x.Type == ClaimTypes.Email).Value;
                var email2 = new EmailService.EmailService();
                email2.Send("hytranluan@gmail.com", userMail,
                                "ĐẶT HÀNG THÀNH CÔNG",
                                templateHtml
                                + orderSummaryHtml
                                );

                currentCart = JsonConvert.DeserializeObject<CartViewModel>(session);
                currentCart.CartItems.Clear();
                currentCart.Promotion = 0;
                HttpContext.Session.SetString(SystemConstants.CartSession, JsonConvert.SerializeObject(currentCart));
                TempData["SuccessMsg"] = "Order purchased successful";
                return View(request);
            }

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

        // Thanh toán online
        [HttpPost]
        public async Task<IActionResult> Processing(string stripeToken, string stripeEmail, CheckoutViewModel request)
        {
            if (!ModelState.IsValid)
            {
                return View(request);
            }

            var session = HttpContext.Session.GetString(SystemConstants.CartSession);

            var currentCart = new CartViewModel();
            currentCart = JsonConvert.DeserializeObject<CartViewModel>(session);
            long price = 0;
            float sub_price = 0f;

            if (currentCart.Promotion != 0)
            {
                var promotion = currentCart.Promotion;
                sub_price = (float)(currentCart.CartItems.Sum(x => x.Price * x.Quantity));
                price = (long)((long)sub_price * (100f - promotion) / 100f);
            }
            else
            {
                price = (long)currentCart.CartItems.Sum(x => x.Price * x.Quantity);
            }

            var claims = User.Claims.ToList();
            var userEmail = claims.FirstOrDefault(x => x.Type == ClaimTypes.Email).Value;

            var address = new AddressOptions()
            {
                Line1 = request.CheckoutModel.Address
            };

            var optionsCust = new CustomerCreateOptions
            {
                Email = stripeEmail,
                Name = request.CheckoutModel.Name,
                Phone = request.CheckoutModel.PhoneNumber,
                Address = address
            };

            var serviceCust = new CustomerService();
            Customer customer = serviceCust.Create(optionsCust);

            var shipping = new ChargeShippingOptions()
            {
                Name = request.CheckoutModel.Name,
                Address = new AddressOptions()
                {
                    Line1 = request.CheckoutModel.Address
                }
            };

            var optionsCharge = new ChargeCreateOptions
            {
                /*Amount = HttpContext.Session.GetLong("Amount")*/
                //Amount = Convert.ToInt64(TempData["TotalAmount"]),
                Amount = price,
                Currency = "VND",
                Description = "Đặt điện thoại tại Electro",
                Source = stripeToken,
                Shipping = shipping,
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

            // Tìm Guid của người mua để gán vào order
            var users = await _userApiClient.GetAll();
            var x = users.FirstOrDefault(x => x.Email == userEmail);

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
                PhoneNumber = request.CheckoutModel.PhoneNumber,
                OrderDetails = orderDetails,
                PaymentMethod = PaymentMethod.CreditCard,
                Total = price,
            };

            if (model.CouponCode != null)
            {
                var coupons = await _couponApiClient.GetAll();
                var coupon = coupons.FirstOrDefault(x => x.Code == model.CouponCode);
                checkoutRequest.CouponId = coupon.Id;
            }

            var result = await _orderApiClient.CreateOrder(checkoutRequest);

            if (result != "Failed")
            {
                // mail admin when have new email
                var email1 = new EmailService.EmailService();
                email1.Send("hytranluan@gmail.com", "hytranluan@gmail.com",
                    "ĐƠN HÀNG MỚI", $"Mã đơn hàng là <strong>{result}</strong>, nhấn vào <a href='" + "https://localhost:5002/Order/Detail?orderId=" + result + "'>đây</a> để đến trang quản lý đơn hàng này.");

                var orderSummaryHtml = "<table border='1' style='border-collapse:collapse'>"
                        + "<thead>"
                        + "<tr>"
                        + "<th>Tên sản phẩm</th>"
                        + "<th>Đơn giá</th>"
                        + "<th>Số lượng mua</th>"
                        + "<th>Tổng cộng</th>"
                        + "</tr>"
                        + "</thead>"
                        + "<tbody>";
                decimal total = 0;
                decimal amount = 0;
                // mail client when placed order successfully
                foreach (var product in currentCart.CartItems)
                {
                    amount = product.Price * product.Quantity;
                    orderSummaryHtml +=
                        "<tr>"
                        + "<td>" + product.Name + "</td>"
                        + "<td>" + product.Price.ToString("N0") + " <span>&#8363;</span>" + "</td>"
                        + "<td>" + product.Quantity
                        + "</td>"
                        + "<td>" + amount.ToString("N0") + " <span>&#8363;</span>" + "</td>"
                        + "</tr>"
                        + "</tbody>";

                    total += amount;
                };

                if (currentCart.Promotion != 0)
                {
                    orderSummaryHtml +=
                        "<tfoot>"
                        + "<tr>"
                        + "<td><strong>Tổng giá đơn hàng</strong></td>"
                        + $"<td><strong> {sub_price:N0} <span> &#8363;</span></strong></td>"
                        + "</tr>"
                        + "<tr>"
                        + "<td><strong>Số tiền giảm</strong></td>"
                        + $"<td><strong> {sub_price - (sub_price * ((100f - model.Promotion) / 100f)):N0} <span> &#8363;</span></strong></td>"
                        + "</tr>"
                        + "<tr>"
                        + "<td><strong>Tổng giá đơn hàng đã giảm</strong></td>"
                        + $"<td><strong> {price:N0} <span> &#8363;</span></strong></td>"
                        + "</tr>"
                        + "</tfoot>"
                        + "</table>";
                }
                else
                {
                    orderSummaryHtml +=
                        "<tfoot>"
                        + "<tr>"
                        + "<td><strong>Tổng giá đơn hàng</strong></td>"
                        + $"<td><strong> {price:N0} <span> &#8363;</span></strong></td>"
                        + "</tr>"
                        + "</tfoot>"
                        + "</table>";
                }

                var templateHtml = "<h1>Electro Phone Store</h1>" + "<br>"
                            + $"<h2>Quý khách đã đặt hàng thành công ! Đơn hàng của quý khách sẽ được duyệt sớm"
                            + "<br>"
                            + $"Mã đơn là {result}"
                            + "<br>"
                            + "<h3>Danh sách sản phẩm đã đặt</h3>"
                            + "<br>";

                var userMail = claims.FirstOrDefault(x => x.Type == ClaimTypes.Email).Value;
                var email2 = new EmailService.EmailService();
                email2.Send("hytranluan@gmail.com", userMail,
                                "ĐẶT HÀNG THÀNH CÔNG",
                                templateHtml
                                + orderSummaryHtml
                                );

                currentCart = JsonConvert.DeserializeObject<CartViewModel>(session);
                currentCart.CartItems.Clear();
                currentCart.Promotion = 0;
                HttpContext.Session.SetString(SystemConstants.CartSession, JsonConvert.SerializeObject(currentCart));
                TempData["SuccessMsg"] = "Order purchased successful";
                return View(request);
            }

            ModelState.AddModelError("", "Đặt hàng thất bại");
            return View(request);

            //return View("Index", "Home");
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

            var currentCart = new CartViewModel();
            currentCart.CartItems = new List<CartItemViewModel>();

            if (session != null)
            {
                //currentCart = JsonConvert.DeserializeObject<List<CartItemViewModel>>(session);
                currentCart = JsonConvert.DeserializeObject<CartViewModel>(session);
            }

            var checkoutVm = new CheckoutViewModel()
            {
                CartItems = currentCart.CartItems,
                CheckoutModel = new CheckoutRequest(),
                Name = name.ToString(),
                Address = address.ToString(),
                PhoneNumber = phoneNumber.ToString(),
                Promotion = currentCart.Promotion,
                CouponCode = currentCart.CouponCode
            };

            return checkoutVm;
        }

        [HttpGet]
        public IActionResult GetListItems()
        {
            var session = HttpContext.Session.GetString(SystemConstants.CartSession);

            var currentCart = new CartViewModel();
            currentCart.CartItems = new List<CartItemViewModel>();

            if (session != null)
            {
                //currentCart = JsonConvert.DeserializeObject<List<CartItemViewModel>>(session);
                currentCart = JsonConvert.DeserializeObject<CartViewModel>(session);
            }

            return Ok(currentCart);
        }

        public async Task<IActionResult> AddToCart(int id)
        {
            var product = await _productApiClient.GetById(id);

            var session = HttpContext.Session.GetString(SystemConstants.CartSession);

            //List<CartItemViewModel> currentCart = new List<CartItemViewModel>();
            var currentCart = new CartViewModel();
            currentCart.CartItems = new List<CartItemViewModel>();

            if (session != null)
            {
                //currentCart = JsonConvert.DeserializeObject<List<CartItemViewModel>>(session);
                currentCart = JsonConvert.DeserializeObject<CartViewModel>(session);
            }

            int quantity = 1;

            if (currentCart.CartItems.Any(x => x.ProductId == id))
            {
                if (currentCart.CartItems.First(x => x.ProductId == id).Quantity == product.Stock)
                {
                    return Ok(currentCart.CartItems);
                }

                quantity = currentCart.CartItems.First(x => x.ProductId == id).Quantity + quantity;
                currentCart.CartItems.First(x => x.ProductId == id).Quantity = quantity;
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

                currentCart.CartItems.Add(cartItem);
            }

            HttpContext.Session.SetString(SystemConstants.CartSession, JsonConvert.SerializeObject(currentCart));

            return Ok(currentCart);
        }

        public async Task<IActionResult> UpdateCart(int id, int quantity)
        {
            var session = HttpContext.Session.GetString(SystemConstants.CartSession);

            var currentCart = new CartViewModel();
            currentCart.CartItems = new List<CartItemViewModel>();

            if (session != null)
            {
                //currentCart = JsonConvert.DeserializeObject<List<CartItemViewModel>>(session);
                currentCart = JsonConvert.DeserializeObject<CartViewModel>(session);
            }

            foreach (var item in currentCart.CartItems)
            {
                if (item.ProductId == id)
                {
                    var product = await _productApiClient.GetById(item.ProductId);
                    var productStock = product.Stock;

                    if (quantity == 0 && currentCart.CartItems.Count > 1)
                    {
                        currentCart.CartItems.Remove(item);
                        break;
                    }
                    else if (quantity == 0 && currentCart.CartItems.Count == 1) // for what ?
                    {
                        currentCart.CartItems.Remove(item);
                        currentCart.Promotion = 0;
                        break;
                    }
                    else if (quantity > productStock)
                    {
                        return Content("quantity is greater than stock");
                    }
                    item.Quantity = quantity;
                }
            }

            HttpContext.Session.SetString(SystemConstants.CartSession, JsonConvert.SerializeObject(currentCart));

            return Ok(currentCart);
        }
    }
}