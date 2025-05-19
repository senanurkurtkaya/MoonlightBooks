using MoonLightBooks.Application.DTOs.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Application.Interfaces
{
    public interface IInvoiceService
    {
        byte[] GenerateInvoicePdf(OrderDto order);
    }
}
