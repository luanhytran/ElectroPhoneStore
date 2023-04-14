using eShopSolution.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.Data.Configurations
{
    public class CouponConfiguration : IEntityTypeConfiguration<Coupon>
    {
        public void Configure(EntityTypeBuilder<Coupon> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Code).IsRequired().HasMaxLength(5);

            builder.Property(x => x.Count).IsRequired();

            builder.Property(x => x.Promotion).IsRequired();

            builder.Property(x => x.Describe).IsRequired().HasMaxLength(4000).HasColumnType("nvarchar");
        }
    }
}