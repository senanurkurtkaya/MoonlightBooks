using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Application.DTOs.Admin
{
    public class UpdateUserRoleDto
    {
        public int UserId { get; set; }
        public string Role { get; set; } = string.Empty;
    }
}
