namespace CSE443_FinalProject.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; }
        public double Price { get; set; }
        public string Status { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
