using System.Data;
using JS.AMS.Data.Entity.CompanyModule;
using JS.AMSWeb.Areas.CompanyModule.ViewModels.CompanyProfile;
using JS.AMSWeb.Data;
using JS.AMSWeb.Areas.CompanyModule.ViewModels.CompanyBranch;
using JS.AMSWeb.Areas.TicketModule.ViewModels.TicketStatus;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using X.PagedList;
using JS.AMS.Data;
using Humanizer;
using DocumentFormat.OpenXml.Wordprocessing;
using JS.AMSWeb.DTO.Identity;
using JS.AMSWeb.Utils;
using JS.AMSWeb.DTO.Shared;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.TicketModule;
using JS.AMSWeb.Areas.AssetModule.ViewModels.AssetType;
using JS.AMSWeb.Areas.TicketModule.ViewModels.TicketCategory;
using JS.AMSWeb.Areas.TicketModule.ViewModels.TicketHistoryMedia;

namespace JS.AMSWeb.Areas.CompanyModule
{
    [Area("TicketModule")]
    public class TicketHistoryMediaController : Controller
    {
        private readonly AMSDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public TicketHistoryMediaController(AMSDbContext db, IWebHostEnvironment webHostEnvironment)
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

            var ticketHistoryMedia = _db.TicketHistoryMedias
                .Include(m => m.TicketHistory)
                .Include(m => m.Media)
                .Where(x => x.Active);

            if (!string.IsNullOrWhiteSpace(searchName))
            {
                //ticketHistoryMedia = ticketHistoryMedia.Where(x => x.Name.ToLower().Replace(" ", "").Contains(searchName.ToLower().Replace(" ", "")));
            }

            var listVm = new List<TicketHistoryMediaViewModel>();

            var ticketHistoryMediaList = ticketHistoryMedia.ToList();
            foreach (var a in ticketHistoryMediaList)
            {
                var vm = new TicketHistoryMediaViewModel();
                vm.Id = a.Id;
                vm.Remark = a.Remark;
                vm.TicketHistoryId = a.TicketHistoryId;
                vm.MediaId = a.MediaId;

                listVm.Add(vm);
            }

            int pageSize = 10;
            int pageNumber = page ?? 1;

            ViewData["SearchName"] = searchName;

            var listing = listVm.ToPagedList(pageNumber, pageSize);

            var result = new TicketHistoryMediaPageViewModel();
            result.Listing = listing;
            result.AddTicketHistoryMediaDTO = new AddTicketHistoryMediaViewModel();

            ViewBag.TicketHistoryMedias = new SelectList(_db.TicketHistoryMedias.Where(x => x.Active), "Id", "Name");

            return View(result);
        }

        [HttpPost]
        public IActionResult Search(string? searchName, int? page)
        {
            if (page == 0 || page == null)
            {
                page = 1;
            }

            return RedirectToAction("Index", new { page = page, searchName = searchName });
        }

        [HttpPost]
        public async Task<IActionResult> Create(AddTicketHistoryMediaViewModel dto)
        {
            try
            {
                var ticketHistory = _db.TicketHistories
                    .FirstOrDefault(x => x.Id == dto.TicketHistoryId);
                if (ticketHistory == null)
                {
                    return BadRequest("Company Profile not found");
                }

                //var Media = new Media();
                //locationTag.Active = true;
                //locationTag.Name = dto.Name;
                //locationTag.Code = dto.Name;
                //locationTag.CompanyProfile = companyProfile;

                //_db.LocationTags.Add(locationTag);
                //_db.SaveChanges("system");

                var ticketHistoryMedia = new TicketHistoryMedia();
                ticketHistoryMedia.Active = true;
                ticketHistoryMedia.Remark = dto.Remark;
                ticketHistoryMedia.TicketHistoryId = dto.TicketHistoryId;
                ticketHistoryMedia.MediaId = dto.MediaId;

                _db.TicketHistoryMedias.Add(ticketHistoryMedia);
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
            var ticketHistoryMedia = _db.TicketHistoryMedias
                .FirstOrDefault(x => x.Id == id);
            if (ticketHistoryMedia == null)
            {
                return BadRequest("Company Branch not found");
            }

            var vm = new ManageTicketHistoryMediaViewModel();
            vm.Id = ticketHistoryMedia.Id;
            vm.TicketHistoryId = ticketHistoryMedia.TicketHistoryId;
            vm.Remark = ticketHistoryMedia.Remark;
            vm.MediaId = ticketHistoryMedia.MediaId;

            ViewBag.TicketHistoryMedias = new SelectList(_db.TicketHistoryMedias.Where(x => x.Active), "Id", "Name");

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(ManageTicketHistoryMediaViewModel dto)
        {
            try
            {
                var ticketHistoryMedia = _db.TicketHistoryMedias
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (ticketHistoryMedia == null)
                {
                    return BadRequest("Company Branch not found");
                }

                ticketHistoryMedia.Id = dto.Id;
                ticketHistoryMedia.TicketHistoryId = dto.TicketHistoryId;
                ticketHistoryMedia.MediaId = dto.MediaId;
                ticketHistoryMedia.Remark = dto.Remark;

                _db.TicketHistoryMedias.Update(ticketHistoryMedia);
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
            var ticketHistoryMedia = _db.TicketHistoryMedias
                .FirstOrDefault(x => x.Id == id);
            if (ticketHistoryMedia == null)
            {
                return BadRequest("Company Branch not found");
            }

            var vm = new ManageTicketHistoryMediaViewModel();
            vm.Id = ticketHistoryMedia.Id;
            vm.TicketHistoryId = ticketHistoryMedia.TicketHistoryId;
            vm.MediaId = ticketHistoryMedia.MediaId;
            vm.Remark = ticketHistoryMedia.Remark;

            ViewBag.TicketHistoryMedias = new SelectList(_db.TicketHistoryMedias.Where(x => x.Active), "Id", "Name");

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(ManageTicketHistoryMediaViewModel dto)
        {
            try
            {
                var ticketHistoryMedia = _db.TicketHistoryMedias
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (ticketHistoryMedia == null)
                {
                    return BadRequest("Company Branch not found");
                }

                ticketHistoryMedia.Active = false;

                _db.TicketHistoryMedias.Update(ticketHistoryMedia);
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
