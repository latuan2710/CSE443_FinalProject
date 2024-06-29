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

namespace CSE443_FinalProject.Controllers
{
    [Authorize(Roles ="Admin")]
    public class ContactsController : Controller
    {
        private readonly MVCContext _context;

        public ContactsController(MVCContext context)
        {
            _context = context;
        }

        // GET: Contacts
        public async Task<IActionResult> Index()
        {
            return View(await _context.Contact.OrderByDescending(c => c.Id).ToListAsync());
        }

        // POST: Contacts/Create
        [AllowAnonymous]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Name,Email,Phone,Message")] Contact contact)
        {
            if (ModelState.IsValid)
            {
                _context.Add(contact);
                await _context.SaveChangesAsync();
                TempData["SuccessMessage"] = "Sent successfully!";
                return RedirectToAction(controllerName: "Page", actionName: "Contact");
            }
            TempData["Contact"] = contact;
            return RedirectToAction(controllerName: "Page", actionName: "Contact");
        }

        private bool ContactExists(int id)
        {
            return _context.Contact.Any(e => e.Id == id);
        }
    }
}
