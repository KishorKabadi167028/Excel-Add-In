using Microsoft.EntityFrameworkCore;
using ExcelAddinServer.Models;

namespace ExcelAddinServer.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Record> Records { get; set; } = null!;
}
