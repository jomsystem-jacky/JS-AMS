using System.Data;
using JS.AMS.Data;
using JS.AMSWeb.DTO.Identity;
using JS.AMSWeb.Utils;
using Microsoft.AspNetCore.Mvc;

namespace JS.AMSWeb.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class HomeController : Controller
    {
        private readonly AMSDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public HomeController(AMSDbContext db, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Index()
        {
            var sessionData = HttpContext.Session?.GetObjectFromJson<UserSessionDTO>("UserSession") ?? null;
            if (sessionData == null)
            {
                return Redirect("Identity/Account/Login");
            }

            var username = sessionData?.Username ?? "";

            var user = _db.UserAccounts
                .FirstOrDefault(x => x.UserName == username);
            if (user == null)
            {
                return Redirect("Identity/Account/Login");
            }

            var currentSession = HttpContext.Session.GetObjectFromJson<UserSessionDTO>("UserSession");
            HttpContext.Session.SetObjectAsJson("UserSession", currentSession);

            return View();
        }
    }
}