using eShopSolution.AdminApp.Controllers.ProductControllerFacade;
using eShopSolution.ApiIntegration;
using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace eShopSolution.AdminApp.Controllers
{
    public class ProductController : BaseController
    {
        private readonly IProductApiClient _productApiClient;
        private readonly IConfiguration _configuration;
        private readonly ICategoryApiClient _categoryApiClient;
        private readonly IMemoryCache _cache;
        private ProductFacade facade;

        public ProductController(IProductApiClient productApiClient,
            IConfiguration configuration,
            ICategoryApiClient categoryApiClient,
            ILogger<ProductController> logger,
            IMemoryCache cache
            )
        {
            _configuration = configuration;
            _productApiClient = productApiClient;
            _categoryApiClient = categoryApiClient;
            _cache = cache;

            facade = new ProductFacade(logger, cache);

            facade.PrintRoutes();
        }

        public async Task<IActionResult> Index(string keyword, int? categoryId, int pageIndex = 1, int pageSize = 4)
        {
            PagedResult<ProductViewModel> data;
            string keyCacheProducts = "_listProducts";

            if (!facade.TryGetValue(keyCacheProducts, out data))
            {
                var request = new GetManageProductPagingRequest()
                {
                    Keyword = keyword,
                    PageIndex = pageIndex,
                    PageSize = pageSize,
                    CategoryId = categoryId
                };

                data = await _productApiClient.GetPagings(request);
                ViewBag.Keyword = keyword;

                facade.SetCache(keyCacheProducts, data);
            }

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

        // GET: Product/Duplicate/:id
        [HttpGet]
        public async Task<IActionResult> Duplicate(int id)
        {
            var product = await _productApiClient.GetById(id);

            if (product == null)
                return NotFound();

            var category = await _categoryApiClient.GetById(product.CategoryId);

            var productVm = new ProductViewModel()
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

            return View(productVm);
        }

        // POST: Product/Duplicate/:id
        [HttpPost, ActionName("Duplicate")]
        public async Task<IActionResult> DuplicateConfirmed(int id)
        {
            var product = await _productApiClient.GetById(id);

            var result = await _productApiClient.DuplicateProduct(id);
            if (result)
            {
                TempData["CreateProductSuccessful"] = "Thêm mới sản phẩm thành công";
                return RedirectToAction("Index");
            }

            ModelState.AddModelError("", "Thêm sản phẩm thất bại");
            product.CategoryId = 0;
            return View(product);

            // ------------------------
            //if (!ModelState.IsValid)
            //    return View();

            //var result = await _productApiClient.DeleteProduct(request.Id);
            //if (result)
            //{
            //    TempData["DeleteProductSuccessful"] = "Xóa sản phẩm thành công";
            //    return RedirectToAction("Index");
            //}

            //ModelState.AddModelError("", "Xóa không thành công");
            //return View(request);
        }
    }
}