using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Application.DTOs
{
    public class BookDto
    {
        public int Id { get; set; }

        // Kitap başlığı
        public string Title { get; set; } = string.Empty;

        // Yazar adı
        public string Author { get; set; } = string.Empty;

        // Açıklama (kitap özeti gibi)
        public string Description { get; set; } = string.Empty;

        // Fiyat bilgisi
        public decimal Price { get; set; }

        // Stok adedi
        public int Stock { get; set; }

        public int Quantity { get; set; }

        // Görsel bağlantısı
        public string? ImageUrl { get; set; }

        // İndirim yüzdesi (opsiyonel)
        public int? DiscountPercent { get; set; }

        // Basım tarihi (isteğe bağlı)
        public DateTime? PublishDate { get; set; }

        // Kategori ID'si
        public int CategoryId { get; set; }

        public string CategoryName { get; set; } = string.Empty;
    }
}
