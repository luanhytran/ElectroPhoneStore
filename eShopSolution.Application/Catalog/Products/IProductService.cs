using eShopSolution.ViewModels.Catalog.ProductImages;
using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Common;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
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
        Task<ApiResult<bool>> Delete(int id);

        Task<ProductViewModel> GetById(int productId, string languageId);

        Task<bool> UpdatePrice(int productId, decimal newPrice);

        Task<bool> UpdateStock(int productId, int addedQuantity);

        Task AddViewCount(int productId);

        // dùng để tìm kiếm
        // return một List ProductViewModel
        Task<PagedResult<ProductViewModel>> GetAllPaging(GetManageProductPagingRequest request);

        // Lấy product id để thêm hình cho một product cụ thể
        Task<int> AddImage(int productId, ProductImageCreateRequest request);

        // Có product id vì cần biết id product để xóa hình của product đó
        Task<int> RemoveImage(int imageId);

        // Có product id tương tự lý do của phương thức remove image
        Task<int> UpdateImage(int imageId, ProductImageUpdateRequest request);

        Task<ProductImageViewModel> GetImageById(int imageId);

        Task<List<ProductImageViewModel>> GetListImages(int productId);

        Task<PagedResult<ProductViewModel>> GetAllByCategoryId(string languageId, GetPublicProductPagingRequest request);

        Task<ApiResult<bool>> CategoryAssign(int id, CategoryAssignRequest request);

        Task<List<ProductViewModel>> GetFeaturedProducts(string languageId, int take);

        Task<List<ProductViewModel>> GetLatestProducts(string languageId, int take);
    }
}