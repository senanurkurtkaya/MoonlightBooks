using MoonLightBooks.Application.DTOs.Reviews;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoonLightBooks.Application.Interfaces
{
    public interface IReviewService
    {
        Task AddReviewAsync(int userId, CreateReviewDto dto);
        Task<List<ReviewDto>> GetReviewsByBookIdAsync(int bookId);
    }
}
