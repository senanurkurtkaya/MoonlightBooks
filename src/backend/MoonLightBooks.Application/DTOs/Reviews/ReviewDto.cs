using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Application.DTOs.Reviews
{
     public class ReviewDto
    {
        public int Id { get; set; }

        public string UserName { get; set; } = string.Empty;
        public string Comment { get; set; } = string.Empty;
        public int Rating { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
