using Microsoft.AspNetCore.Mvc;
using eShopSolution.ViewModels.Catalog.Categories;
using System.Threading.Tasks;
using eShopSolution.ApiIntegration;
using eShopSolution.ViewModels.Catalog.Products;

namespace eShopSolution.AdminApp.Controllers
{
    public class CategoryController : BaseController
    {
        private readonly ICategoryApiClient _categoryApiClient;

        public CategoryController(ICategoryApiClient categoryApiClient)
        {
            _categoryApiClient = categoryApiClient;
        }

        public async Task<IActionResult> Index(string keyword, int pageIndex = 1, int pageSize = 10)
        {
            var request = new GetManageProductPagingRequest()
            {
                Keyword = keyword,
                PageIndex = pageIndex,
                PageSize = pageSize,
            };

            var data = await _categoryApiClient.GetAllPaging(request);
            if (TempData["result"] != null)
            {
                ViewBag.SuccessMsg = TempData["result"];
            }
            return View(data);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] CategoryCreateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return View(request);
            }

            var result = await _categoryApiClient.CreateCategory(request);
            if (result)
            {
                TempData["CreateCategorySuccessful"] = "Thêm mới danh mục thành công";
                return RedirectToAction("Index");
            }

            ModelState.AddModelError("", "Thêm danh mục thất bại");
            return View(request);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var categories = await _categoryApiClient.GetById(id);

            var editVm = new CategoryUpdateRequest()
            {
                Id = id,
                Name = categories.Name
            };

            return View(editVm);
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Edit([FromForm] CategoryUpdateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return View(request);
            }

            var result = await _categoryApiClient.UpdateCategory(request);
            if (result)
            {
                TempData["UpdateCategorySuccessful"] = "Cập nhật danh mục thành công";
                return RedirectToAction("Index");
            }

            ModelState.AddModelError("", "Cập nhật danh mục thất bại");
            return View(request);
        }

        [HttpGet]
        public IActionResult Delete(int id)
        {
            return View(new CategoryDeleteRequest()
            {
                Id = id
            });
        }

        [HttpPost]
        public async Task<IActionResult> Delete(CategoryDeleteRequest request)
        {
            if (!ModelState.IsValid)
                return View();

            var result = await _categoryApiClient.DeleteCategory(request.Id);
            if (result)
            {
                TempData["DeleteCategorySuccessful"] = "Xóa danh mục thành công";
                return RedirectToAction("Index");
            }

            ModelState.AddModelError("", "Xóa danh mục không thành công");
            return View(request);
        }
    }
}