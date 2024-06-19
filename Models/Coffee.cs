using System.ComponentModel.DataAnnotations;

namespace CSE443_FinalProject.Models
{
    public class Coffee
    {
        public int Id { get; set; }
        public int BrandId { get; set; }
        public string Name { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int Quantity { get; set; }
        public Brand Brand { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        //public ICollection<CartItem> CartItems { get; set; }
        //public ICollection<OrderItem> OrderItems { get; set; }
    }


}
