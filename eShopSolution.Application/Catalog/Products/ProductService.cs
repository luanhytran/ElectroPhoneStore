using eShopSolution.Application.Common;
using eShopSolution.Data.EF;
using eShopSolution.Data.Entities;
using eShopSolution.Utilities.Exceptions;
using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace eShopSolution.Application.Catalog.Products
{
    public class ProductService : IProductService
    {
        private readonly EShopDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IStorageService _storageService;
        private readonly IConfiguration _configuration;
        private const string USER_CONTENT_FOLDER_NAME = "user-content";

        // dependency injection, truyền context vào để thao tác CRUD
        public ProductService(EShopDbContext context, IStorageService storageService, IConfiguration configuration,
            UserManager<AppUser> userManager)
        {
            _context = context;
            _storageService = storageService;
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<int> Create(ProductCreateRequest request)
        {
            var product = new Product()
            {
                // id tự tăng
                Name = request.Name,
                CategoryId = request.CategoryId,
                Price = request.Price,
                Stock = request.Stock,
                Description = request.Description,
                Details = request.Details,
            };

            //Save thumbnail image
            if (request.ThumbnailImage != null)
            {
                product.Thumbnail = await this.SaveFile(request.ThumbnailImage);
            }
            else
            {
                product.Thumbnail = "/user-content/no-image.png";
            }

            //Save product image
            if (request.ProductImage != null)
            {
                product.ProductImage = await this.SaveFile(request.ProductImage);
            }
            else
            {
                product.ProductImage = "/user-content/no-image.png";
            }

            _context.Products.Add(product);

            //trả về số lượng bản ghi maybe
            await _context.SaveChangesAsync();
            return product.Id;
        }

        public async Task<int> Update(ProductUpdateRequest request)
        {
            var product = await _context.Products.FindAsync(request.Id);
            if (product == null) throw new EShopException($"Không thể tìm sản phẩm có ID: {request.Id} ");

            product.Name = request.Name;
            product.CategoryId = request.CategoryId;
            product.Description = request.Description;
            product.Details = request.Details;
            product.Stock = request.Stock;

            //Save thumbnail image
            if (request.ThumbnailImage != null)
            {
                product.Thumbnail = await this.SaveFile(request.ThumbnailImage);
            }
            else
            {
                product.Thumbnail = "/user-content/no-image.png";
            }

            //Save product image
            if (request.ProductImage != null)
            {
                product.ProductImage = await this.SaveFile(request.ProductImage);
            }
            else
            {
                product.ProductImage = "/user-content/no-image.png";
            }

            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int productId)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null) throw new EShopException($"Không thể tìm sản phẩm có ID: {productId}");

            var images = _context.Products.Where(i => i.Id == productId);
            foreach (var image in images)
            {
                await _storageService.DeleteFileAsync(image.Thumbnail);
                await _storageService.DeleteFileAsync(image.ProductImage);
            }

            _context.Products.Remove(product);

            return await _context.SaveChangesAsync();
        }

        public async Task<int> AddReview(ProductDetailViewModel model)
        {
            Guid userGuid = new Guid(model.UserCommentId.ToString());
            Review review = new Review()
            {
                ProductId = model.ProductId,
                Comments = model.Review,
                Rating = model.Rating,
                PublishedDate = DateTime.Now,
                UserId = userGuid
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
            return model.ProductId;
        }

        public async Task<PagedResult<ProductViewModel>> GetAllPaging(GetManageProductPagingRequest request)
        {
            //1. Select join
            var query = from p in _context.Products
                        join c in _context.Categories on p.CategoryId equals c.Id
                        select new { p };
            //2. filter
            if (!string.IsNullOrEmpty(request.Keyword))
                query = query.Where(x => x.p.Name.Contains(request.Keyword));

            if (request.CategoryId != null && request.CategoryId != 0)
            {
                query = query.Where(x => x.p.CategoryId == request.CategoryId);
            }

            if (!string.IsNullOrEmpty(request.SortOption))
            {
                switch (request.SortOption)
                {
                    case "Tên A-Z":
                        query = query.OrderBy(x => x.p.Name);
                        break;

                    case "Giá thấp đến cao":
                        query = query.OrderBy(x => x.p.Price);
                        break;

                    case "Giá cao đến thấp":
                        query = query.OrderByDescending(x => x.p.Price);
                        break;
                }
            }

            //3. Paging
            int totalRow = await query.CountAsync();

            var data = await query.Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(x => new ProductViewModel()
                {
                    Id = x.p.Id,
                    Name = x.p.Name,
                    CategoryId = x.p.CategoryId,
                    Description = x.p.Description,
                    Details = x.p.Details,
                    Price = x.p.Price,
                    Stock = x.p.Stock,
                    ThumbnailImage = x.p.Thumbnail,
                    ProductImage = x.p.ProductImage
                }).ToListAsync();

            //4. Select and projection
            var pagedResult = new PagedResult<ProductViewModel>()
            {
                TotalRecords = totalRow,
                PageSize = request.PageSize,
                PageIndex = request.PageIndex,
                Items = data
            };
            return pagedResult;
        }

        private async Task<string> SaveFile(IFormFile file)
        {
            var originalFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(originalFileName)}";
            await _storageService.SaveFileAsync(file.OpenReadStream(), fileName);
            return "/" + USER_CONTENT_FOLDER_NAME + "/" + fileName;
        }

        public async Task<ProductViewModel> GetById(int productId)
        {
            // Lấy danh mục của sản phẩm
            var categories = await (from c in _context.Categories
                                    join p in _context.Products on c.Id equals p.CategoryId
                                    select p.Name).ToListAsync();

            var product = await _context.Products.FindAsync(productId);

            // Lấy danh sách review
            var reviews = _context.Reviews.Where(x => x.ProductId.Equals(productId)).ToList();

            // Lấy danh sách star rating
            //var ratings = _context.Reviews.Where(d => d.ProductId.Equals(productId)).ToList();

            var listOfReviews = new List<ReviewViewModel>();
            foreach (var review in reviews)
            {
                var user = await _userManager.FindByIdAsync(review.UserId.ToString());
                listOfReviews.Add(new ReviewViewModel()
                {
                    Id = review.Id,
                    UserId = review.UserId,
                    UserName = user.Name,
                    ProductId = review.ProductId,
                    Rating = review.Rating,
                    Comments = review.Comments,
                    PublishedDate = review.PublishedDate
                });
            }

            var productViewModel = new ProductViewModel()
            {
                Id = product.Id,
                Name = product.Name != null ? product.Name : null,
                CategoryId = product.CategoryId != 0 ? product.CategoryId : 0,
                //Category = category,
                Description = product.Description != null ? product.Description : null,
                Details = product.Details != null ? product.Details : null,
                Price = product.Price,
                Stock = product.Stock,
                ThumbnailImage = product.Thumbnail != null ? product.Thumbnail : "no-image.jpg",
                ProductImage = product.ProductImage != null ? product.ProductImage : "no-image.jpg",
                Reviews = listOfReviews
            };
            return productViewModel;
        }

        // giảm số lượng sản phẩm trong kho khi khách hàng tăng sl sp
        public async Task<bool> DecreaseStock(int productId, int quantity)
        {
            var product = await _context.Products.FindAsync(productId);

            if (product == null) throw new EShopException($"Cannot find product with id: {productId} ");
            product.Stock -= quantity;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<PagedResult<ProductViewModel>> GetAllByCategoryId(GetPublicProductPagingRequest request)
        {
            //1. Select join
            var query = from p in _context.Products
                        join c in _context.Categories on p.CategoryId equals c.Id
                        select new { p };
            //2. filter
            if (request.CategoryId.HasValue && request.CategoryId.Value > 0)
            {
                query = query.Where(p => p.p.CategoryId == request.CategoryId);
            }
            //3. Paging
            int totalRow = await query.CountAsync();

            var data = await query.Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(x => new ProductViewModel()
                {
                    Id = x.p.Id,
                    Name = x.p.Name,
                    CategoryId = x.p.CategoryId,
                    Description = x.p.Description,
                    Details = x.p.Details,
                    Price = x.p.Price,
                    Stock = x.p.Stock,
                    ThumbnailImage = x.p.Thumbnail,
                    ProductImage = x.p.ProductImage
                }).ToListAsync();

            //4. Select and projection
            var pagedResult = new PagedResult<ProductViewModel>()
            {
                TotalRecords = totalRow,
                PageSize = request.PageSize,
                PageIndex = request.PageIndex,
                Items = data
            };
            return pagedResult;
        }

        public async Task<List<ProductViewModel>> GetFeaturedProducts(int take)
        {
            //1. Select join
            var query = from p in _context.Products
                        join c in _context.Categories on p.CategoryId equals c.Id
                        select new { p };

            var data = await query.OrderByDescending(x => x.p.DateCreated).Take(take)
                .Select(x => new ProductViewModel()
                {
                    Id = x.p.Id,
                    Name = x.p.Name,
                    CategoryId = x.p.CategoryId,
                    DateCreated = x.p.DateCreated,
                    Description = x.p.Description,
                    Details = x.p.Details,
                    Price = x.p.Price,
                    Stock = x.p.Stock,
                    ThumbnailImage = x.p.Thumbnail,
                    ProductImage = x.p.ProductImage,
                }).ToListAsync();

            return data;
        }

        public async Task<List<ProductViewModel>> GetLatestProducts(int take)
        {
            //1. Select join
            var query = from p in _context.Products
                        join c in _context.Categories on p.CategoryId equals c.Id
                        select new { p };

            var data = await query.OrderByDescending(x => x.p.DateCreated).Take(take)
                .Select(x => new ProductViewModel()
                {
                    Id = x.p.Id,
                    Name = x.p.Name,
                    CategoryId = x.p.CategoryId,
                    DateCreated = x.p.DateCreated,
                    Description = x.p.Description,
                    Details = x.p.Details,
                    Price = x.p.Price,
                    Stock = x.p.Stock,
                    ThumbnailImage = x.p.Thumbnail,
                    ProductImage = x.p.ProductImage
                }).ToListAsync();

            return data;
        }
    }
}