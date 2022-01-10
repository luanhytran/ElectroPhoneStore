using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace eShopSolution.Data.Entities
{
    internal interface IMVCEshop
    {
        Task<RegisterState> UpdateDatabase(UserManager<AppUser> userManager, string password);
    }

    // Guid là kiểu duy nhất cho toàn hệ thống
    public class AppUser : IdentityUser<Guid>, IMVCEshop
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

    public class ProxyAppUser : IMVCEshop
    {
        private readonly AppUser user;

        public ProxyAppUser(AppUser user)
        {
            this.user = user;
        }

        public async Task<RegisterState> UpdateDatabase(UserManager<AppUser> userManager, string password)
        {
            var LOG_PATH = @"..\eShopSolution.Data\NotAllowName.txt";
            List<string> notAllowName = new List<string>();
            var logFile = File.ReadAllLines(LOG_PATH);
            foreach (var s in logFile) notAllowName.Add(s);

            foreach (var name in notAllowName)
            {
                if (user.Name == name)
                    return RegisterState.InvalidName;
            }

            return await user.UpdateDatabase(userManager, password);
        }
    }
}