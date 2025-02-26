using System.Collections.Generic;
using System.Threading.Tasks;
using eShopSolution.ViewModels.Catalog.Categories;
using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Common;

namespace eShopSolution.ApiIntegration.Category
{
    public interface ICategoryApiClient
    {
        Task<PagedResult<CategoryViewModel>> GetAllPaging(GetManageProductPagingRequest request);

        Task<List<CategoryViewModel>> GetAll();

        Task<CategoryViewModel> GetById(int id);

        Task<bool> CreateCategory(CategoryCreateRequest request);

        Task<bool> UpdateCategory(CategoryUpdateRequest request);

        Task<bool> DeleteCategory(int id);
    }
}