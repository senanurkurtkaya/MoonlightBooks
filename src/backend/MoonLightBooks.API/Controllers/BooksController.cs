using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoonLightBooks.Application.DTOs;
using MoonLightBooks.Application.DTOs.Book;
using MoonLightBooks.Application.Interfaces;

namespace MoonLightBooks.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var books = await _bookService.GetAllAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var book = await _bookService.GetByIdAsync(id);
            if (book == null)
                return NotFound();
            return Ok(book);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(BookDto dto)
        {
            await _bookService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, BookDto dto)
        {
            await _bookService.UpdateAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _bookService.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("byCategory/{categoryId}")]
        public async Task<IActionResult> GetBooksByCategory(int categoryId)
        {
            var books = await _bookService.GetBooksByCategoryAsync(categoryId);
            return Ok(books);
        }


        [HttpGet("filter")]
        public async Task<IActionResult> Filter([FromQuery] BookFilterDto filter)
        {
            var result = await _bookService.GetFilteredBooksAsync(filter);
            return Ok(result);
        }

    }
}

