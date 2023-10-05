using System.Data;
using Microsoft.AspNetCore.Mvc;
using X.PagedList;
using JS.AMS.Data;
using JS.AMSWeb.DTO.Identity;
using JS.AMSWeb.Utils;
using JS.AMSWeb.DTO.Shared;
using JS.AMS.Data.Entity.TicketModule;
using JS.AMSWeb.Areas.TicketModule.ViewModels.TicketCategory;

namespace JS.AMSWeb.Areas.TicketModule
{
    [Area("TicketModule")]
    public class TicketCategoryController : Controller
    {
        private readonly AMSDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public TicketCategoryController(AMSDbContext db, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Index(int? page, string searchName)
        {
            var pagination = new PaginationDTO();
            pagination.CurrentPage = page ?? 1;
            var sessionData = HttpContext.Session?.GetObjectFromJson<UserSessionDTO>("UserSession") ?? null;
            if (sessionData == null)
            {
                return Redirect("/");
            }

            var ticketCategory = _db.TicketCategories
                //.Include(m => m.Name)
                //.Include(m => m.Code)
                //.Include(m => m.Remark)
                .Where(x => x.Active);

            if (!string.IsNullOrWhiteSpace(searchName))
            {
                ticketCategory = ticketCategory.Where(x => x.Name.ToLower().Replace(" ", "").Contains(searchName.ToLower().Replace(" ", "")));
            }

            var listVm = new List<TicketCategoryViewModel>();

            var ticketCategoryList = ticketCategory.ToList();
            foreach (var a in ticketCategoryList)
            {
                var vm = new TicketCategoryViewModel();
                vm.Id = a.Id;
                vm.Name = a.Name;
                vm.Code = a.Code;
                vm.Remark = a.Remark;

                listVm.Add(vm);
            }

            int pageSize = 10;
            int pageNumber = page ?? 1;

            ViewData["SearchName"] = searchName;

            var listing = listVm.ToPagedList(pageNumber, pageSize);

            var result = new TicketCategoryPageViewModel();
            result.Listing = listing;
            result.AddTicketCategoryDTO = new AddTicketCategoryViewModel();

            //ViewBag.CompanyProfiles = new SelectList(_db.CompanyProfiles.Where(x => x.Active), "Id", "Name");
            //ViewBag.LocationTags = new SelectList(_db.LocationTags.Where(x => x.Active), "Id", "Name");

            return View(result);
        }

        [HttpPost]
        public IActionResult Search(string? searchName, int? page)
        {
            var sessionData = HttpContext.Session?.GetObjectFromJson<UserSessionDTO>("UserSession") ?? null;
            if (sessionData == null)
            {
                return Redirect("/");
            }

            if (page == 0 || page == null)
            {
                page = 1;
            }

            return RedirectToAction("Index", new { page = page, searchName = searchName });
        }

        [HttpPost]
        public async Task<IActionResult> Create(AddTicketCategoryViewModel dto)
        {
            var sessionData = HttpContext.Session?.GetObjectFromJson<UserSessionDTO>("UserSession") ?? null;
            if (sessionData == null)
            {
                return Redirect("/");
            }

            try
            {

            var ticketCategory = new TicketCategory();
            ticketCategory.Active = true;
            ticketCategory.Name = dto.Name;
            ticketCategory.Code = dto.Code;
            ticketCategory.Remark = dto.Remark;

            _db.TicketCategories.Add(ticketCategory);
            _db.SaveChanges("system");

            return RedirectToAction("Index");
        }
            catch (Exception ex)
            {
                return Ok(ex);
            }
        }

        public IActionResult Edit(Guid id)
        {
            var sessionData = HttpContext.Session?.GetObjectFromJson<UserSessionDTO>("UserSession") ?? null;
            if (sessionData == null)
            {
                return Redirect("/");
            }

            var ticketCategory = _db.TicketCategories
                .FirstOrDefault(x => x.Id == id);
            if (ticketCategory == null)
            {
                return BadRequest("Asset Type not found");
            }

            var vm = new ManageTicketCategoryViewModel();
            vm.Id = ticketCategory.Id;
            vm.Name = ticketCategory.Name;
            vm.Code = ticketCategory.Code;
            vm.Remark = ticketCategory.Remark;

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(ManageTicketCategoryViewModel dto)
        {
            var sessionData = HttpContext.Session?.GetObjectFromJson<UserSessionDTO>("UserSession") ?? null;
            if (sessionData == null)
            {
                return Redirect("/");
            }

            try
            {
                var ticketCategory = _db.TicketCategories
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (ticketCategory == null)
                {
                    return BadRequest("Asset Type not found");
                }

                ticketCategory.Name = dto.Name;
                ticketCategory.Code = dto.Code;
                ticketCategory.Remark = dto.Remark;

                _db.TicketCategories.Update(ticketCategory);
                await _db.SaveChangesAsync("system");

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public IActionResult Delete(Guid id)
        {
            var sessionData = HttpContext.Session?.GetObjectFromJson<UserSessionDTO>("UserSession") ?? null;
            if (sessionData == null)
            {
                return Redirect("/");
            }

            var ticketCategory = _db.TicketCategories
                .FirstOrDefault(x => x.Id == id);
            if (ticketCategory == null)
            {
                return BadRequest("Asset Type not found");
            }

                var vm = new ManageTicketCategoryViewModel();
                vm.Id = ticketCategory.Id;
                vm.Name = ticketCategory.Name;
                vm.Code = ticketCategory.Code;
                vm.Remark = ticketCategory.Remark;

                return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(ManageTicketCategoryViewModel dto)
        {
            var sessionData = HttpContext.Session?.GetObjectFromJson<UserSessionDTO>("UserSession") ?? null;
            if (sessionData == null)
            {
                return Redirect("/");
            }

            try
            {
                var ticketCategory = _db.TicketCategories
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (ticketCategory == null)
                {
                    return BadRequest("Asset Type not found");
                }

                ticketCategory.Active = false;

                _db.TicketCategories.Update(ticketCategory);
                await _db.SaveChangesAsync("system");

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}