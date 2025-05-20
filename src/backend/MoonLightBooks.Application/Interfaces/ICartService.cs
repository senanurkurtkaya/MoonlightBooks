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
        Task AddToCartAsync(string userId, AddToCartDto dto);
        Task<List<CartItemDto>> GetCartAsync(string userId);
        Task RemoveFromCartAsync(int cartItemId);
        Task ClearCartAsync(string userId);

    }
}
