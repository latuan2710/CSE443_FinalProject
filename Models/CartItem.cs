namespace CSE443_FinalProject.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public Cart Cart { get; set; }
        public int CoffeeId { get; set; }
        public Coffee Coffee { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
    }
}
