namespace CSE443_FinalProject.Models
{
    public class Brand
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Coffee> Coffees { get; set; }
    }
}
