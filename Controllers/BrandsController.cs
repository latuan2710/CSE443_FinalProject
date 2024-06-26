﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CSE443_FinalProject.Data;
using CSE443_FinalProject.Models;
using Microsoft.AspNetCore.Authorization;

namespace CSE443_FinalProject.Controllers
{
    [Authorize(Roles = "Admin")]
    public class BrandsController : Controller
    {
        private readonly MVCContext _context;

        public BrandsController(MVCContext context)
        {
            _context = context;
        }

        // GET: Brands
        public async Task<IActionResult> Index()
        {
            var brands = await _context.Brand
                         .Include(b => b.Coffees)
                         .OrderByDescending(b => b.Id)
                         .AsNoTracking()
                         .ToListAsync();

            return View(brands);
        }

        // GET: Brands/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Brands/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name")] Brand brand)
        {
            if (ModelState.IsValid)
            {
                var existingBrand = await _context.Brand.FirstOrDefaultAsync(b => b.Name == brand.Name);

                if (existingBrand != null)
                {
                    TempData["ErrorMessage"] = "A brand with this name already exists!";
                    return RedirectToAction(nameof(Index));
                }

                _context.Add(brand);
                await _context.SaveChangesAsync();
                TempData["SuccessMessage"] = "Created new brand successful!";

                return RedirectToAction(nameof(Index));
            }
            return View(brand);
        }

        // GET: Brands/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var brand = await _context.Brand.FindAsync(id);
            if (brand == null)
            {
                return NotFound();
            }
            return View(brand);
        }

        // POST: Brands/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name")] Brand brand)
        {
            if (id != brand.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    TempData["SuccessMessage"] = "Update brand successful!";

                    _context.Update(brand);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BrandExists(brand.Id))
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
            return View(brand);
        }

        // GET: Brands/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var brand = await _context.Brand
                .FirstOrDefaultAsync(m => m.Id == id);
            if (brand == null)
            {
                return NotFound();
            }
            else
            {
                _context.Brand.Remove(brand);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction(nameof(Index));
        }

        private bool BrandExists(int id)
        {
            return _context.Brand.Any(e => e.Id == id);
        }
    }
}
