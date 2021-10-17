using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eShopSolution.Data.Entities
{

    interface MVCEshop
    {
        Task<RegisterState> UpdateDatabase(UserManager<AppUser> userManager, string password);
    }

    // Guid là kiểu duy nhất cho toàn hệ thống
    public class AppUser : IdentityUser<Guid>, MVCEshop
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public List<Order> Orders { get; set; }

        public ICollection<Review> Reviews { get; set; }

        public async Task<RegisterState> UpdateDatabase(UserManager<AppUser> userManager, string password)
        {
            await userManager.CreateAsync(this, password);

            return RegisterState.Valid;
        }
    }

    public class ProxyAppUser : MVCEshop
    {
        private AppUser user;
        public ProxyAppUser(AppUser user)
        {
            this.user = user;
        }

        public async Task<RegisterState> UpdateDatabase(UserManager<AppUser> userManager, string password)
        {
            StringComparison comp = StringComparison.OrdinalIgnoreCase;

            List<string> notAllowName = new List<string>() {
                "Ho Chi Minh",
                "Vo Nguyen Giap"
            };

            foreach (var name in notAllowName)
            {
                if (user.Name == name)
                    return RegisterState.InvalidName;
            }

            return await user.UpdateDatabase(userManager, password);
        }
    }
}
