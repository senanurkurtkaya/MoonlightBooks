using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MoonLightBooks.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok("Test başarılı!");
        }
    }
}
