using System.Collections.Generic;

using SportsStoreWebAPI.Models.Entities;

namespace SportsStoreWebAPI.Models.Abstract
{
  public interface IOrderDetailRepository
  {
    IEnumerable<OrderDetail> GetOrderDetails();
    IEnumerable<OrderDetail> GetOrderDetail(int orderID);
    OrderDetail AddOrderDetail(OrderDetail orderDetail);
    void RemoveOrderDetail(int orderID);
    bool UpdateOrderDetail(OrderDetail orderDetail);
  }
}
