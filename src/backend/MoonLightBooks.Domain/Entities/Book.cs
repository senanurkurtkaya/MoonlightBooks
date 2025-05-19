namespace MoonLightBooks.Domain.Entities

{
    public class Book
    {
        public int Id { get; set; }

        // Kitap başlığı
        public string Title { get; set; } = string.Empty;

        // Yazar adı
        public string Author { get; set; } = string.Empty;

        // Kitap açıklaması
        public string Description { get; set; } = string.Empty;

        // Fiyat bilgisi
        public decimal Price { get; set; }

        // Stok miktarı
        public int Stock { get; set; }

        // Kitap kapak görseli (URL)
        public string ImageUrl { get; set; } = string.Empty;

        // Opsiyonel indirim yüzdesi
        public int? DiscountPercent { get; set; }

        // Basım tarihi (isteğe bağlı)
        public DateTime? PublishDate { get; set; }

        // Kategori FK
        public int CategoryId { get; set; }

        // Navigasyon: Kategori
        public Category? Category { get; set; }

        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}
