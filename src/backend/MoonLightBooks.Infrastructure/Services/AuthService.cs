using Humanizer.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MoonLightBooks.Application.DTOs.Auth;
using MoonLightBooks.Application.Interfaces;
using MoonLightBooks.Domain.Entities;
using MoonLightBooks.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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

        public AuthService(AppDbContext context, IConfiguration configuration , UserManager<User> userManager)
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
        {
            var users = _context.Users.ToList();


            // Email zaten kayıtlı mı?
            if (await _context.Users.AnyAsync(u => u.Email.ToLower() == dto.Email.ToLower()))
                throw new Exception("Bu email adresi zaten kayıtlı.");

            // Şifre hash'leme
            var passwordHash = HashPassword(dto.Password);

            // 🔽 Email'e göre rol atama
            var role = dto.Email.ToLower().Contains("admin") ? "Admin" : "User";

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email.ToLower(),
                PasswordHash = passwordHash,
                Role = dto.Role  // 🔥 Artık dinamik!
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return GenerateToken(user);
        }
        public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == dto.Email.ToLower());

            if (user == null || !VerifyPassword(dto.Password, user.PasswordHash))
                throw new Exception("Geçersiz email veya şifre.");

            return GenerateToken(user);
        }




        // Şifreyi hash'le (HMACSHA256 kullanıyoruz)
        private string HashPassword(string password)
        {
            var key = Encoding.UTF8.GetBytes("gizli-test-key-12345678901234567890"); // en az 32 byte
            using var hmac = new HMACSHA256(key);
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            var hashBytes = hmac.ComputeHash(passwordBytes);
            return Convert.ToBase64String(hashBytes);
        }


        private bool VerifyPassword(string password, string storedHash)
        {
            return HashPassword(password) == storedHash;
        }

        private AuthResponseDto GenerateToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
        {
               new Claim("fullName", user.FullName), 
               new Claim(ClaimTypes.Email, user.Email),
               new Claim(ClaimTypes.Role, user.Role),
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

        public async Task<ForgotPasswordDto> ForgotPasswordAsync(string email)
        {
            var user = await _context.FindByEmailAsync(email);

            if (user == null)
                return new AuthResult { IsSuccess = false, Message = "Kullanıcı bulunamadı." };

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var resetLink = $"https://seninsiten.com/reset-password?email={email}&token={HttpUtility.UrlEncode(token)}";

            // E-posta gönderme işlemi yapılabilir burada. Şimdilik log'a yazalım:
            Console.WriteLine($"Şifre sıfırlama linki: {resetLink}");

            return new AuthResult { IsSuccess = true };
        }
    }
}

