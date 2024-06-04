using Microsoft.AspNetCore.Mvc;

namespace CSE443_FinalProject.Controllers
{
    public class AdminPageController : Controller
    {
        public IActionResult UserBoard()
        {
            return View();
        }
    }
}
