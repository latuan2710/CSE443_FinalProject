namespace CSE443_FinalProject.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int CoffeeId { get; set; }
        public Coffee Coffee { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
    }
}
