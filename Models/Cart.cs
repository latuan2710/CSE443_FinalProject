namespace CSE443_FinalProject.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; }
        public double Price { get; set; }
        public ICollection<CartItem> CartItems { get; set; }
    }
}
