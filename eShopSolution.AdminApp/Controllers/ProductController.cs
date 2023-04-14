using System.Linq;
using System.Threading.Tasks;
using eShopSolution.AdminApp.Models;
using eShopSolution.ApiIntegration;
using eShopSolution.Utilities.Constants;
using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;

namespace eShopSolution.AdminApp.Controllers
{
    public class ProductController : BaseController
    {
        private readonly IProductApiClient _productApiClient;
        private readonly IConfiguration _configuration;

        private readonly ICategoryApiClient _categoryApiClient;

        public ProductController(IProductApiClient productApiClient,
            IConfiguration configuration,
            ICategoryApiClient categoryApiClient)
        {
            _configuration = configuration;
            _productApiClient = productApiClient;
            _categoryApiClient = categoryApiClient;
        }

        public async Task<IActionResult> Index(string keyword, int? categoryId, int pageIndex = 1, int pageSize = 4)
        {
            var request = new GetManageProductPagingRequest()
            {
                Keyword = keyword,
                PageIndex = pageIndex,
                PageSize = pageSize,
                CategoryId = categoryId
            };

            var data = await _productApiClient.GetPagings(request);
            ViewBag.Keyword = keyword;

            var categories = await _categoryApiClient.GetAll();
            ViewBag.Categories = categories.Select(x => new SelectListItem()
            {
                Text = x.Name,
                Value = x.Id.ToString(),
                Selected = categoryId.HasValue && categoryId.Value == x.Id
            });

            if (TempData["result"] != null)
            {
                ViewBag.SuccessMsg = TempData["result"];
            }
            return View(data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            // Lấy ra danh sách các category
            var categories = await _categoryApiClient.GetAll();
            var productVM = new ProductCreateRequest()
            {
                Categories = categories
            };
            return View(productVM);
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] ProductCreateRequest request)
        {
            if (!ModelState.IsValid)
            {
                request.CategoryId = 0;
                request.Categories = await _categoryApiClient.GetAll();
                return View(request);
            }

            var result = await _productApiClient.CreateProduct(request);
            if (result)
            {
                TempData["CreateProductSuccessful"] = "Thêm mới sản phẩm thành công";
                return RedirectToAction("Index");
            }

            ModelState.AddModelError("", "Thêm sản phẩm thất bại");
            request.CategoryId = 0;
            request.Categories = await _categoryApiClient.GetAll();
            return View(request);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var categories = await _categoryApiClient.GetAll();
            var product = await _productApiClient.GetById(id);
            var editVm = new ProductUpdateRequest()
            {
                Id = product.Id,
                Name = product.Name,
                CategoryId = product.CategoryId,
                Categories = categories,
                Price = product.Price,
                Stock = product.Stock,
                Description = product.Description,
                Details = product.Details,
            };

            return View(editVm);
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Edit([FromForm] ProductUpdateRequest request)
        {
            if (!ModelState.IsValid)
            {
                request.CategoryId = 0;
                request.Categories = await _categoryApiClient.GetAll();
                return View(request);
            }

            var result = await _productApiClient.UpdateProduct(request);
            if (result)
            {
                TempData["UpdateProductSuccessful"] = "Cập nhật sản phẩm thành công";
                return RedirectToAction("Index");
            }

            ModelState.AddModelError("", "Cập nhật sản phẩm thất bại");
            request.CategoryId = 0;
            request.Categories = await _categoryApiClient.GetAll();
            return View(request);
        }

        [HttpGet]
        public IActionResult Delete(int id)
        {
            return View(new ProductDeleteRequest()
            {
                Id = id
            });
        }

        [HttpPost]
        public async Task<IActionResult> Delete(ProductDeleteRequest request)
        {
            if (!ModelState.IsValid)
                return View();

            var result = await _productApiClient.DeleteProduct(request.Id);
            if (result)
            {
                TempData["DeleteProductSuccessful"] = "Xóa sản phẩm thành công";
                return RedirectToAction("Index");
            }

            ModelState.AddModelError("", "Xóa không thành công");
            return View(request);
        }

        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            var product = await _productApiClient.GetById(id);

            var category = await _categoryApiClient.GetById(product.CategoryId);

            var detailVm = new ProductViewModel()
            {
                Price = product.Price,
                Stock = product.Stock,
                Name = product.Name,
                Category = category,
                Description = product.Description,
                Details = product.Details,
                ThumbnailImage = product.ThumbnailImage,
                ProductImage = product.ProductImage
            };

            return View(detailVm);
        }
    }
}