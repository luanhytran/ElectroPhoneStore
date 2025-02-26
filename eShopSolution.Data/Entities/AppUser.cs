using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace eShopSolution.Data.Entities
{
    // Guid là kiểu duy nhất cho toàn hệ thống
    public class AppUser : IdentityUser<Guid>
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public List<Order> Orders { get; set; }

        public ICollection<Review> Reviews { get; set; }
    }
}