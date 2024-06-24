using System.ComponentModel.DataAnnotations;

namespace CSE443_FinalProject.Models
{
    public class Order
    {
        public Order()
        {
            Status = OrderStatus.Preparing;
        }
        public int Id { get; set; }

        public int UserId { get; set; }

        public AppUser User { get; set; }

        public double Price { get; set; }

        public OrderStatus Status { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone number must be 10 digits.")]
        public string Phone { get; set; } // Changed to string to handle phone numbers with leading zeros

        public ICollection<OrderItem> OrderItems { get; set; }

    }
}

public enum OrderStatus
{
    Preparing,
    Shipping,
    Delivered,
    Canceled
}

