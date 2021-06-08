using eShopSolution.Data.Entities;
using eShopSolution.ViewModels.Common;
using eShopSolution.ViewModels.System.Users;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eShopSolution.Application.System.Users
{
    public interface IUserService
    {
        Task<ApiResult<string>> Authencate(LoginRequest request);

        Task<ApiResult<string>> Register(RegisterRequest request);

        Task<ApiResult<bool>> Update(Guid id, UserUpdateRequest request);

        Task<List<UserViewModel>> GetAll();

        Task<ApiResult<PagedResult<UserViewModel>>> GetUsersPaging(GetUserPagingRequest request);

        Task<ApiResult<UserViewModel>> GetById(Guid id);

        Task<ApiResult<UserViewModel>> GetByUserName(string userName);

        Task<ApiResult<bool>> Delete(Guid id);

        Task<ApiResult<bool>> RoleAssign(Guid id, RoleAssignRequest request);

        Task<ApiResult<bool>> ChangePassword(ChangePasswordViewModel model);

        Task<ApiResult<bool>> ConfirmEmail(ConfirmEmailViewModel request);

        Task<ApiResult<string>> ForgotPassword(ForgotPasswordViewModel request);
        Task<ApiResult<bool>> ResetPassword(ResetPasswordViewModel request);
    }
}
