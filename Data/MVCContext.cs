using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CSE443_FinalProject.Models;
using System.Reflection.Emit;

namespace CSE443_FinalProject.Data;

public class MVCContext : IdentityDbContext<AppUser, IdentityRole<int>, int>
{
    public MVCContext(DbContextOptions<MVCContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }

    public DbSet<Brand> Brand { get; set; }

    public DbSet<Coffee> Coffee { get; set; }

    public DbSet<Blog> Blog { get; set; }
    public DbSet<Contact> Contact { get; set; }
    public DbSet<Cart> Cart { get; set; }
    public DbSet<CartItem> CartItem { get; set; }
    public DbSet<Order> Order { get; set; }
    public DbSet<OrderItem> OrderItem { get; set; }
    public DbSet<Address> Address { get; set; }

}
