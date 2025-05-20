namespace MoonLightBooks.Domain.Entities
{
    public class Review
    {
        public int Id { get; set; }

        public int BookId { get; set; }
        public Book Book { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public string Comment { get; set; } = string.Empty;
        public int Rating { get; set; } // 1-5 arası yıldız puanı

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;



    }
}
