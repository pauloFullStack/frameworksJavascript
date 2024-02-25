using ExpenseManagement.Application.DTOs;
using ExpenseManagement.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseManagement.Application.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDTO>> GetCategoriesAsync();
        Task<IEnumerable<CategoryDTO>> GetPaginationAndSearch(PaginationDTO paginationDTO, HttpContext context);
        Task<CategoryDTO> GetByIdAsync(int? id);
        Task<ActionResult<Category>> AddAsync(CategoryDTO categoryDTO);
        Task UpdateAsync(CategoryDTO categoryDTO);
        Task RemoveAsync(int? id);
    }
}
