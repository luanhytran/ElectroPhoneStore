using eShopSolution.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.Data.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("Products");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();

            builder.Property(x => x.Price).IsRequired().HasMaxLength(100000000);

            builder.Property(x => x.Stock).IsRequired().HasDefaultValue(0).HasMaxLength(100);

            builder.Property(x => x.Name).IsRequired().HasMaxLength(100);

            builder.Property(x => x.Description).IsRequired().HasMaxLength(2000);

            builder.Property(x => x.Details).HasColumnType("nvarchar(max)");

            builder.Property(x => x.Thumbnail).HasMaxLength(300).IsRequired(false);

            builder.Property(x => x.ProductImage).HasMaxLength(300).IsRequired(false);

            builder.HasOne(x => x.Category).WithMany(x => x.Products).HasForeignKey(x => x.CategoryId);
        }
    }
}