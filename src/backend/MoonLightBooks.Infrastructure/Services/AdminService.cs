using Microsoft.EntityFrameworkCore;
using MoonLightBooks.Application.DTOs.User;
using MoonLightBooks.Application.Interfaces;
using MoonLightBooks.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using MoonLightBooks.Domain.Entities;

namespace MoonLightBooks.Infrastructure.Services
{
    public class AdminService : IAdminService
    {
        private readonly AppDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public AdminService(AppDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        public async Task<List<UserDto>> GetAllAdmins()
        {
            var admins = await _userManager.GetUsersInRoleAsync("Admin");
            
            var adminList = new List<UserDto>();

            foreach (var admin in admins)
            {
                 var roles = await _userManager.GetRolesAsync(admin);
                 adminList.Add(new UserDto
                 {
                     Id = admin.Id,
                     FullName = admin.FullName,
                     Email = admin.Email,
                     Roles = roles.ToList()
                 });
            }
            
            return adminList;
        }
    }
}
