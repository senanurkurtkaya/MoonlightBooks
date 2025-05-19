namespace MoonLightBooks.Domain.Entities

{
    public class Order
    {
        public int Id { get; set; }

        public int UserId { get; set; }  // Siparişi kimin verdiği
        public User User { get; set; }  // Navigation

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public decimal TotalPrice { get; set; }

        public string Status { get; set; } = "Hazırlanıyor"; // Durum takibi

        public Review Review { get; set; }

        public int? ReviewId { get; set; }
        public ICollection<OrderItem>? OrderItems { get; set; }
        public string ShippingAddress { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
