using eShopSolution.Application.Catalog.Products.Dtos;
using eShopSolution.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eShopSolution.Application.Catalog.Products
{
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

        Task<List<ProductViewModel>> GetAll();

        // dùng để tìm kiếm
        // return một List ProductViewModel
        Task<PagedViewModel<ProductViewModel>> GetAllPaging(string keyword, int pageIndex,int pageSize);

    }
}
