using JS.AMS.Data.Entity.User;
using JS.AMS.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace JS.AMSWeb.Areas.Account
{
    [Area("Account")]
    public class AccountController : Controller
    {
        private readonly AMSDbContext _db;
        private readonly SignInManager<UserAccount> _signInManager;

        public AccountController(AMSDbContext db, SignInManager<UserAccount> signInManager)
        {
            _db = db;
            _signInManager = signInManager;
        }

        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            foreach (var cookie in Request.Cookies.Keys)
            {
                if (cookie == ".AspNetCore.Session")
                {
                    Response.Cookies.Delete(cookie);
                }
            }

            return Redirect("/Identity/Account/Login");
        }
    }
}
