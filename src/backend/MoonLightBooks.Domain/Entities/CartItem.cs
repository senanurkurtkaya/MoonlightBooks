namespace MoonLightBooks.Domain.Entities
{
    public class CartItem
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int BookId { get; set; }

        public int Quantity { get; set; }

        public DateTime AddedAt { get; set; } = DateTime.UtcNow;

        public ApplicationUser User { get; set; }
        public Book Book { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsCheckedOut { get; set; }
    }
}
