using MoonLightBooks.Application.DTOs.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Application.Interfaces
{
    public interface IOrderService
    {
        Task<int> CreateOrderAsync(int userId, CreateOrderDto dto);
        Task<OrderDto> GetOrderByIdAsync(int id);
        Task<List<OrderDto>> GetOrdersAsync(int userId);
    }
}
