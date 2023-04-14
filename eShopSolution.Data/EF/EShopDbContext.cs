using eShopSolution.Data.Configurations;
using eShopSolution.Data.Entities;
using eShopSolution.Data.Extentions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace eShopSolution.Data.EF
{
    public class EShopDbContext : IdentityDbContext<AppUser, AppRole, Guid>
    {
        public EShopDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Configure using Fluent API

            modelBuilder.ApplyConfiguration(new AppConfigConfiguration());

            modelBuilder.ApplyConfiguration(new ProductConfiguration());

            modelBuilder.ApplyConfiguration(new CategoryConfiguration());

            modelBuilder.ApplyConfiguration(new OrderConfiguration());

            modelBuilder.ApplyConfiguration(new OrderDetailConfiguration());

            modelBuilder.ApplyConfiguration(new LanguageConfiguration());

            modelBuilder.ApplyConfiguration(new AppUserConfiguration());

            modelBuilder.ApplyConfiguration(new AppRoleConfiguration());

            modelBuilder.ApplyConfiguration(new ReviewConfiguration());

            modelBuilder.ApplyConfiguration(new CouponConfiguration());

            modelBuilder.Entity<IdentityUserClaim<Guid>>().ToTable("AppUserClaims");

            // những entity có HasKey là do lúc migrate báo lỗi yêu cầu thêm key
            modelBuilder.Entity<IdentityUserRole<Guid>>().ToTable("AppUserRoles").HasKey(x => new { x.UserId, x.RoleId });

            modelBuilder.Entity<IdentityUserLogin<Guid>>().ToTable("AppUserLogins").HasKey(x => x.UserId);

            modelBuilder.Entity<IdentityRoleClaim<Guid>>().ToTable("AppRoleClaims");

            modelBuilder.Entity<IdentityUserToken<Guid>>().ToTable("AppUserTokens").HasKey(x => x.UserId);

            //Data seeding

            modelBuilder.Seed();

            //base.OnModelCreating(modelBuilder);
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<AppConfig> AppConfigs { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
    }
}