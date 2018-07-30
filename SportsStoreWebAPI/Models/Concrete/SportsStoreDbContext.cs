using System.Data.Entity;

using SportsStoreWebAPI.Models.Entities;

namespace SportsStoreWebAPI.Models.Concrete
{
  public class SportsStoreDbContext : DbContext
  {
    public SportsStoreDbContext() : base("SSNGDBConnectionString") { }
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderDetail> OrderDetails { get; set; }
  }
}
