using System.Collections.Generic;

using SportsStoreWebAPI.Models.Entities;

namespace SportsStoreWebAPI.Models.Abstract
{
  public interface IProductRepository
  {
    IEnumerable<Product> GetProducts();
    Product GetProduct(int productID);
    Product AddProduct(Product product);
    void RemoveProduct(int productID);
    bool UpdateProduct(Product product);
  }
}
