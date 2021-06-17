using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eShopSolution.Application.Catalog.Products
{
    // Interface này tạo các phương thức để quản lý sản phẩm
    public interface IProductService
    {
        // trả về kiểu int là trả về mã SP ta vừa tạo
        // tham số không phải lúc nào cũng truyền vào 1 Product view model, nhiều khi sẽ bị thừa
        Task<int> Create(ProductCreateRequest request);

        // Create và Update truyền 1 Dtos vào phương thức
        // Dtos là Data transfer object ( giống view model truyền cho 1 view )
        Task<int> Update(ProductUpdateRequest request);

        // để xóa thì ta chỉ cần truyền vào 1 product id
        Task<int> Delete(int productId);

        Task<ProductViewModel> GetById(int productId);

        // dùng để tìm kiếm
        // return một List ProductViewModel
        Task<PagedResult<ProductViewModel>> GetAllPaging(GetManageProductPagingRequest request);

        Task<PagedResult<ProductViewModel>> GetAllByCategoryId(GetPublicProductPagingRequest request);

        Task<List<ProductViewModel>> GetFeaturedProducts(int take);

        Task<List<ProductViewModel>> GetLatestProducts(int take);

        Task<bool> DecreaseStock(int productId, int quantity);

        Task<int> AddReview(ProductDetailViewModel model);
    }
}