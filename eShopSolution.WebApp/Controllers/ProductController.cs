using eShopSolution.ApiIntegration;
using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.WebApp.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace eShopSolution.WebApp.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductApiClient _productApiClient;
        private readonly ICategoryApiClient _categoryApiClient;
        private readonly IUserApiClient _userApiClient;

        public ProductController(IProductApiClient productApiClient, ICategoryApiClient categoryApiClient, IUserApiClient userApiClient)
        {
            _productApiClient = productApiClient;
            _categoryApiClient = categoryApiClient;
            _userApiClient = userApiClient;
        }

        public async Task<IActionResult> Detail(int id)
        {
            var product = await _productApiClient.GetById(id);
            ViewBag.ProductId = id;

            var reviews = product.Reviews;
            ViewBag.Comments = reviews;

            var ratings = product.Reviews;
            if (ratings.Count() > 0)
            {
                var ratingSum = ratings.Sum(d => d.Rating);
                ViewBag.RatingSum = ratingSum;
                var ratingCount = ratings.Count();
                ViewBag.RatingCount = ratingCount;
            }
            else
            {
                ViewBag.RatingSum = 0;
                ViewBag.RatingCount = 0;
            }

            var category = await _categoryApiClient.GetById(product.CategoryId);

            var productDetailViewModel = new ProductDetailViewModel()
            {
                Category = category,
                Product = product,
                ListOfReviews = reviews
            };

            // get user review name
            foreach (var review in productDetailViewModel.ListOfReviews)
            {
                Guid userId = new Guid(review.UserId.ToString());
                var user = await _userApiClient.GetById(userId);
                review.UserName = user.ResultObj.Name;
            }

            return View(productDetailViewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> AddReview(ProductDetailViewModel model)
        {
            var productDetailVM = new ProductDetailViewModel()
            {
                ProductId = model.ProductId,
                Review = model.Review,
                Rating = model.Rating,
                UserCommentId = model.UserCommentId
            };

            var request = await _productApiClient.AddReview(productDetailVM);

            int Id = int.Parse(request);

            return RedirectToAction("Detail", "Product", new { id = Id });
        }

        public async Task<IActionResult> Category(int id, string culture, int page = 1)
        {
            var products = await _productApiClient.GetPagings(new GetManageProductPagingRequest()
            {
                CategoryId = id,
                PageIndex = page,
                PageSize = 10
            });
            return View(new ProductCategoryViewModel()
            {
                Category = await _categoryApiClient.GetById(id),
                Products = products
            });
        }
    }
}