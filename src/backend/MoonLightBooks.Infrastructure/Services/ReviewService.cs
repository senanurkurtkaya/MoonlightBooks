using Microsoft.EntityFrameworkCore;
using MoonLightBooks.Application.DTOs.Reviews;
using MoonLightBooks.Application.Interfaces;
using MoonLightBooks.Domain.Entities;
using MoonLightBooks.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Infrastructure.Services
{
    public class ReviewService : IReviewService
    {
        private readonly AppDbContext _context;

        public ReviewService(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddReviewAsync(int userId, CreateReviewDto dto)
        {
            var review = new Review
            {
                BookId = dto.BookId,
                Comment = dto.Comment,
                Rating = dto.Rating,
                CreatedAt = DateTime.UtcNow
            };

            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ReviewDto>> GetReviewsByBookIdAsync(int bookId)
        {
            return await _context.Reviews
          .Where(r => r.BookId == bookId)
          .Select(r => new ReviewDto
          {
              Id = r.Id,
              Comment = r.Comment,
              Rating = r.Rating,
              CreatedAt = r.CreatedAt
          })
          .ToListAsync();
        }
    }
}
