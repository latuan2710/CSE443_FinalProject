using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CSE443_FinalProject.Data;
using CSE443_FinalProject.Models;
using Azure;
using CSE443_FinalProject.Services;
using System.Reflection.Metadata;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace CSE443_FinalProject.Controllers
{
    [Authorize(Roles = "Admin")]
    public class CoffeesController : Controller
    {
        private readonly MVCContext _context;
        private readonly FileService _fileService;

        public CoffeesController(MVCContext context, FileService fileService)
        {
            _context = context;
            _fileService = fileService;
        }

        // GET: Coffees
        public async Task<IActionResult> Index()
        {
            var mVCContext = _context.Coffee
                .AsNoTracking()
                .Include(c => c.Brand).OrderByDescending(c => c.Id);
            return View(await mVCContext.ToListAsync());
        }

        // GET: Coffees/Create
        public IActionResult Create()
        {
            ViewData["BrandId"] = new SelectList(_context.Brand, "Id", "Name");
            return View();
        }

        // POST: Coffees/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,BrandId,Description,Price,Quantity,Discount")] Coffee coffee, IFormFile Image)
        {
            if (ModelState.IsValid)
            {
                 var existingCoffee = await _context.Coffee.FirstOrDefaultAsync(c => c.Name == coffee.Name);

                if (existingCoffee != null)
                {
                    TempData["ErrorMessage"] = "A product with this name already exists!";
                    ViewData["BrandId"] = new SelectList(_context.Brand, "Id", "Id", coffee.BrandId);
                    return RedirectToAction(nameof(Index));
                }

                var name = Guid.NewGuid().ToString();
                coffee.Image = "/upload/product/" + name + ".png";
                _context.Add(coffee);
                await _context.SaveChangesAsync();
                _fileService.SaveImage(Image, "product", name);
                TempData["SuccessMessage"] = "Product created successfully!";
                return RedirectToAction(nameof(Index));
            }
            ViewData["BrandId"] = new SelectList(_context.Brand, "Id", "Id", coffee.BrandId);
            return View(coffee);
        }

        // GET: Coffees/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var coffee = await _context.Coffee.FindAsync(id);
            if (coffee == null)
            {
                return NotFound();
            }
            ViewData["BrandId"] = new SelectList(_context.Brand, "Id", "Name", coffee.BrandId);
            return View(coffee);
        }

        // POST: Coffees/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,BrandId,Description,Price,Quantity,Discount")] Coffee coffee, IFormFile Image)
        {
            if (id != coffee.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var mainCoffee = await _context.Coffee.FindAsync(coffee.Id);
                    var name = Guid.NewGuid().ToString();
                    if (Image != null)
                    {
                        _fileService.RemoveImage(mainCoffee.Image);

                        mainCoffee.Image = "/upload/product/" + name + ".png";
                    }
                    
                    mainCoffee.Name = coffee.Name;
                    mainCoffee.BrandId = coffee.BrandId;
                    mainCoffee.Description = coffee.Description;
                    mainCoffee.Price= coffee.Price;
                    mainCoffee.Quantity = coffee.Quantity;
                    mainCoffee.Discount = coffee.Discount;

                    await _context.SaveChangesAsync();
                    if (Image != null)
                        _fileService.SaveImage(Image, "product", name);
                    TempData["SuccessMessage"] = "Product updated successfully!";

                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CoffeeExists(coffee.Id))
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
            ViewData["BrandId"] = new SelectList(_context.Brand, "Id", "Id", coffee.BrandId);
            return View(coffee);
        }

        // GET: Coffees/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var coffee = await _context.Coffee
                .Include(c => c.Brand)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (coffee == null)
            {
                return NotFound();
            }
            else
            {
                _fileService.RemoveImage(coffee.Image);
                _context.Coffee.Remove(coffee);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction(nameof(Index));
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetProduct(string? name)
        {
            if (name == null)
                return NotFound();


            var product = await _context.Coffee
                .Include(c => c.Brand)
                .FirstOrDefaultAsync(c => c.Name.Equals(name));

            if (product == null)
                return NotFound();

            return Ok(new
            {
                id = product.Id,
                name = product.Name,
                brand = product.Brand.Name,
                image = product.Image,
                price = product.Price,
                isDiscount = product.IsDiscounted,
                discount = product.Discount,
                finalPrice = product.FinalPrice,
                availability = product.IsAvailability
            });
        }


        private bool CoffeeExists(int id)
        {
            return _context.Coffee.Any(e => e.Id == id);
        }
    }
}
