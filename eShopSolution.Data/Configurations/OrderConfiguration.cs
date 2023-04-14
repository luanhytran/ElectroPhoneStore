using eShopSolution.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace eShopSolution.Data.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.ToTable("Orders");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();

            builder.Property(x => x.OrderDate);

            builder.Property(x => x.CouponId);

            builder.HasOne(x => x.AppUser).WithMany(x => x.Orders).HasForeignKey(x => x.UserId);

            builder.HasOne(x => x.Coupon).WithMany(x => x.Orders).HasForeignKey(x => x.CouponId);
        }
    }
}