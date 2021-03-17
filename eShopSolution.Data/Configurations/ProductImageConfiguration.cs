using eShopSolution.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.Data.Configurations
{
    public class ProductImageConfiguration : IEntityTypeConfiguration<ProductImage>
    {
        public void Configure(EntityTypeBuilder<ProductImage> builder)
        {
            builder.ToTable("ProductImage");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.ImagePath).HasMaxLength(200).IsRequired(true);

            builder.Property(x => x.Caption).HasMaxLength(200).IsRequired(false);

            builder.Property(x => x.Id).UseIdentityColumn();

            // xác định khóa ngoại
            // một sản phẩm có thể xuất hiên trong nhiều cart
            builder.HasOne(x => x.Product).WithMany(x => x.ProductImage).HasForeignKey(x => x.ProductId);
        }
    }
}
