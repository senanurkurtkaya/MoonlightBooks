using MoonLightBooks.Application.DTOs;
using MoonLightBooks.Application.DTOs.Book;
using MoonLightBooks.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Application.Interfaces
{
    public interface IBookService
    {
        Task<List<BookDto>> GetAllAsync();
        Task<BookDto?> GetByIdAsync(int id);
        Task<BookDto> CreateAsync(BookDto bookDto);
        Task<bool> UpdateAsync(int id, BookDto bookDto);
        Task<bool> DeleteAsync(int id);
        Task<List<BookDto>> GetBooksByCategoryAsync(int categoryId);
        Task<List<Book>> GetFilteredBooksAsync(BookFilterDto filter);

    }
}
