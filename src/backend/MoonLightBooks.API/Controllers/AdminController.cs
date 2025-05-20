using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoonLightBooks.Application.DTOs.Admin;
using MoonLightBooks.Application.DTOs.User;
using MoonLightBooks.Application.Interfaces;
using MoonLightBooks.Infrastructure.Data;

namespace MoonLightBooks.API.Controllers
{
    [Route("api/admin")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IAdminService _adminService;

        public AdminController(AppDbContext context, IAdminService adminService)
        {
            _context = context;
            _adminService = adminService;
        }

        [HttpGet("secret")]
        public IActionResult GetSecret()
        {
            var admins = _adminService.GetAllAdmins();
            return Ok("🔒 Bu bilgiye sadece admin ulaşabilir. Hoş geldin patron!");
        }

        [HttpGet("users")]
        public IActionResult GetAllUsers()
        {
            var users = _context.Users
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    FullName = u.FullName,
                    Email = u.Email,
                    Role = u.Role
                }).ToList();

            return Ok(users);
        }

        [HttpPost("update-role")]
        public async Task<IActionResult> UpdateUserRole([FromBody] UpdateUserRoleDto dto)
        {
            var user = await _context.Users.FindAsync(dto.UserId);

            if (user == null)
                return NotFound(new { message = "Kullanıcı bulunamadı." });

            user.Role = dto.Role;
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Kullanıcının rolü '{dto.Role}' olarak güncellendi." });
        }


        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound(new { message = "Kullanıcı bulunamadı." });

            // 1. Admin kendi hesabını silmeye çalışıyorsa engelle
            var currentUserEmail = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;
            if (user.Email.ToLower() == currentUserEmail?.ToLower())
                return BadRequest(new { message = "Kendi hesabınızı silemezsiniz." });

            // 2. Bu kullanıcı son admin ise silinmesini engelle
            if (user.Role == "Admin")
            {
                int adminCount = _context.Users.Count(u => u.Role == "Admin");
                if (adminCount <= 1)
                    return BadRequest(new { message = "Sistemde en az bir admin bulunmalıdır." });
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

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
             
                totalUsers,
                totalOrders,
                totalRevenue,
               
            });
        } 
    }
}

