using MoonLightBooks.Application.DTOs.Orders;
using MoonLightBooks.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace MoonLightBooks.Infrastructure.Services
{
    public class InvoiceService : IInvoiceService
    {
        public byte[] GenerateInvoicePdf(OrderDto order)
        {
            // 🚨 Boş kitap listesi kontrolü
            if (order.Books == null || !order.Books.Any())
                throw new Exception("Fatura oluşturulamadı: Siparişe ait kitap listesi boş.");

            // 🧾 PDF dokümanını oluştur
            var document = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Margin(50);
                    page.Size(PageSizes.A4);
                    page.PageColor(Colors.White);

                    page.Header()
                        .Text("Sipariş Faturası")
                        .FontSize(24)
                        .Bold()
                        .FontColor(Colors.Blue.Medium);

                    page.Content()
                        .Column(col =>
                        {
                            col.Item().Text($"Sipariş ID: {order.Id}");
                            col.Item().Text($"Teslimat Adresi: {order.ShippingAddress}");
                            col.Item().Text("Kitaplar:");
                            col.Item().LineHorizontal(1);

                            foreach (var item in order.Books)
                            {
                                var title = item.Title ?? "Bilinmeyen Kitap";
                                var price = item.Price;

                                col.Item().Text($"- {title} ({price:C})");
                            }

                            col.Item().LineHorizontal(1);
                            col.Item().Text($"Toplam Tutar: {order.TotalPrice:C}")
                                .FontSize(14)
                                .Bold();
                        });

                    page.Footer()
                        .AlignCenter()
                        .Text("MoonLightBooks | Bu fatura sistem tarafından oluşturulmuştur.")
                        .FontSize(10);
                });
            });

            return document.GeneratePdf();
        }
    }

}
