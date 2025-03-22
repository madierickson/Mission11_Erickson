using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class BookController : ControllerBase
    {
        private BookDbContext _context;
        
        public BookController(BookDbContext temp) => _context = temp;
        
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageHowMany = 5, int pageNum = 1)
        {
            var something = _context.Books
                .Skip((pageNum-1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();
            
            var totalNumBooks = _context.Books.Count();
            return Ok(new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            });
        }
    }
}