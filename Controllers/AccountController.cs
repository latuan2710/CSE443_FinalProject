using CSE443_FinalProject.Data;
using CSE443_FinalProject.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using CSE443_FinalProject.Models.AppViewModels;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using CSE443_FinalProject.Services;
using System.Reflection.Metadata;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CSE443_FinalProject.Controllers
{
    public class AccountController : Controller
    {
        private readonly MVCContext _context;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly FileService _fileService;

        public AccountController(
            SignInManager<AppUser> signInManager,
            MVCContext context,
            UserManager<AppUser> userManager,
            FileService fileService)
        {
            _signInManager = signInManager;
            _context = context;
            _userManager = userManager;
            _fileService = fileService;
        }



        public async Task<IActionResult> Logout(string returnUrl = "")
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return LocalRedirect(returnUrl);
        }



        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new AppUser
                {
                    Avatar = "/images/default-avatar.png",
                    UserName = model.Email,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    CreatedAt = DateTime.Now,
                };
                user.Role = Role.User;
                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    TempData["SuccessMessage"] = "Register successfull. Please log in!";
                    return RedirectToAction(controllerName: "Page", actionName: "Login");
                }
                else
                {
                    var message = "";
                    foreach (var error in result.Errors)
                    {
                        message += error.Description;
                        ModelState.AddModelError("", error.Description);
                    }
                    TempData["ErrorMessage"] = message;
                }
            }
            return RedirectToAction(controllerName: "Page", actionName: "Register");
        }



        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "Invalid Login Attemp");
                return RedirectToAction(controllerName: "Page", actionName: "Login");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, true);

            if (result.Succeeded)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name,user.Email),
                    new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                    new Claim(ClaimTypes.Role,user.Role.ToString())
                };
                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                var authProperties = new AuthenticationProperties
                {
                    IsPersistent = true,
                    AllowRefresh = true
                };

                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity),
                    authProperties);

                return RedirectToAction(controllerName: "Page", actionName: "Home");
            }
            ModelState.AddModelError("", "Email or Password was incorrect!");
            return RedirectToAction(controllerName: "Page", actionName: "Login");
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateProfile([Bind("FirstName,LastName,Id,PhoneNumber")] AppUser user, IFormFile formFile)
        {
            if (ModelState.IsValid)
            {
                var name = Guid.NewGuid().ToString();
                var mainUser = await _context.Users.FindAsync(user.Id);

                if (formFile != null)
                {
                    if (mainUser.Avatar != null)
                        _fileService.RemoveImage(mainUser.Avatar);

                    mainUser.Avatar = "/upload/users/" + name + ".png";
                    _fileService.SaveImage(formFile, "users", name);
                }
                mainUser.FirstName = user.FirstName;
                mainUser.LastName = user.LastName;
                mainUser.PhoneNumber = user.PhoneNumber;

                await _context.SaveChangesAsync();
                return RedirectToAction(controllerName: "Page", actionName: "Profile");
            }
            return RedirectToAction(controllerName: "Page", actionName: "Profile");
        }
    }
}
