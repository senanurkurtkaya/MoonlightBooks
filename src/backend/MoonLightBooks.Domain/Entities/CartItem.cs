namespace MoonLightBooks.Domain.Entities
{
    public class CartItem
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int BookId { get; set; }

        public int Quantity { get; set; }

        public DateTime AddedAt { get; set; } = DateTime.UtcNow;

        public User User { get; set; }
        public Book Book { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsCheckedOut { get; set; }
    }
}
