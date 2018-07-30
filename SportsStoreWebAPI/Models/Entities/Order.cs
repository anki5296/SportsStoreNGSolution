namespace SportsStoreWebAPI.Models.Entities
{
  public class Order
  {
    public int OrderID { get; set; }
    public string Name { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Zip { get; set; }
    public string Country { get; set; }
    public string Giftwrap { get; set; }
  }
}
