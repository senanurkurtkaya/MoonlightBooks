using MoonLightBooks.Application.DTOs.Dashboard;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Application.Interfaces
{
    
    public interface  IDashboardService
    {
        Task<DashboardSummaryDto> GetDashboardSummaryAsync();
    }
}
