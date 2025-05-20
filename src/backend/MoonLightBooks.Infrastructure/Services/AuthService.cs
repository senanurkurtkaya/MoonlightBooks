using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MoonLightBooks.Application.DTOs.Auth;
using MoonLightBooks.Application.Interfaces;
using MoonLightBooks.Domain.Entities;
using MoonLightBooks.Infrastructure.Data;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace MoonLightBooks.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AuthService(AppDbContext context,
                           IConfiguration configuration,
                           UserManager<ApplicationUser> userManager,
                           RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
        {
            if (await _userManager.FindByEmailAsync(dto.Email) != null)
                throw new Exception("Bu email adresi zaten kayıtlı.");

            var passwordHash = HashPassword(dto.Password);

            var user = new ApplicationUser
            {
                FullName = dto.FullName,
                Email = dto.Email.ToLower(),
                UserName = dto.Email.ToLower(),
                PasswordHash = passwordHash,
                Role = "User" // default rolü saklamak istiyorsan
            };

            // EF ile kaydet
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Identity tablosuna rol ataması
            var role = "User";

            if (!await _roleManager.RoleExistsAsync(role))
                await _roleManager.CreateAsync(new IdentityRole(role));

            await _userManager.AddToRoleAsync(user, role);

            return GenerateToken(user);
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == dto.Email.ToLower());

            if (user == null || !VerifyPassword(dto.Password, user.PasswordHash))
                throw new Exception("Geçersiz email veya şifre.");

            return GenerateToken(user);
        }

        private string HashPassword(string password)
        {
            var key = Encoding.UTF8.GetBytes("gizli-test-key-12345678901234567890"); // min 32 byte
            using var hmac = new HMACSHA256(key);
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            var hashBytes = hmac.ComputeHash(passwordBytes);
            return Convert.ToBase64String(hashBytes);
        }

        private bool VerifyPassword(string password, string storedHash)
        {
            return HashPassword(password) == storedHash;
        }

     
        private AuthResponseDto GenerateToken(ApplicationUser user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
        new Claim("fullName", user.FullName),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role), // 👈 BU ÖNEMLİ
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
    };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            return new AuthResponseDto
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Username = user.FullName,
                Role = user.Role
            };
        }



        public async Task<AuthResult> ForgotPasswordAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                return new AuthResult { IsSuccess = false, Message = "Kullanıcı bulunamadı." };

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var resetLink = $"https://seninsiten.com/reset-password?email={email}&token={HttpUtility.UrlEncode(token)}";

            Console.WriteLine($"Şifre sıfırlama linki: {resetLink}");

            return new AuthResult { IsSuccess = true };
        }
    }
}
