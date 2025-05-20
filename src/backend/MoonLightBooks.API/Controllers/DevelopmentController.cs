using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoonLightBooks.Infrastructure.Data;

namespace MoonLightBooks.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevelopmentController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IHostEnvironment _environment;

        public DevelopmentController(AppDbContext context, IHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpPost("CreateDatabase")]
        public async Task<IActionResult> CreateDatabase()
        {
            if (_environment.IsProduction())
            {
                throw new NotSupportedException();
            }

            await _context.Database.EnsureDeletedAsync();
            await _context.Database.EnsureCreatedAsync();

            return Ok();
        }
    }
}
