using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoonLightBooks.Application.DTOs.Admin;
using MoonLightBooks.Application.DTOs.User;
using MoonLightBooks.Application.Interfaces;
using MoonLightBooks.Infrastructure.Data;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using MoonLightBooks.Domain.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MoonLightBooks.API.Controllers
{
    [Route("api/admin")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IAdminService _adminService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AdminController(AppDbContext context, IAdminService adminService, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _adminService = adminService;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        [HttpGet("secret")]
        public IActionResult GetSecret()
        {
            return Ok("🔒 Bu bilgiye sadece admin ulaşabilir. Hoş geldin patron!");
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            var result = new List<UserDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                result.Add(new UserDto
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    Roles = roles.ToList()
                });
            }

            return Ok(result);
        }

        [HttpPost("update-role")]
        public async Task<IActionResult> UpdateUserRole([FromBody] UpdateUserRoleDto dto)
        {
            var user = await _userManager.FindByIdAsync(dto.UserId);

            if (user == null)
                return NotFound(new { message = "Kullanıcı bulunamadı." });

            var currentRoles = await _userManager.GetRolesAsync(user);
            var removeResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
            if (!removeResult.Succeeded)
            {
                return BadRequest("Mevcut roller silinemedi.");
            }

            // Yeni rol var mı kontrol et, yoksa oluştur
            if (!await _roleManager.RoleExistsAsync(dto.Role))
            {
                await _roleManager.CreateAsync(new IdentityRole(dto.Role));
            }

            var addResult = await _userManager.AddToRoleAsync(user, dto.Role);
             if (!addResult.Succeeded)
            {
                 return BadRequest("Rol ataması başarısız.");
            }

            return Ok(new { message = $"Kullanıcının rolü '{dto.Role}' olarak güncellendi." });
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
                return NotFound(new { message = "Kullanıcı bulunamadı." });

            // Admin kendi hesabını silemesin
            var currentUserEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (user.Email.ToLower() == currentUserEmail?.ToLower())
                return BadRequest(new { message = "Kendi hesabınızı silemezsiniz." });

            // Son admin mi?
            var isAdmin = await _userManager.IsInRoleAsync(user, "Admin");
            if (isAdmin)
            {
                var adminCount = (await _userManager.GetUsersInRoleAsync("Admin")).Count;
                if (adminCount <= 1)
                    return BadRequest(new { message = "Sistemde en az bir admin kalmalıdır." });
            }

            var result = await _userManager.DeleteAsync(user);
             if (!result.Succeeded)
            {
                 return BadRequest("Kullanıcı silinirken bir hata oluştu.");
            }

            return Ok(new { message = "Kullanıcı başarıyla silindi." });
        }

        [HttpGet("dashboard")]
        public IActionResult GetDashboardStats()
        {
            var totalBooks = _context.Books.Count();
            var totalUsers = _context.Users.Count();
            var totalOrders = _context.Orders.Count();
            var totalRevenue = _context.Orders.Sum(o => o.TotalPrice);

            return Ok(new
            {
                totalBooks,
                totalUsers,
                totalOrders,
                totalRevenue
            });
        }
    }
}
