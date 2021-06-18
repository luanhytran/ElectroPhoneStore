using eShopSolution.Application.Catalog.Categories;
using eShopSolution.ViewModels.Catalog.Categories;
using eShopSolution.ViewModels.Catalog.Products;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace eShopSolutionBackendApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(
            ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _categoryService.GetAll();
            return Ok(categories);
        }

        [HttpGet("paging")]
        public async Task<IActionResult> GetAllPaging([FromQuery] GetManageProductPagingRequest request)
        {
            var categories = await _categoryService.GetAllPaging(request);
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var category = await _categoryService.GetById(id);
            return Ok(category);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CategoryCreateRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var categoryId = await _categoryService.Create(request);

            if (categoryId == 0)
                return BadRequest();

            var category = await _categoryService.GetById(categoryId);

            return CreatedAtAction(nameof(GetById), new { id = categoryId }, category);
        }

        // HttpPut: update toàn phần
        [HttpPut("updateCategory")]
        [Authorize]
        public async Task<IActionResult> Update([FromBody] CategoryUpdateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var affectedResult = await _categoryService.Update(request);
            if (affectedResult == 0)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var affectedResult = await _categoryService.Delete(id);
            if (affectedResult == 0)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}