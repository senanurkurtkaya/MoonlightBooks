using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Application.DTOs.Cart
{
    public class CreateBookDto
    {
        // Kitap başlığı
        public string Title { get; set; } = string.Empty;

        // Yazar adı
        public string Author { get; set; } = string.Empty;

        // Açıklama
        public string Description { get; set; } = string.Empty;

        // Fiyat
        public decimal Price { get; set; }

        // Stok adedi
        public int Stock { get; set; }

        // Görsel bağlantısı
        public string? ImageUrl { get; set; }

        // İndirim yüzdesi
        public int? DiscountPercent { get; set; }

        // Basım tarihi
        public DateTime? PublishDate { get; set; }

        // Kategori ID
        public int CategoryId { get; set; }
    }
}
