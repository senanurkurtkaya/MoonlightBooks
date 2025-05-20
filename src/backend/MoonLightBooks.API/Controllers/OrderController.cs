using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoonLightBooks.Application.DTOs.Orders;
using MoonLightBooks.Application.Interfaces;
using System.Security.Claims;

namespace MoonLightBooks.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IInvoiceService _invoiceService;

        public OrderController(IOrderService orderService, IInvoiceService invoiceService)
        {
            _orderService = orderService;
            _invoiceService = invoiceService;
        }

        // 🧾 Sipariş Oluştur

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var orderId = await _orderService.CreateOrderAsync(userId, dto);

            if (orderId == 0)
                return BadRequest(new { message = "Sipariş oluşturulamadı." });

            return Ok(new
            {
                message = "Sipariş oluşturuldu!",
                orderId = orderId
            });
        }



        // 📜 Sipariş Geçmişi
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var orders = await _orderService.GetOrdersAsync(userId);
            return Ok(orders);
        }

        [HttpGet("{id}/invoice")]
        public async Task<IActionResult> GetInvoice(int id)
        {
            try
            {
                var order = await _orderService.GetOrderByIdAsync(id);

                if (order == null)
                {
                    return NotFound($"ID'si {id} olan sipariş bulunamadı.");
                }

                var pdfBytes = _invoiceService.GenerateInvoicePdf(order);

                if (pdfBytes == null || pdfBytes.Length == 0)
                {
                    return StatusCode(500, "PDF verisi oluşturulamadı.");
                }

                return File(pdfBytes, "application/pdf", $"order_{id}_invoice.pdf");
            }
            catch (Exception ex)
            {
            

                Console.WriteLine(ex); 
                return StatusCode(500, "Sunucu hatası: Fatura PDF oluşturulurken bir hata oluştu.");
            }
        }

    }
}
