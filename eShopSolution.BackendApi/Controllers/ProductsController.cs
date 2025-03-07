﻿using System.Threading.Tasks;
using eShopSolution.Application.Catalog.Products;
using eShopSolution.ViewModels.Catalog.Products;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eShopSolution.BackendApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("paging")]
        public async Task<IActionResult> GetAllPaging([FromQuery] GetManageProductPagingRequest request)
        {
            var product = await _productService.GetAllPaging(request);
            return Ok(product);
        }

        [HttpGet("pagingByCategory")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllByCategoryPaging([FromQuery] GetPublicProductPagingRequest request)
        {
            var product = await _productService.GetAllByCategoryId(request);
            return Ok(product);
        }

        [HttpGet("{productId}")]
        public async Task<IActionResult> GetById(int productId)
        {
            var product = await _productService.GetById(productId);
            if (product == null)
                return BadRequest("Không tìm thấy sản phẩm");
            return Ok(product);
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        [Authorize]
        public async Task<IActionResult> Create([FromForm] ProductCreateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var productId = await _productService.Create(request);
            if (productId == 0)
            {
                return BadRequest();
            }

            var product = await _productService.GetById(productId);

            return CreatedAtAction(nameof(GetById), new { id = productId }, product);
        }

        [HttpPut("{productId}")]
        [Consumes("multipart/form-data")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int productId, [FromForm] ProductUpdateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            request.Id = productId;
            var affectedResult = await _productService.Update(request);
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
            var affectedResult = await _productService.Delete(id);
            if (affectedResult == 0)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpGet("featured/{take}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetFeaturedProducts(int take)
        {
            var product = await _productService.GetFeaturedProducts(take);
            return Ok(product);
        }

        [HttpGet("latest/{take}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetLatestProducts(int take)
        {
            var products = await _productService.GetLatestProducts(take);
            return Ok(products);
        }

        [HttpPost("addReview")]
        public async Task<IActionResult> AddReview([FromBody] ProductDetailViewModel model)
        {
            var result = await _productService.AddReview(model);
            if (result == 0)
            {
                return BadRequest();
            }
            return Ok(result);
        }
    }
}