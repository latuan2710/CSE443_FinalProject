using CSE443_FinalProject.Data;
using CSE443_FinalProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Drawing.Printing;

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

        public async Task<IActionResult> BlogAsync(int? pageNumber)
        {
            var blogs = from b in _context.Blog select b;

            return View(await PaginatedList<Blog>.CreateAsync(blogs.AsNoTracking(), pageNumber ?? 1, 6));
        }

        public async Task<IActionResult> Catalog(
            int? pageNumber,
            int? availability,
            int? minPrice,
            int? maxPrice,
            string[] brands)
        {
            var products = from b in _context.Coffee select b;

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

        public async Task<IActionResult> Cart()
        {
            if (User.Identity.IsAuthenticated)
            {
                var cart = await _context.Cart
                .Include(c => c.CartItems).ThenInclude(c => c.Coffee)
                .FirstOrDefaultAsync(c => c.User.Email.Equals(User.Identity.Name));
                return View(cart.CartItems);
            }
            else
            {
                return View();
            }
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
