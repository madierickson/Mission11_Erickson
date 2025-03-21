using Microsoft.EntityFrameworkCore;

namespace Mission11.API.Data;

public class BookDbContext : DbContext
{

    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {
    }
    public DbSet<Book> Books { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>()
            .Property<double>(e => e.Price)
            .HasColumnType("REAL"); // Ensures it maps correctly to SQLite
    }

}