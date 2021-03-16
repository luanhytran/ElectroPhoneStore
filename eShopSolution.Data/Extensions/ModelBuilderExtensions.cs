using eShopSolution.Data.Entities;
using eShopSolution.Data.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.Data.Extentions
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AppConfig>().HasData(
               new AppConfig() { Key = "HomeTitle", Value = "This is home page of eShopSolution" },
               new AppConfig() { Key = "HomeKeyWord", Value = "This is keyword of eShopSolution" },
               new AppConfig() { Key = "HomeDescription", Value = "This is description of eShopSolution" }
               );

            modelBuilder.Entity<Language>().HasData(
                new Language() { Id = "vi-vn", Name = "Tiếng Việt", IsDefault = true },
                new Language() { Id = "en-US", Name = "English", IsDefault = false }
                );

            modelBuilder.Entity<Category>().HasData(
              new Category()
              {
                  Id = 1,
                  IsShowOnHome = true,
                  ParentId = null,
                  SortOrder = 1,
                  Status = Status.Active,
              },
             
              new Category()
              {
                  Id=2,
                  IsShowOnHome = true,
                  ParentId = null,
                  SortOrder = 2,
                  Status = Status.Active,
                  
              }
              );

            modelBuilder.Entity<CategoryTranslation>().HasData( 
                  new CategoryTranslation() { Id = 1, CategoryId=1, Name = "Áo nam", LanguageId="vi-vn", SeoAlias="ao-nam",SeoDescription="Sản phẩm áo thời trang nam",SeoTitle= "Sản phẩm áo thời trang nam" },
                  new CategoryTranslation() { Id = 2, CategoryId = 1, Name = "Men Shirt", LanguageId="en-US", SeoAlias="men-shirt",SeoDescription="The shirt product for men",SeoTitle= "The shirt product for men" },
                  new CategoryTranslation() { Id = 3, CategoryId = 2, Name = "Áo nữ", LanguageId = "vi-vn", SeoAlias = "ao-nu", SeoDescription = "Sản phẩm áo thời trang nữ", SeoTitle = "Sản phẩm áo thời trang nữ" },
                  new CategoryTranslation() { Id = 4, CategoryId = 2, Name = "Women Shirt", LanguageId = "en-US", SeoAlias = "women-shirt", SeoDescription = "The shirt product for women", SeoTitle = "The shirt product for women" }
              );

            modelBuilder.Entity<Product>().HasData(
             new Product()
             {
                 Id=1,
                 DateCreated=DateTime.Now,
                 OriginalPrice=100000,
                 Price=200000,
                 Stock=0,
                 ViewCount=0,
             });
            modelBuilder.Entity<ProductTranslation>().HasData(
                  new ProductTranslation()
                  {
                      Id=1,
                      ProductId=1,
                      Name = "Áo sơ mi nam trắng",
                      LanguageId = "vi-vn",
                      SeoAlias = "ao-so-mi",
                      SeoDescription = "Áo sơ mi nam trắng",
                      SeoTitle = "Áo sơ mi nam trắng",
                      Details = "Áo sơ mi nam trắng"
                  },
                  new ProductTranslation()
                  {
                      Id=2,
                      ProductId=1,
                      Name = "Men T-Shirt",
                      LanguageId = "en-US",
                      SeoAlias = "Men T-Shirt",
                      SeoDescription = "Men T-Shirt",
                      SeoTitle = "Men T-Shirt",
                      Details = "Men T-Shirt",
                      Description = ""
                  });
            modelBuilder.Entity<ProductInCategory>().HasData(
                new ProductInCategory() { ProductId = 1, CategoryId = 1 }
                );

            // tạo data cho user mặc định
            // any guid
            var roleId = new Guid("8D04DCE2-969A-435D-BBA4-DF3F325983DC");
            var adminId = new Guid("69BD714F-9576-45BA-B5B7-F00649BE00DE");
            modelBuilder.Entity<AppRole>().HasData(new AppRole
            {
                Id = roleId,
                Name = "admin",
                NormalizedName = "admin",
                Description = "Administrator role"
            });

            var hasher = new PasswordHasher<AppUser>();
            modelBuilder.Entity<AppUser>().HasData(new AppUser
            {
                Id = adminId,
                UserName = "admin",
                NormalizedUserName = "admin",
                Email = "hytranluan@gmail.com",
                NormalizedEmail = "hytranluan@gmail.com",
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, "Abcd1234$"),
                SecurityStamp = string.Empty,
                FirstName = "Hy",
                LastName = "Luan",
                Dob = new DateTime(2000, 10, 24)
            });

            // gán role admin và admin user
            modelBuilder.Entity<IdentityUserRole<Guid>>().HasData(new IdentityUserRole<Guid>
            {
                RoleId = roleId,
                UserId = adminId
            });
        }
    }
}
