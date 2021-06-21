using eShopSolution.ApiIntegration;
using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Sales;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace eShopSolution.AdminApp.Controllers
{
    public class CouponController : BaseController
    {
        private readonly ICouponApiClient _couponApiClient;

        public CouponController(ICouponApiClient couponApiClient)
        {
            _couponApiClient = couponApiClient;
        }

        public async Task<IActionResult> Index(string keyword, int pageIndex = 1, int pageSize = 10)
        {
            var request = new GetManageProductPagingRequest()
            {
                Keyword = keyword,
                PageIndex = pageIndex,
                PageSize = pageSize,
            };

            var data = await _couponApiClient.GetAllPaging(request);
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
        public async Task<IActionResult> Create([FromForm] CouponCreateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return View(request);
            }

            var result = await _couponApiClient.CreateCoupon(request);
            if (result)
            {
                TempData["CreateCouponSuccessful"] = "Tạo coupon thành công";
                return RedirectToAction("Index");
            }

            ModelState.AddModelError("", "Tạo coupon thất bại");
            return View(request);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var coupons = await _couponApiClient.GetById(id);

            var editVm = new CouponUpdateRequest()
            {
                Id = id,
                Code = coupons.Code,
                Count = coupons.Count,
                Promotion = coupons.Promotion,
                Describe = coupons.Describe
            };

            return View(editVm);
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Edit([FromForm] CouponUpdateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return View(request);
            }

            var result = await _couponApiClient.UpdateCoupon(request);
            if (result)
            {
                TempData["UpdateCouponSuccessful"] = "Cập nhật coupon thành công";
                return RedirectToAction("Index");
            }

            ModelState.AddModelError("", "Cập nhật coupon thất bại");
            return View(request);
        }

        [HttpGet]
        public IActionResult Delete(int id)
        {
            return View(new CouponDeleteRequest()
            {
                Id = id
            });
        }

        [HttpPost]
        public async Task<IActionResult> Delete(CouponDeleteRequest request)
        {
            if (!ModelState.IsValid)
                return View();

            var result = await _couponApiClient.DeleteCoupon(request.Id);
            if (result)
            {
                TempData["DeleteCouponSuccessful"] = "Xóa coupon thành công";
                return RedirectToAction("Index");
            }

            ModelState.AddModelError("", "Xóa coupon không thành công");
            return View(request);
        }

        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            var coupon = await _couponApiClient.GetById(id);

            var detailVm = new CouponViewModel()
            {
                Id = coupon.Id,
                Code = coupon.Code,
                Count = coupon.Count,
                Promotion = coupon.Promotion,
                Describe = coupon.Describe
            };

            return View(detailVm);
        }
    }
}