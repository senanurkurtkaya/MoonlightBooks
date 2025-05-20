using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Application.DTOs.User
{
    public class UserDto
    {
        public string Id { get; set; }
        public string FullName { get; set; }

        public string Email { get; set; }

        public string Role { get; set; } = string.Empty;

        public IList<string> Roles { get; set; }
    }
}
