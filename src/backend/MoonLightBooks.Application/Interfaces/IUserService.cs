using MoonLightBooks.Application.DTOs.User;
using MoonLightBooks.Application.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Application.Interfaces
{
    public interface IUserService
    {
        Task<List<UserDto>> GetAllUsersAsync();
        Task<string> AssignRoleAsync(RoleAssignRequest request);

    }
}
