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
        public IEnumerable<Book> GetBooks()
        {
            return _context.Books.ToList();
        }
    }
}