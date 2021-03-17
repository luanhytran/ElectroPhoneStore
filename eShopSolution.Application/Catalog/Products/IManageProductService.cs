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
    public interface IManageProductService
    {
        // trả về kiểu int là trả về mã SP ta vừa tạo
        // tham số không phải lúc nào cũng truyền vào 1 Product view model, nhiều khi sẽ bị thừa
        Task<int> Create(ProductCreateRequest request);

        // Create và Update truyền 1 Dtos vào phương thức 
        // Dtos là Data transfer object ( giống view model truyền cho 1 view )
        Task<int> Update(ProductUpdateRequest request);

        // để xóa thì ta chỉ cần truyền vào 1 product id
        Task<int> Delete(int productId);

        Task<bool> UpdatePrice(int productId, decimal newPrice);

        Task<bool> UpdateStock(int productId, int addedQuantity);

        Task AddViewCount(int productId);

        // dùng để tìm kiếm
        // return một List ProductViewModel
        Task<PagedResult<ProductViewModel>> GetAllPaging(GetManageProductPagingRequest request);

        Task<int> AddImages(int productId, List<IFormFile> files);

        Task<int> RemoveImages(int imageId);

        Task<int> UpdateImages(int imageId, string caption, bool isDefault);

        Task<List<ProductImageViewModel>> GetListImage(int productId);
    }
}
