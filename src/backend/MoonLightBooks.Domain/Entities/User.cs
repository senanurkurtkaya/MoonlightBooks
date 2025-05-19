using Microsoft.AspNetCore.Identity;

namespace MoonLightBooks.Domain.Entities
{
    public class User : IdentityUser
    {
        // Tam ad (ad soyad)
        public string FullName { get; set; } = string.Empty;

        // E-posta adresi
        public string Email { get; set; } = string.Empty;

        // Şifre hash'i
        public string PasswordHash { get; set; } = string.Empty;

        // Rol (Admin / User)
        public string Role { get; set; } = "User";

        // Kullanıcı aktif mi?
        public bool IsActive { get; set; } = true;

        // Kayıt tarihi
        public DateTime RegisteredAt { get; set; } = DateTime.UtcNow;

        // Navigasyonlar
        public ICollection<Order> Orders { get; set; } = new List<Order>();
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}
