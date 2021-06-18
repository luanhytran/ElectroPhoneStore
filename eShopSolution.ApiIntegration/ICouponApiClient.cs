using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Common;
using eShopSolution.ViewModels.Sales;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eShopSolution.ApiIntegration
{
    public interface ICouponApiClient
    {
        Task<List<CouponViewModel>> GetAll();

        Task<CouponViewModel> GetById(int id);

        Task<bool> CreateCoupon(CouponCreateRequest request);

        Task<bool> UpdateCoupon(CouponUpdateRequest request);

        Task<bool> DeleteCoupon(int id);

        Task<PagedResult<CouponViewModel>> GetAllPaging(GetManageProductPagingRequest request);
    }
}