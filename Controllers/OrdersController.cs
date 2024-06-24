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

            var order = await _context.Order
                .Include(o => o.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (order == null)
            {
                return NotFound();
            }

            return View(order);
        }

        // GET: Orders/Create
        public IActionResult Create()
        {
            ViewData["UserId"] = new SelectList(_context.Users, "Id", "Id");
            return View();
        }

        // POST: Orders/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,UserId,Price,Status,Address")] Order order)
        {
            if (ModelState.IsValid)
            {
                _context.Add(order);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["UserId"] = new SelectList(_context.Users, "Id", "Id", order.UserId);
            return View(order);
        }

        // GET: Orders/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var order = await _context.Order.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            ViewData["UserId"] = new SelectList(_context.Users, "Id", "Id", order.UserId);
            return View(order);
        }

        // POST: Orders/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,UserId,Price,Status,Address")] Order order)
        {
            if (id != order.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(order);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!OrderExists(order.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["UserId"] = new SelectList(_context.Users, "Id", "Id", order.UserId);
            return View(order);
        }

        // GET: Orders/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var order = await _context.Order
                .Include(o => o.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (order == null)
            {
                return NotFound();
            }

            return View(order);
        }

        // POST: Orders/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var order = await _context.Order.FindAsync(id);
            if (order != null)
            {
                _context.Order.Remove(order);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool OrderExists(int id)
        {
            return _context.Order.Any(e => e.Id == id);
        }

        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Checkout([Bind("Phone,Address,UserId")] Order order, string FullName, string newAddress)
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

                _context.Cart.Remove(user.Cart);
                await _context.SaveChangesAsync();

                return RedirectToAction(controllerName: "Page", actionName: "Home");
            }

            return RedirectToAction(controllerName: "Page", actionName: "Checkout");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Buynow(int productId, int? quantityBuynow)
        {
            var product = await _context.Coffee.FindAsync(productId);
            if (product == null)
            {
                return NotFound();
            }

            HttpContext.Session.SetString("ChosenProduct", JsonConvert.SerializeObject(product));
            HttpContext.Session.SetInt32("ChosenProductQty", quantityBuynow ?? 1);

            return RedirectToAction("CheckoutBuynow", "Page");
        }

        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CheckoutBuynow([Bind("Phone,Address,UserId")] Order order, string FullName, string newAddress, int productId, int quantityBuynow)
        {
            if (ModelState.IsValid)
            {
                var user = _context.Users
                .Include(u => u.Cart).ThenInclude(u => u.CartItems).ThenInclude(u => u.Coffee)
                .FirstOrDefault(u => u.Email.Equals(User.Identity.Name));
                TempData["SuccessMessage"] = "Order successful!";

                await _context.Order.AddAsync(order);
                await _context.SaveChangesAsync();

                var product = await _context.Coffee.FindAsync(productId);
                OrderItem orderItem = new OrderItem { OrderId = order.Id, CoffeeId = product.Id, Price = product.FinalPrice, Quantity = quantityBuynow };
                await _context.OrderItem.AddAsync(orderItem);

                product.Quantity -= quantityBuynow;

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
