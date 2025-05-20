using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MoonLightBooks.Domain.Entities;

namespace MoonLightBooks.API.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using MoonLightBooks.Application.Model;

    namespace YourProjectNamespace.Controllers
    {
        [ApiController]
        [Route("api/[controller]")]
        [Authorize(Roles = "Admin")]
        public class UserController : ControllerBase
        {
            private readonly UserManager<ApplicationUser> _userManager;
            private readonly RoleManager<IdentityRole> _roleManager;

            public UserController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
            {
                _userManager = userManager;
                _roleManager = roleManager;
            }

            // 1. Kullanıcıları Listeleme
            [HttpGet("all")]
            public async Task<IActionResult> GetAllUsers()
            {
                var users = await _userManager.Users.ToListAsync();
                var result = new List<object>();

                foreach (var user in users)
                {
                    var roles = await _userManager.GetRolesAsync(user);
                    result.Add(new
                    {
                        user.Id,
                        user.UserName,
                        user.Email,
                        Roles = roles
                    });
                }

                return Ok(result);
            }

            // 2. Role Atama
            [HttpPost("assign-role")]
            [Authorize(Roles = "Admin")]
            public async Task<IActionResult> AssignRole([FromBody] RoleAssignRequest request)
            {
                var user = await _userManager.FindByIdAsync(request.UserId);
                if (user == null)
                {
                    return NotFound("Kullanıcı bulunamadı.");
                }

                // Mevcut rollerini sil
                var currentRoles = await _userManager.GetRolesAsync(user);
                var removeResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
                if (!removeResult.Succeeded)
                {
                    return BadRequest("Mevcut roller silinemedi.");
                }

                // Yeni rol var mı kontrol et, yoksa oluştur
                if (!await _roleManager.RoleExistsAsync(request.Role))
                {
                    await _roleManager.CreateAsync(new IdentityRole(request.Role));
                }

                // Yeni rol ata
                var addResult = await _userManager.AddToRoleAsync(user, request.Role);
                if (!addResult.Succeeded)
                {
                    return BadRequest("Rol ataması başarısız.");
                }

                return Ok("Rol başarıyla atandı.");
            }
        }
    }
}
