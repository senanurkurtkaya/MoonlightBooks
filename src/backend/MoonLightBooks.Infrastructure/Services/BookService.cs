using MoonLightBooks.Domain.Entities;
using MoonLightBooks.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MoonLightBooks.Application.Interfaces;
using MoonLightBooks.Application.DTOs;
using Microsoft.EntityFrameworkCore;
using MoonLightBooks.Application.DTOs.Book;

namespace MoonLightBooks.Infrastructure.Services
{
    public class BookService : IBookService
    {
        private readonly AppDbContext _context;

        public BookService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<BookDto>> GetAllAsync()
        {
            var books = await _context.Books
                .Include(b => b.Category) // kategori verisini de dahil et
                .Select(b => new BookDto
                {
                    Id = b.Id,
                    Title = b.Title,
                    Author = b.Author,
                    Description = b.Description,
                    Price = b.Price,
                    Stock = b.Stock,
                    Quantity = 0, // eğer alışveriş sepetinde kullanılmıyorsa 0 dönebilir
                    ImageUrl = b.ImageUrl,
                    DiscountPercent = b.DiscountPercent,
                    PublishDate = b.PublishDate,
                    CategoryId = b.CategoryId,
                    CategoryName = b.Category != null ? b.Category.Name : string.Empty
                })
                .ToListAsync();

            return books;
        }


        public async Task<BookDto?> GetByIdAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) return null;

            return new BookDto
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                Price = book.Price,
                CategoryId = book.CategoryId
            };
        }

        public async Task<BookDto> CreateAsync(BookDto dto)
        {
            var book = new Book
            {
                Title = dto.Title,
                Author = dto.Author,
                Description = dto.Description,
                Price = dto.Price,
                Stock = dto.Stock,
                ImageUrl = dto.ImageUrl ?? "",
                DiscountPercent = dto.DiscountPercent,
                PublishDate = dto.PublishDate,
                CategoryId = dto.CategoryId
            };

            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            dto.Id = book.Id;
            return dto;
        }


        public async Task<bool> UpdateAsync(int id, BookDto dto)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) return false;

            book.Title = dto.Title;
            book.Author = dto.Author;
            book.Price = dto.Price;
            book.CategoryId = dto.CategoryId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) return false;

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<BookDto>> GetBooksByCategoryAsync(int categoryId)
        {
            return await _context.Books
        .Where(b => b.CategoryId == categoryId)
        .Select(book => new BookDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            Price = book.Price,
            CategoryId = book.CategoryId,
            ImageUrl = book.ImageUrl


        })
        .ToListAsync();
        }

        public async Task<List<Book>> GetFilteredBooksAsync(BookFilterDto filter)
        {
            var query = _context.Books.AsQueryable();

            if (!string.IsNullOrEmpty(filter.Search))
            {
                query = query.Where(b => b.Title.Contains(filter.Search));
            }

            if (filter.CategoryId.HasValue)
            {
                query = query.Where(b => b.CategoryId == filter.CategoryId.Value);
            }

            if (filter.MinPrice.HasValue)
            {
                query = query.Where(b => b.Price >= filter.MinPrice.Value);
            }

            if (filter.MaxPrice.HasValue)
            {
                query = query.Where(b => b.Price <= filter.MaxPrice.Value);
            }

            // Sıralama
            if (!string.IsNullOrEmpty(filter.SortBy))
            {
                switch (filter.SortBy.ToLower())
                {
                    case "price":
                        query = filter.SortDirection == "desc"
                            ? query.OrderByDescending(b => b.Price)
                            : query.OrderBy(b => b.Price);
                        break;
                    case "title":
                        query = filter.SortDirection == "desc"
                            ? query.OrderByDescending(b => b.Title)
                            : query.OrderBy(b => b.Title);
                        break;
                }
            }

            return await query.ToListAsync();
        }
    }
}
