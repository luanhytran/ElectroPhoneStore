using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Common;
using eShopSolution.ViewModels.Sales;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eShopSolution.Application.Catalog.Coupons
{
    public interface ICouponService
    {
        Task<int> Create(CouponCreateRequest request);

        Task<int> Update(CouponUpdateRequest request);

        Task<int> Delete(int couponId);

        Task<PagedResult<CouponViewModel>> GetAllPaging(GetManageProductPagingRequest request);

        Task<List<CouponViewModel>> GetAll();

        Task<CouponViewModel> GetById(int id);
    }
}