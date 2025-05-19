using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoonLightBooks.Application.DTOs.Reviews;
using MoonLightBooks.Application.Interfaces;

namespace MoonLightBooks.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public ReviewsController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpPost("{bookId}")]
        public async Task<IActionResult> AddReview(int bookId, [FromBody] CreateReviewDto dto)
        {
            await _reviewService.AddReviewAsync(bookId, dto);
            return Ok();
        }

        [HttpGet("{bookId}")]
        public async Task<ActionResult<List<ReviewDto>>> GetReviews(int bookId)
        {
            var reviews = await _reviewService.GetReviewsByBookIdAsync(bookId);
            return Ok(reviews);
        }
    }
}
