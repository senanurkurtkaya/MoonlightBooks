using MoonLightBooks.Application.DTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Application.Interfaces
{
    public interface IAdminService
    {
        Task<List<UserDto>> GetAllAdmins();
    }
}
