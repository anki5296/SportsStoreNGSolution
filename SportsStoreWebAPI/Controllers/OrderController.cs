using System;
using System.Collections.Generic;

using System.Net;
using System.Net.Http;
using System.Web.Http;
using SportsStoreWebAPI.Models.Abstract;
using SportsStoreWebAPI.Models.Concrete;
using SportsStoreWebAPI.Models.Entities;
using System.Web.Http.Cors;

namespace SportsStoreWebAPI.Controllers
{
    [EnableCors(origins: "http://localhost:59932", headers: "*", methods: "*")]
    [RoutePrefix("api/order")]
  public class OrderController : ApiController
  {
    IOrderRepository _repository;

    public OrderController()
    {
      _repository = new EFOrderRepository();
    }

    [Route("")]
    public IEnumerable<Order> GetOrders()
    {
      return _repository.GetOrders();
    }
    [Route("{orderID}", Name = "GetOrderByID")]
    public Order GetOrder(int orderID)
    {
      return _repository.GetOrder(orderID);
    }

    [Route("")]
    public HttpResponseMessage PostOrder(Order order)
    {
      order = _repository.AddOrder(order);
      var response = Request.CreateResponse<Order>(HttpStatusCode.Created, order);

      string uri = Url.Link("GetOrderByID", new { orderID = order.OrderID });
      response.Headers.Location = new Uri(uri);
      return response;

    }

    [Route("{orderID}")]
    public void PutOrder(int orderID, Order order)
    {
      order.OrderID = orderID;
      if (!_repository.UpdateOrder(order))
      {
        throw new HttpResponseException(HttpStatusCode.NotFound);
      }
    }

    [Route("{orderID}")]
    public void DeleteOrder(int orderID)
    {
      Order result = _repository.GetOrder(orderID);
      if (result == null)
      {
        throw new HttpResponseException(HttpStatusCode.NotFound);
      }
      _repository.RemoveOrder(orderID);
    }
  }
}
