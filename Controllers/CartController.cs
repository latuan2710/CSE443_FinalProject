using CSE443_FinalProject.Data;
using CSE443_FinalProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSE443_FinalProject.Controllers
{
    [Authorize]
    public class CartController : Controller
    {
        private readonly MVCContext _context;

        public CartController(MVCContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> GetCartItem()
        {
            var cart = await _context.Cart.FirstOrDefaultAsync(c => c.User.Email.Equals(User.Identity.Name));

            return Ok(new
            {
                cartItem = await _context.CartItem
                .AsNoTracking()
                .Include(c => c.Coffee)
                .Where(c => c.CartId == cart.Id)
                .ToListAsync()
            });
        }

        [HttpPost]
        public async Task<IActionResult> AddToCart(int productId, int? quantity)
        {
            var product = await _context.Coffee.FindAsync(productId);
            var user = _context.Users
                .Include(u => u.Cart).ThenInclude(c => c.CartItems).ThenInclude(c => c.Coffee)
                .FirstOrDefault(u => u.Email.Equals(User.Identity.Name));

            quantity = quantity ?? 1;

            if (product.Quantity < quantity)
            {
                return NotFound();
            }

            if (user.Cart == null)
            {
                Cart newCart = new Cart { UserId = user.Id };
                await _context.AddAsync(newCart);
                await _context.SaveChangesAsync();

                CartItem cartItem = new CartItem { CoffeeId = productId, Price = product.FinalPrice, Quantity = quantity ?? 1, CartId = newCart.Id };
                await _context.AddAsync(cartItem);
                await _context.SaveChangesAsync();
            }
            else
            {
                bool exist = false;
                foreach (var item in user.Cart.CartItems)
                {
                    if (item.Coffee.Id == productId)
                    {
                        item.Quantity = item.Quantity + (quantity ?? 1);
                        exist = true;
                        break;
                    }
                }

                if (!exist)
                {
                    CartItem cartItem = new CartItem { CoffeeId = productId, Price = product.FinalPrice, Quantity = quantity ?? 1, CartId = user.Cart.Id };
                    await _context.AddAsync(cartItem);
                }
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(int[] cartItemId, int[] quantities)
        {
            int index = 0;
            foreach (var id in cartItemId)
            {
                var cartItem = await _context.CartItem.FindAsync(id);
                cartItem.Quantity = quantities[index++];
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(controllerName: "Page", actionName: "Cart");
        }

        public async Task<IActionResult> Delete(int id)
        {
            var cartItem = await _context.CartItem.FindAsync(id);
             _context.CartItem.Remove(cartItem);
            await _context.SaveChangesAsync();

            return RedirectToAction(controllerName: "Page", actionName: "Cart");
        }
    }
}
