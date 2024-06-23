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
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using System.Reflection.Metadata;
using Microsoft.AspNetCore.Authorization;
using CSE443_FinalProject.Models.AppViewModels;

namespace CSE443_FinalProject.Controllers
{
    [Authorize(Roles = "Admin")]
    public class UsersController : Controller
    {
        private readonly MVCContext _context;
        private readonly FileService _fileService;
        private readonly UserManager<AppUser> _userManager;

        public UsersController(MVCContext context, FileService fileService, UserManager<AppUser> userManager)
        {
            _context = context;
            _fileService = fileService;
            _userManager = userManager;
        }

        // GET: Users
        public async Task<IActionResult> Index()
        {
            return View(await _context.Users.ToListAsync());
        }

        // GET: Users/Create
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("FirstName,LastName,Email,Password")] RegisterViewModel model, Role role, IFormFile Avatar)
        {
            if (ModelState.IsValid)
            {
                var name = Guid.NewGuid().ToString();
                var user = new AppUser
                {
                    UserName = model.Email,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Role = role,
                    CreatedAt = DateTime.Now,
                };
                if (Avatar == null)
                {
                    user.Avatar = "/images/default-avatar.png";
                }
                else
                {
                    user.Avatar = "/upload/users/" + name + ".png";
                }
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    if (Avatar != null)
                        _fileService.SaveImage(Avatar, "users", name);
                    return RedirectToAction(nameof(Index));
                }
                else
                {
                    return View(user);
                }

            }
            return View(model);
        }

        // GET: Users/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            ViewBag.Avatar = user.Avatar;
            return View(user);
        }

        // POST: Users/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("FirstName,LastName,PhoneNumber,Role,Id")] AppUser user, IFormFile Avatar)
        {
            if (id != user.Id)
            {
                return NotFound();
            }


            if (ModelState.IsValid)
            {
                try
                {
                    var name = Guid.NewGuid().ToString();
                    var mainUser = await _context.Users.FindAsync(user.Id);

                    if (Avatar != null)
                    {
                        if (mainUser.Avatar != null)
                            _fileService.RemoveImage(mainUser.Avatar);

                        mainUser.Avatar = "/upload/users/" + name + ".png";
                    }
                    mainUser.FirstName = user.FirstName;
                    mainUser.LastName = user.LastName;
                    mainUser.PhoneNumber = user.PhoneNumber;
                    mainUser.Role = user.Role;

                    await _context.SaveChangesAsync();
                    if (Avatar != null)
                        _fileService.SaveImage(Avatar, "users", name);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserExists(user.Id))
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
            return View(user);
        }

        // GET: Users/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(m => m.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                _context.Users.Remove(user);

                await _context.SaveChangesAsync();
            }

            return RedirectToAction(nameof(Index));
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
