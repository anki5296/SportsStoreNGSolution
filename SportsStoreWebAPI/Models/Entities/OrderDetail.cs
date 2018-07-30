using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportsStoreWebAPI.Models.Entities
{
  public class OrderDetail
  {

    [Key]
    [Column(Order = 1)]
    public int OrderID { get; set; }

    [Key]
    [Column(Order = 2)]
    public int ProductID { get; set; }
    public string ProductName { get; set; }
    public decimal Price { get; set; }
    public int Count { get; set; }
  }

}
