using eShopSolution.Data.EF;
using eShopSolution.ViewModels.Catalog.Categories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using eShopSolution.Data.Entities;
using eShopSolution.Utilities.Exceptions;
using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Common;

namespace eShopSolution.Application.Catalog.Categories
{
    public class CategoryService : ICategoryService
    {
        private readonly EShopDbContext _context;

        public CategoryService(EShopDbContext context)
        {
            _context = context;
        }

        public async Task<int> Create(CategoryCreateRequest request)
        {
            var category = new Category()
            {
                Name = request.Name
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return category.Id;
        }

        public async Task<int> Update(CategoryUpdateRequest request)
        {
            var category = await _context.Categories.FindAsync(request.Id);
            if (category == null) throw new EShopException($"Không thể tìm danh mục có ID: {request.Id} ");

            category.Name = request.Name;

            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int categoryId)
        {
            var category = await _context.Categories.FindAsync(categoryId);
            if (category == null) throw new EShopException($"Không thể tìm danh mục có ID: {categoryId} ");

            _context.Categories.Remove(category);

            return await _context.SaveChangesAsync();
        }

        public async Task<PagedResult<CategoryViewModel>> GetAllPaging(GetManageProductPagingRequest request)
        {
            var query = from c in _context.Categories
                        select new { c };

            if (!string.IsNullOrEmpty(request.Keyword))
                query = query.Where(x => x.c.Name.Contains(request.Keyword));

            //3. Paging
            int totalRow = await query.CountAsync();

            var data = await query.Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(x => new CategoryViewModel()
                {
                    Id = x.c.Id,
                    Name = x.c.Name,
                }).ToListAsync();

            //4. Select and projection
            var pagedResult = new PagedResult<CategoryViewModel>()
            {
                TotalRecords = totalRow,
                PageSize = request.PageSize,
                PageIndex = request.PageIndex,
                Items = data
            };
            return pagedResult;
        }

        public async Task<List<CategoryViewModel>> GetAll()
        {
            var query = from c in _context.Categories
                        select new { c };

            return await query.Select(x => new CategoryViewModel()
            {
                Id = x.c.Id,
                Name = x.c.Name,
            }).ToListAsync();
        }

        public async Task<CategoryViewModel> GetById(int id)
        {
            var query = from c in _context.Categories
                        where c.Id == id
                        select new { c };

            return await query.Select(x => new CategoryViewModel()
            {
                Id = x.c.Id,
                Name = x.c.Name,
            }).FirstOrDefaultAsync();
        }
    }
}