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
    [RoutePrefix("api/orderdetail")]
  public class OrderDetailController : ApiController
  {
    IOrderDetailRepository _repository;

    public OrderDetailController()
    {
      _repository = new EFOrderDetailRepository();
    }
    [Route("")]
    public IEnumerable<OrderDetail> GetOrderDetails()
    {
      return _repository.GetOrderDetails();
    }
    [Route("{orderID}", Name = "GetOrderDetailByID")]
    public IEnumerable<OrderDetail> GetOrderDetail(int orderID)
    {
      return _repository.GetOrderDetail(orderID);
    }

    [Route("")]
    public HttpResponseMessage PostOrderDetail(OrderDetail orderDetail)
    {
      orderDetail = _repository.AddOrderDetail(orderDetail);
      var response = Request.CreateResponse<OrderDetail>(HttpStatusCode.Created, orderDetail);

      string uri = Url.Link("GetOrderDetailByID", new { orderID = orderDetail.OrderID });
      response.Headers.Location = new Uri(uri);
      return response;

    }

    [Route("{orderID}")]
    public void PutOrderDetail(int orderID, OrderDetail orderDetail)
    {
      orderDetail.OrderID = orderID;
      if (!_repository.UpdateOrderDetail(orderDetail))
      {
        throw new HttpResponseException(HttpStatusCode.NotFound);
      }
    }

    [Route("{orderID}")]
    public void DeleteOrderDetail(int orderID)
    {
      var result = _repository.GetOrderDetail(orderID);
      if (result == null)
      {
        throw new HttpResponseException(HttpStatusCode.NotFound);
      }
      _repository.RemoveOrderDetail(orderID);
    }
  }
}
