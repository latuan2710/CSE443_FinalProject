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
                .Include(c => c.Brand);
            return View(await mVCContext.ToListAsync());
        }

        // GET: Coffees/Create
        public IActionResult Create()
        {
            ViewData["BrandId"] = new SelectList(_context.Brand, "Id", "Name");
            return View();
        }

        // POST: Coffees/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,BrandId,Description,Price,Quantity")] Coffee coffee, IFormFile Image)
        {
            if (ModelState.IsValid)
            {
                var name = Guid.NewGuid().ToString();
                coffee.Image = "/upload/product/" + name + ".png";
                _context.Add(coffee);
                await _context.SaveChangesAsync();
                _fileService.SaveImage(Image, "product", name);
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
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,BrandId,Image,Price,Quantity")] Coffee coffee)
        {
            if (id != coffee.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(coffee);
                    await _context.SaveChangesAsync();
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

            return View(coffee);
        }

        // POST: Coffees/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var coffee = await _context.Coffee.FindAsync(id);
            if (coffee != null)
            {
                _fileService.RemoveImage(coffee.Image);
                _context.Coffee.Remove(coffee);
            }

            await _context.SaveChangesAsync();
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
                finalPrice = product.finalPrice,
                availability = product.isAvailability
            });
        }


        private bool CoffeeExists(int id)
        {
            return _context.Coffee.Any(e => e.Id == id);
        }
    }
}
