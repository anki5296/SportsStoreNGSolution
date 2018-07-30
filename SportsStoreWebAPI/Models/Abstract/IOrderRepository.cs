using System.Collections.Generic;

using SportsStoreWebAPI.Models.Entities;

namespace SportsStoreWebAPI.Models.Abstract
{
  public interface IOrderRepository
  {
    IEnumerable<Order> GetOrders();
    Order GetOrder(int orderID);
    Order AddOrder(Order order);
    void RemoveOrder(int orderID);
    bool UpdateOrder(Order order);
  }
}
