using System.Linq;
using System.Collections.Generic;

using SportsStoreWebAPI.Models.Abstract;
using SportsStoreWebAPI.Models.Entities;

namespace SportsStoreWebAPI.Models.Concrete
{
  public class EFOrderDetailRepository : IOrderDetailRepository
  {
    SportsStoreDbContext _context;
    public EFOrderDetailRepository()
    {
      _context = new SportsStoreDbContext();
    }

    #region IOrderDetailRespository Members
    public OrderDetail AddOrderDetail(OrderDetail orderDetail)
    {
      _context.OrderDetails.Add(orderDetail);
      _context.SaveChanges();
      return orderDetail;
    }

    public IEnumerable<OrderDetail> GetOrderDetail(int orderID)
    {
      return _context.OrderDetails.Where(o => o.OrderID == orderID);
    }

    public IEnumerable<OrderDetail> GetOrderDetails()
    {
      var result = _context.OrderDetails;
      return result;
    }

    public void RemoveOrderDetail(int orderID)
    {
      var result = _context.OrderDetails.Where(o => o.OrderID == orderID);
      _context.OrderDetails.RemoveRange(result);
      _context.SaveChanges();
    }

    public bool UpdateOrderDetail(OrderDetail orderDetail)
    {
      _context.Entry<OrderDetail>(orderDetail).State = System.Data.Entity.EntityState.Modified;
      _context.SaveChanges();
      return true;
    }
    #endregion
  }
}
