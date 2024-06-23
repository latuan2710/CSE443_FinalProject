namespace CSE443_FinalProject.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string FullAddress { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; }
    }
}
