using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Application.DTOs.Reviews
{
   public class CreateReviewDto
    {
        public int BookId { get; set; }

        // Yorum metni
        public string Comment { get; set; } = string.Empty;

        // Puan (1–5)
        public int Rating { get; set; }
    }
}
