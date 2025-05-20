using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoonLightBooks.Application.DTOs;
using MoonLightBooks.Application.DTOs.Cart;
using MoonLightBooks.Application.Interfaces;
using System.Security.Claims;

namespace MoonLightBooks.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        // 🛒 Sepete Ekle
        [HttpPost]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            await _cartService.AddToCartAsync(userId, dto);
            return Ok(new { message = "Kitap sepete eklendi!" });
        }

        // 📦 Sepeti Listele
        [HttpGet]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> GetCart()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var cartItems = await _cartService.GetCartAsync(userId);
            return Ok(cartItems);
        }

        // 🗑️ Sepetten Ürün Sil
        [HttpDelete("{id}")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            await _cartService.RemoveFromCartAsync(id);
            return Ok(new { message = "Ürün sepetten silindi!" });
        }

        [HttpDelete("clear")]
        [Authorize]
        public async Task<IActionResult> ClearCart()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _cartService.ClearCartAsync(userId);
            return NoContent();
        }
    }
}