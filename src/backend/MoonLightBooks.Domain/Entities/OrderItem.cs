namespace MoonLightBooks.Domain.Entities
{
    public class OrderItem
    {
        public int Id { get; set; }

        // Bağlı olduğu siparişin ID'si
        public int OrderId { get; set; }

        // Kitap ID'si
        public int BookId { get; set; }

        // Sipariş edilen miktar
        public int Quantity { get; set; }

        // Birim fiyat (indirimli olabilir)
        public decimal UnitPrice { get; set; }

        // Toplam fiyat (Quantity * UnitPrice)
        public decimal Total => Quantity * UnitPrice;

        // Navigasyonlar
        public Order? Order { get; set; }
        public Book? Book { get; set; }
    }
}
