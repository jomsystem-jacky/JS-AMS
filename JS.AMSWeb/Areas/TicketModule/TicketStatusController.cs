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

namespace JS.AMSWeb.Areas.TicketModule
{
        [Area("TicketModule")]
        public class TicketStatusController : Controller
        {
            private readonly AMSDbContext _db;
            private readonly IWebHostEnvironment _webHostEnvironment;

            public TicketStatusController(AMSDbContext db, IWebHostEnvironment webHostEnvironment)
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

                var ticketStatus = _db.TicketStatuses
                    //.Include(m => m.Name)
                    //.Include(m => m.Code)
                    //.Include(m => m.Remark)
                    .Where(x => x.Active);

                if (!string.IsNullOrWhiteSpace(searchName))
                {
                    ticketStatus = ticketStatus.Where(x => x.Name.ToLower().Replace(" ", "").Contains(searchName.ToLower().Replace(" ", "")));
                }

                var listVm = new List<TicketStatusViewModel>();

                var ticketStatusList = ticketStatus.ToList();
                foreach (var a in ticketStatusList)
                {
                    var vm = new TicketStatusViewModel();
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

                var result = new TicketStatusPageViewModel();
                result.Listing = listing;
                result.AddTicketStatusDTO = new AddTicketStatusViewModel();

                //ViewBag.CompanyProfiles = new SelectList(_db.CompanyProfiles.Where(x => x.Active), "Id", "Name");
                //ViewBag.LocationTags = new SelectList(_db.LocationTags.Where(x => x.Active), "Id", "Name");

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
            public async Task<IActionResult> Create(AddTicketStatusViewModel dto)
            {
                try
                {

                var ticketStatus = new TicketStatus();
                ticketStatus.Active = true;
                ticketStatus.Name = dto.Name;
                ticketStatus.Code = dto.Code;
                ticketStatus.Remark = dto.Remark;

                _db.TicketStatuses.Add(ticketStatus);
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
            var ticketStatus = _db.TicketStatuses
           .FirstOrDefault(x => x.Id == id);
            if (ticketStatus == null)
            {
                return BadRequest("Asset Type not found");
            }

            var vm = new ManageTicketStatusViewModel();
            vm.Id = ticketStatus.Id;
            vm.Name = ticketStatus.Name;
            vm.Code = ticketStatus.Code;
            vm.Remark = ticketStatus.Remark;

            return View(vm);
        }

            [HttpPost]
            public async Task<IActionResult> Edit(ManageTicketStatusViewModel dto)
            {
                var sessionData = HttpContext.Session?.GetObjectFromJson<UserSessionDTO>("UserSession") ?? null;
                if (sessionData == null)
                {
                    return Redirect("/");
                }
            try
            {
                var ticketStatus = _db.TicketStatuses
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (ticketStatus == null)
                {
                    return BadRequest("Asset Type not found");
                }

                ticketStatus.Name = dto.Name;
                ticketStatus.Code = dto.Code;
                ticketStatus.Remark = dto.Remark;

                _db.TicketStatuses.Update(ticketStatus);
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
                var ticketStatus = _db.TicketStatuses
                    .FirstOrDefault(x => x.Id == id);
                if (ticketStatus == null)
            {
                return BadRequest("Asset Type not found");
            }

                var vm = new ManageTicketStatusViewModel();
                vm.Id = ticketStatus.Id;
                vm.Name = ticketStatus.Name;
                vm.Code = ticketStatus.Code;
                vm.Remark = ticketStatus.Remark;

                return View(vm);
        }

            [HttpPost]
            public async Task<IActionResult> Delete(ManageCompanyBranchViewModel dto)
            {
                try
                {
                    var ticketStatus = _db.TicketStatuses
                    .FirstOrDefault(x => x.Id == dto.Id);
                    if (ticketStatus == null)
                {
                    return BadRequest("Asset Type not found");
                }

                    ticketStatus.Active = false;

                    _db.TicketStatuses.Update(ticketStatus);
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

