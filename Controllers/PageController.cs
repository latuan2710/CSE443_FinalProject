using CSE443_FinalProject.Data;
using CSE443_FinalProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Diagnostics;

namespace CSE443_FinalProject.Controllers
{
    public class PageController : Controller
    {
        private readonly ILogger<PageController> _logger;
        private readonly MVCContext _context;

        public PageController(MVCContext context, ILogger<PageController> logger)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<IActionResult> Home()
        {
            ViewData["Products"] = await _context.Coffee
                .AsNoTracking()
                .ToListAsync();
            ViewData["Blogs"] = await _context.Blog
                .AsNoTracking()
                .ToListAsync();
            return View();
        }

        public IActionResult About()
        {
            return View();
        }
        public IActionResult Contact()
        {
            return View();
        }

        public IActionResult Sitemap()
        {
            return View();
        }

        public IActionResult Terms()
        {
            return View();
        }
        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Compare()
        {
            return View();
        }

        public IActionResult Wishlist()
        {
            return View();
        }

        public IActionResult AccessDenied()
        {
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult ForgotPassword()
        {
            return View();
        }


        [Authorize]
        public async Task<IActionResult> Profile()
        {
            var user = await _context.Users
                        .Include(u => u.Orders).ThenInclude(o => o.OrderItems).ThenInclude(oi => oi.Coffee)
                        .Include(u => u.Addresses)
                        .FirstOrDefaultAsync(u => u.Email.Equals(User.Identity.Name));

            if (user == null)
            {
                return NotFound();
            }

            user.Orders = user.Orders.OrderByDescending(o => o.Id).ToList();

            return View(user);
        }

        public async Task<IActionResult> OrderDetail(int? id)
        {
            return View(await _context.OrderItem
                .Include(o => o.Coffee)
                .Where(o => o.OrderId == id)
                .ToListAsync());
        }

        public async Task<IActionResult> Blog(int? pageNumber)
        {
            var blogs = from b in _context.Blog select b;

            return View(await PaginatedList<Blog>.CreateAsync(blogs.AsNoTracking(), pageNumber ?? 1, 6));
        }

        public async Task<IActionResult> BlogDetail(int? id)
        {
            return View(await _context.Blog.FindAsync(id));
        }

        public async Task<IActionResult> Catalog(
            int? pageNumber,
            int? availability,
            int? minPrice,
            int? maxPrice,
            string? q,
            string[] brands)
        {
            var products = from b in _context.Coffee select b;

            if (q != null)
            {
                products = products.Where(p => p.Name.Contains(q));
                ViewBag.SearchString = q;
            }

            if (availability == 0)
            {
                products = products.Where(p => p.Quantity == 0);
            }
            else if (availability == 1)
            {
                products = products.Where(p => p.Quantity != 0);
            }

            if (minPrice != null && maxPrice != null)
            {
                if (maxPrice != 0)
                    products = products.Where(p => p.Price >= minPrice && p.Price <= maxPrice);
            }
            else if (minPrice == null && maxPrice != null)
            {
                products = products.Where(p => p.Price <= maxPrice);
            }
            else if (minPrice != null && maxPrice == null)
            {
                products = products.Where(p => p.Price >= minPrice);
            }

            if (brands.Length != 0)
            {
                products = products.Where(p => brands.Contains(p.Brand.Name));
                ViewBag.SelectedBrands = brands;
            }

            ViewBag.Brands = await _context.Brand.ToListAsync();
            ViewBag.Availability = availability;
            ViewBag.MinPrice = minPrice;
            ViewBag.MaxPrice = maxPrice;
            return View(await PaginatedList<Coffee>.CreateAsync(products.AsNoTracking(), pageNumber ?? 1, 16));
        }

        public async Task<IActionResult> ProductDetail(string id)
        {
            var product = await _context.Coffee
                .AsNoTracking()
                .Include(p => p.Brand)
                .FirstOrDefaultAsync(c => c.Name == id);

            return View(product);
        }

        [Authorize]
        public async Task<IActionResult> Cart()
        {
            if (User.Identity.IsAuthenticated)
            {
                var cart = await _context.Cart
                .Include(c => c.CartItems).ThenInclude(c => c.Coffee)
                .FirstOrDefaultAsync(c => c.User.Email.Equals(User.Identity.Name));
                if (cart == null)
                    return View();
                return View(cart.CartItems);
            }
            else
            {
                return View();
            }
        }

        [Authorize]
        public async Task<IActionResult> Checkout()
        {
            var user = await _context.Users
                .AsNoTracking()
                .Include(c => c.Cart).ThenInclude(c => c.CartItems).ThenInclude(c => c.Coffee)
                .Include(u => u.Addresses)
                .FirstOrDefaultAsync(u => u.Email.Equals(User.Identity.Name));
            ViewBag.UserId = user.Id;
            ViewBag.Addresses = user.Addresses;
            ViewBag.Cart = user.Cart;
            ViewBag.Phone = user.PhoneNumber;
            return View();
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

        [HttpPost]
        [Authorize]
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

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
