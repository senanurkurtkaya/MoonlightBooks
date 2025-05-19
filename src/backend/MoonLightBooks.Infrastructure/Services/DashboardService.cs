using Microsoft.EntityFrameworkCore;
using MoonLightBooks.Application.DTOs.Dashboard;
using MoonLightBooks.Application.Interfaces;
using MoonLightBooks.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Infrastructure.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly AppDbContext _context;

        public DashboardService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<DashboardSummaryDto> GetDashboardSummaryAsync()
        {
            var userCount = await _context.Users.CountAsync();
            var orderCount = await _context.Orders.CountAsync();
            var totalRevenue = await _context.Orders.SumAsync(o => (decimal?)o.TotalAmount) ?? 0;

            return new DashboardSummaryDto
            {
                TotalUsers = userCount,
                TotalOrders = orderCount,
                TotalRevenue = totalRevenue
            };
        }
    }
}
