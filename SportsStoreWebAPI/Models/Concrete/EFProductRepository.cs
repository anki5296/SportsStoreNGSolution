using System;
using System.Linq;
using System.Collections.Generic;

using SportsStoreWebAPI.Models.Abstract;
using SportsStoreWebAPI.Models.Entities;

namespace SportsStoreWebAPI.Models.Concrete
{
  public class EFProductRepository : IProductRepository
  {
    SportsStoreDbContext _context;

    public EFProductRepository()
    {
      _context = new SportsStoreDbContext();
      var conState = _context.Database.Connection.State;
      _context.Database.Log = (c) =>
      {
        System.Diagnostics.Debug.Write(c);
        Console.WriteLine(c);
      };
    }

    #region IProductRepository Members
    public Product AddProduct(Product product)
    {
      _context.Products.Add(product);
      _context.SaveChanges();
      return product;
    }

    public Product GetProduct(int productID)
    {
      return _context.Products.FirstOrDefault(p => p.ProductID == productID);
    }

    public IEnumerable<Product> GetProducts()
    {
      var result = _context.Products.ToList();
      return result;
    }

    public void RemoveProduct(int productID)
    {
      var prod = _context.Products.FirstOrDefault(p => p.ProductID == productID);
      _context.Products.Remove(prod);
      _context.SaveChanges();
    }

    public bool UpdateProduct(Product product)
    {
      _context.Entry<Product>(product).State = System.Data.Entity.EntityState.Modified;
      _context.SaveChanges();
      return true;
    }
    #endregion
  }
}
