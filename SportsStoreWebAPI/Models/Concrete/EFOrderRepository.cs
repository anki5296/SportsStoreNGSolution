using System.Linq;
using System.Collections.Generic;

using SportsStoreWebAPI.Models.Abstract;
using SportsStoreWebAPI.Models.Entities;

namespace SportsStoreWebAPI.Models.Concrete
{
  public class EFOrderRepository : IOrderRepository
  {
    SportsStoreDbContext _context;
    public EFOrderRepository()
    {
      _context = new SportsStoreDbContext();
    }

    #region IOrderRepository Members
    public Order AddOrder(Order order)
    {
      _context.Orders.Add(order);
      _context.SaveChanges();
      return order;
    }
    public IEnumerable<Order> GetOrders()
    {
      var result = _context.Orders;
      return result;
    }
    public Order GetOrder(int orderID)
    {
      return _context.Orders.FirstOrDefault(o => o.OrderID == orderID);
    }
    public void RemoveOrder(int orderID)
    {
      var result = _context.Orders.FirstOrDefault(o => o.OrderID == orderID);
      _context.Orders.Remove(result);
      _context.SaveChanges();
    }
    public bool UpdateOrder(Order order)
    {
      _context.Entry<Order>(order).State = System.Data.Entity.EntityState.Modified;
      _context.SaveChanges();
      return true;
    }
    #endregion
  }
}
