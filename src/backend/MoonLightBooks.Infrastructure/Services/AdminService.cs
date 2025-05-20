using Microsoft.EntityFrameworkCore;
using MoonLightBooks.Application.DTOs.User;
using MoonLightBooks.Application.Interfaces;
using MoonLightBooks.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Infrastructure.Services
{
    public class AdminService : IAdminService
    {
        private readonly AppDbContext _context;

        public AdminService(AppDbContext context)
        {
            _context = context;
        }
        public List<UserDto> GetAllAdmins()
        {
            return _context.Users
               .Where(u => u.Role == "Admin")
               .Select(u => new UserDto
               {
                   FullName = u.FullName,
                   Email = u.Email
               }).ToList();
        }
    }
}
