using eShopSolution.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.Data.Configurations
{
    class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            // do AppUser đã có id do class IdentityUser chỉ định nên không cần
            // xác định id cho Entity này

            builder.ToTable("AppUsers");
            builder.Property(x => x.Name).IsRequired().HasMaxLength(200);
        }
    }
}
