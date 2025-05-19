using Microsoft.AspNetCore.Mvc;
using MoonLightBooks.Application.DTOs.Dashboard;
using MoonLightBooks.Application.Interfaces;

[Route("api/[controller]")]
[ApiController]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet("summary")]
    [ProducesResponseType(typeof(DashboardSummaryDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetSummary()
    {
        var summary = await _dashboardService.GetDashboardSummaryAsync();
        return Ok(summary);
    }
}
