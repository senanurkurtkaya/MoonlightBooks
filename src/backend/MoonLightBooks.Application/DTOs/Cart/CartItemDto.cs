using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Application.DTOs.Cart
{
    public class CartItemDto
    {
        public int Id { get; set; }

        // Kitap başlığı
        public string BookTitle { get; set; } = string.Empty;

        // Miktar
        public int Quantity { get; set; }

        // Birim fiyat
        public decimal Price { get; set; }

        // Toplam fiyat
        public decimal TotalPrice => Quantity * Price;

        // Kitap görseli (isteğe bağlı)
        public string? BookImageUrl { get; set; }
        public int BookId { get; set; }
    }
}
