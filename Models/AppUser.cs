using Microsoft.AspNetCore.Identity;

namespace CSE443_FinalProject.Models
{
    public class AppUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName
        {
            get
            {
                return LastName + " " + FirstName;
            }
        }
        public DateTime CreatedAt { get; set; }
        public string Avatar { get; set; }
        public ICollection<Address> Addresses { get; set; }
        public Role Role { get; set; }
        public Cart Cart { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}
