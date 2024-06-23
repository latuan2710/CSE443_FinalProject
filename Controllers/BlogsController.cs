using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CSE443_FinalProject.Data;
using CSE443_FinalProject.Models;
using CSE443_FinalProject.Services;
using Microsoft.AspNetCore.Authorization;

namespace CSE443_FinalProject.Controllers
{
    [Authorize(Roles = "Admin")]
    public class BlogsController : Controller
    {
        private readonly MVCContext _context;
        private readonly FileService _fileService;

        public BlogsController(MVCContext context, FileService fileService)
        {
            _context = context;
            _fileService = fileService;
        }

        // GET: Blogs
        public async Task<IActionResult> Index()
        {
            var blogs = await _context.Blog.OrderByDescending(b => b.CreatedAt).ToListAsync();
            return View(blogs);
        }


        // GET: Blogs/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Blogs/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Title,Description")] Blog blog, IFormFile formFile)
        {
            if (ModelState.IsValid)
            {
                var name = Guid.NewGuid().ToString();
                blog.Image = "/upload/blogs/" + name + ".png";
                blog.CreatedAt = DateTime.Now;
                _context.Add(blog);
                await _context.SaveChangesAsync();
                _fileService.SaveImage(formFile, "blogs", name);
                return RedirectToAction(nameof(Index));
            }
            return View(blog);
        }

        // GET: Blogs/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var blog = await _context.Blog.FindAsync(id);
            if (blog == null)
            {
                return NotFound();
            }
            return View(blog);
        }

        // POST: Blogs/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Title,Description,Image")] Blog blog, IFormFile formFile)
        {
            if (id != blog.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var mainBlog = await _context.Blog.FindAsync(blog.Id);
                    var name = Guid.NewGuid().ToString();
                    if (formFile != null)
                    {
                        if (mainBlog.Image != null)
                            _fileService.RemoveImage(mainBlog.Image);

                        mainBlog.Image = "/upload/blogs/" + name + ".png";
                    }
                    mainBlog.Title = blog.Title;
                    mainBlog.Description = blog.Description;
                    mainBlog.CreatedAt = DateTime.Now;

                    await _context.SaveChangesAsync();
                    if (formFile != null)
                        _fileService.SaveImage(formFile, "blogs", name);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BlogExists(blog.Id))
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
            return View(blog);
        }

        // GET: Blogs/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var blog = await _context.Blog
                .FirstOrDefaultAsync(m => m.Id == id);
            if (blog == null)
            {
                return NotFound();
            }
            else
            {
                _fileService.RemoveImage(blog.Image);
                _context.Blog.Remove(blog);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction(nameof(Index));
        }

        private bool BlogExists(int id)
        {
            return _context.Blog.Any(e => e.Id == id);
        }
    }
}
