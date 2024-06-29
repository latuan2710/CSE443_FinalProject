using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CSE443_FinalProject.Data;
using CSE443_FinalProject.Models;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;

namespace CSE443_FinalProject.Controllers
{
    [Authorize(Roles = "Admin")]
    public class OrdersController : Controller
    {
        private readonly MVCContext _context;

        public OrdersController(MVCContext context)
        {
            _context = context;
        }

        // GET: Orders
        public async Task<IActionResult> Index()
        {
            var orders = await _context.Order
                         .Include(o => o.User)
                         .Include(o => o.OrderItems)
                         .OrderByDescending(o => o.Id)
                         .ToListAsync();

            foreach (var order in orders)
            {
                var orderItem = order.OrderItems.FirstOrDefault();
                if (orderItem != null)
                {
                    double total = (orderItem.Price * orderItem.Quantity);
                    order.Price = total;
                }
            }

            return View(orders);
        }

        // GET: Orders/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var orders = await _context.OrderItem
                .Include(o => o.Coffee)
                .Where(o => o.OrderId == id)
                .ToListAsync();
            if (orders == null)
            {
                return NotFound();
            }

            return View(orders);
        }

        private bool OrderExists(int id)
        {
            return _context.Order.Any(e => e.Id == id);
        }

        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Checkout([Bind("Phone,Address,UserId,Receiver")] Order order, string newAddress)
        {
            if (ModelState.IsValid)
            {
                var user = _context.Users
                .Include(u => u.Cart).ThenInclude(u => u.CartItems).ThenInclude(u => u.Coffee)
                .FirstOrDefault(u => u.Email.Equals(User.Identity.Name));
                TempData["SuccessMessage"] = "Order successful!";

                await _context.Order.AddAsync(order);
                await _context.SaveChangesAsync();

                double total = 0;

                foreach (var item in user.Cart.CartItems)
                {
                    var coffee = item.Coffee;
                    coffee.Quantity -= item.Quantity;
                    total += (item.Price * item.Quantity);
                    OrderItem orderItem = new OrderItem { OrderId = order.Id, CoffeeId = item.CoffeeId, Price = item.Price, Quantity = item.Quantity };
                    await _context.OrderItem.AddAsync(orderItem);
                }

                if (newAddress != null)
                {
                    Address address1 = new Address { UserId = user.Id, FullAddress = newAddress };
                    order.Address = newAddress;
                    await _context.Address.AddAsync(address1);
                }
                order.Price = total;
                _context.Cart.Remove(user.Cart);
                await _context.SaveChangesAsync();

                return RedirectToAction(controllerName: "Page", actionName: "Home");
            }

            return RedirectToAction(controllerName: "Page", actionName: "Checkout");
        }

        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Buynow(int productId, int? quantityBuynow)
        {
            var product = await _context.Coffee.FindAsync(productId);
            if (product == null)
            {
                return NotFound();
            }

            var user = await _context.Users
               .AsNoTracking()
               .Include(c => c.Cart).ThenInclude(c => c.CartItems).ThenInclude(c => c.Coffee)
               .Include(u => u.Addresses)
               .FirstOrDefaultAsync(u => u.Email.Equals(User.Identity.Name));

            ViewBag.UserId = user.Id;
            ViewBag.Addresses = user.Addresses;
            ViewBag.Cart = user.Cart;
            ViewBag.Phone = user.PhoneNumber;

            ViewBag.ChosenProduct = product;
            ViewBag.ChosenProductQty = quantityBuynow;

            ViewBag.Subtotal = ViewBag.Total = product.FinalPrice * quantityBuynow;

            return View("~/Views/Page/CheckoutBuynow.cshtml");
        }

        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CheckoutBuynow([Bind("Phone,Address,UserId,Receiver")] Order order, string newAddress, int productId, int quantityBuynow)
        {
            if (ModelState.IsValid)
            {
                var user = _context.Users
                .Include(u => u.Cart).ThenInclude(u => u.CartItems).ThenInclude(u => u.Coffee)
                .FirstOrDefault(u => u.Email.Equals(User.Identity.Name));

                await _context.Order.AddAsync(order);
                await _context.SaveChangesAsync();

                var product = await _context.Coffee.FindAsync(productId);

                OrderItem orderItem = new OrderItem { OrderId = order.Id, CoffeeId = product.Id, Price = product.FinalPrice, Quantity = quantityBuynow };
                order.Price = orderItem.Price * orderItem.Quantity;
                await _context.OrderItem.AddAsync(orderItem);

                product.Quantity -= quantityBuynow;
                TempData["SuccessMessage"] = "Order successful!";
                await _context.OrderItem.AddAsync(orderItem);


                if (newAddress != null)
                {
                    Address address1 = new Address { UserId = user.Id, FullAddress = newAddress };
                    order.Address = newAddress;
                    await _context.Address.AddAsync(address1);
                }

                await _context.SaveChangesAsync();
                HttpContext.Session.Clear();

                return RedirectToAction(controllerName: "Page", actionName: "Home");
            }

            return RedirectToAction(controllerName: "Page", actionName: "Checkout");
        }

        [HttpPost]
        public IActionResult UpdateOrderStatus(int orderId, OrderStatus newStatus)
        {
            var order = _context.Order.Find(orderId);
            if (order == null)
            {
                return NotFound();
            }

            order.Status = newStatus;
            TempData["SuccessMessage"] = "Order updated successfully!";
            _context.SaveChanges();

            return Json(new { success = true });
        }
    }
}
