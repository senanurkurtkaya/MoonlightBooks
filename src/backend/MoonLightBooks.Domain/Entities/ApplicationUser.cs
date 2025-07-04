﻿using Microsoft.AspNetCore.Identity;

namespace MoonLightBooks.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        // Tam ad (ad soyad)
        public string FullName { get; set; } = string.Empty;

        // E-posta adresi
        public string Email { get; set; } = string.Empty;

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
