using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Application.DTOs.Orders
{
    public class CreateOrderDto
    {
        public string ShippingAddress { get; set; } = string.Empty;
        public decimal TotalPrice { get; set; }
        public List<OrderItemDto> Items { get; set; } = new();

    }
}
