using eShopSolution.Data.EF;
using eShopSolution.Data.Entities;
using eShopSolution.ViewModels.Catalog.Products;
using eShopSolution.ViewModels.Common;
using eShopSolution.ViewModels.Sales;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using eShopSolution.Utilities.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace eShopSolution.Application.Catalog.Coupons
{
    public class CouponServiceCachingDecorator : ICouponService
    {
        private readonly ICouponService _couponService;
        private readonly IMemoryCache _memoryCache;
        private readonly EShopDbContext _context;

        private const string GET_COUPONS_LIST_CACHE_KEY = "coupons.list";

        public CouponServiceCachingDecorator(ICouponService couponService, IMemoryCache memoryCache, EShopDbContext context)
        {
            _couponService = couponService;
            _memoryCache = memoryCache;
            _context = context;
        }

        public async Task<int> Create(CouponCreateRequest request)
        {
            var coupon = new Coupon()
            {
                Code = request.Code,
                Count = request.Count,
                Promotion = request.Promotion,
                Describe = request.Describe
            };

            _context.Coupons.Add(coupon);
            await _context.SaveChangesAsync();
            return coupon.Id;
        }

        public async Task<int> Delete(int couponId)
        {
            var coupon = await _context.Coupons.FindAsync(couponId);
            if (coupon == null) throw new EShopException($"Không thể tìm coupon có ID: {coupon} ");

            _context.Coupons.Remove(coupon);

            return await _context.SaveChangesAsync();
        }

        public async Task<List<CouponViewModel>> GetAll()
        {
            var query = from c in _context.Coupons
                        select new { c };

            return await query.Select(x => new CouponViewModel()
            {
                Id = x.c.Id,
                Code = x.c.Code,
                Count = x.c.Count,
                Promotion = x.c.Promotion,
                Describe = x.c.Describe
            }).ToListAsync();
        }

        public async Task<PagedResult<CouponViewModel>> GetAllPaging(GetManageProductPagingRequest request)
        {
            PagedResult<CouponViewModel> pagedResult = null;

            if (!_memoryCache.TryGetValue(GET_COUPONS_LIST_CACHE_KEY, out pagedResult))
            {
                var query = from c in _context.Coupons
                            select new { c };

                if (!string.IsNullOrEmpty(request.Keyword))
                    query = query.Where(x => x.c.Code.Contains(request.Keyword));

                var data = await query.Skip((request.PageIndex - 1) * request.PageSize)
                    .Take(request.PageSize)
                    .Select(x => new CouponViewModel()
                    {
                        Id = x.c.Id,
                        Code = x.c.Code,
                        Count = x.c.Count,
                        Promotion = x.c.Promotion,
                        Describe = x.c.Describe
                    }).ToListAsync();

                //3. Paging
                int totalRow = await query.CountAsync();

                //4. Select and projection
                pagedResult = new PagedResult<CouponViewModel>()
                {
                    TotalRecords = totalRow,
                    PageSize = request.PageSize,
                    PageIndex = request.PageIndex,
                    Items = data
                };

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(1));

                _memoryCache.Set(GET_COUPONS_LIST_CACHE_KEY, pagedResult, cacheEntryOptions);
            }

            return pagedResult;
        }

        public async Task<CouponViewModel> GetById(int id)
        {
            var query = from c in _context.Coupons
                        where c.Id == id
                        select new { c };

            return await query.Select(x => new CouponViewModel()
            {
                Id = x.c.Id,
                Code = x.c.Code,
                Count = x.c.Count,
                Promotion = x.c.Promotion,
                Describe = x.c.Describe
            }).FirstOrDefaultAsync();
        }

        public async Task<int> Update(CouponUpdateRequest request)
        {
            var coupon = await _context.Coupons.FindAsync(request.Id);
            if (coupon == null) throw new EShopException($"Không thể tìm coupon có ID: {request.Id} ");

            coupon.Code = request.Code;
            coupon.Count = request.Count;
            coupon.Promotion = request.Promotion;
            coupon.Describe = request.Describe;

            return await _context.SaveChangesAsync();
        }
    }
}