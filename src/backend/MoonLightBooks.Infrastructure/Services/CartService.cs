using Microsoft.EntityFrameworkCore;
using MoonLightBooks.Application.DTOs.Cart;
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
    public class CartService : ICartService
    {
        private readonly AppDbContext _context;
        public CartService(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddToCartAsync(string userId, AddToCartDto dto)
        {
            var existing = await _context.CartItems
           .FirstOrDefaultAsync(c => c.UserId == userId && c.BookId == dto.BookId);

            if (existing != null)
            {
                existing.Quantity += dto.Quantity;
            }
            else
            {
                var newItem = new CartItem
                {
                    UserId = userId,
                    BookId = dto.BookId,
                    Quantity = dto.Quantity,
                    CreatedAt = DateTime.Now,
                    IsCheckedOut = false
                };

                _context.CartItems.Add(newItem);
            }

            await _context.SaveChangesAsync();
        }

        public async Task ClearCartAsync(string userId)
        {
            var items = await _context.CartItems
        .Where(c => c.UserId == userId)
        .ToListAsync();

            _context.CartItems.RemoveRange(items);
            await _context.SaveChangesAsync();
        }

        public async Task<List<CartItemDto>> GetCartAsync(string userId)
        {
            return await _context.CartItems
          .Where(c => c.UserId == userId)
          .Include(c => c.Book)
          .Select(c => new CartItemDto
          {
              Id = c.Id,
              BookId = c.BookId,
              BookTitle = c.Book.Title,
              BookImageUrl = c.Book.ImageUrl,
              Quantity = c.Quantity,
              Price = c.Book.Price
          })
        .ToListAsync();
        }

        public async Task RemoveFromCartAsync(int cartItemId)
        {
            var item = await _context.CartItems.FindAsync(cartItemId);
            if (item != null)
            {
                _context.CartItems.Remove(item);
                await _context.SaveChangesAsync();
            }
        }
    }
}
