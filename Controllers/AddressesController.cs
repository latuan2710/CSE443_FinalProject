using CSE443_FinalProject.Data;
using CSE443_FinalProject.Models;
using Microsoft.AspNetCore.Mvc;

namespace CSE443_FinalProject.Controllers
{
    public class AddressesController : Controller
    {
        private readonly MVCContext _context;

        public AddressesController(MVCContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Create(int id, string newAddress)
        {
            try
            {
                var address = new Address
                {
                    FullAddress = newAddress,
                    UserId = id
                };

                _context.Address.Add(address);
                _context.SaveChanges();
                return Ok(new { success = true, message = "Address created successfully." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Address created failed." });
            }

        }
    }
}
