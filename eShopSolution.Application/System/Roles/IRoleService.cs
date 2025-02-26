using System.Collections.Generic;
using System.Threading.Tasks;
using eShopSolution.ViewModels.System.Roles;

namespace eShopSolution.Application.System.Roles
{
    public interface IRoleService
    {
        Task<List<RoleViewModel>> GetAll();
    }
}
