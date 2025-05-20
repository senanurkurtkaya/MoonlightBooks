using Microsoft.EntityFrameworkCore;
using MoonLightBooks.Application.DTOs;
using MoonLightBooks.Application.DTOs.Orders;
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
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;

        public OrderService(AppDbContext context)
        {
            _context = context;
        }


        public async Task<int> CreateOrderAsync(string userId, CreateOrderDto dto)
        {
            if (dto.Items == null || !dto.Items.Any())
                return 0;

            // Kitap bilgilerini veritabanından çekiyoruz
            var bookIds = dto.Items.Select(i => i.BookId).ToList();
            var books = await _context.Books
                .Where(b => bookIds.Contains(b.Id))
                .ToListAsync();

            // Her item için fiyatları eşleştiriyoruz
            var orderItems = dto.Items.Select(item =>
            {
                var book = books.FirstOrDefault(b => b.Id == item.BookId);
                if (book == null) return null;

                return new OrderItem
                {
                    BookId = book.Id,
                    Quantity = item.Quantity,
                    UnitPrice = book.Price
                };
            }).Where(i => i != null).ToList()!;

            if (!orderItems.Any())
                return 0;

            var total = orderItems.Sum(i => i.UnitPrice * i.Quantity);

            var order = new Order
            {
                UserId = userId,
                ShippingAddress = dto.ShippingAddress,
                OrderDate = DateTime.Now,
                TotalPrice = total,
                Status = "Hazırlanıyor"
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Order ID'yi order item'lara ekle
            orderItems.ForEach(oi => oi.OrderId = order.Id);
            _context.OrderItems.AddRange(orderItems);

            await _context.SaveChangesAsync();

            return order.Id;
        }


        ///???
        public async Task<OrderDto> GetOrderByIdAsync(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Book)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return null;

            return new OrderDto
            {
                Id = order.Id,
                OrderDate = order.OrderDate,
                ShippingAddress = order.ShippingAddress,
                TotalPrice = order.TotalPrice,
                Status = order.Status,
                Books = order.OrderItems
                .Where(oi => oi.Book != null)
                .Select(oi => new BookDto
                {
                    Title = oi.Book.Title,
                    Price = oi.UnitPrice
                }).ToList()
            };
        }

        public async Task<List<OrderDto>> GetOrdersAsync(string userId)
        {
            var orders = await _context.Orders
                    .Where(o => o.UserId == userId)
                    .OrderByDescending(o => o.OrderDate)
                    .ToListAsync();

            return orders.Select(o => new OrderDto
            {
                Id = o.Id,
                OrderDate = o.OrderDate,
                TotalPrice = o.TotalPrice,
                ShippingAddress = o.ShippingAddress,
                Status = o.Status
            }).ToList();
        }
    }
}
