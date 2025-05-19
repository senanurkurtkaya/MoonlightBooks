using MoonLightBooks.Application.DTOs.Cart;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Application.Interfaces
{
    public interface ICartService
    {
        Task AddToCartAsync(int userId, AddToCartDto dto);
        Task<List<CartItemDto>> GetCartAsync(int userId);
        Task RemoveFromCartAsync(int cartItemId);
        Task ClearCartAsync(int userId);

    }
}
