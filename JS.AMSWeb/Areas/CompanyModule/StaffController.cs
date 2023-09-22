using System.Data;
using JS.AMS.Data.Entity.CompanyModule;
using JS.AMSWeb.Areas.CompanyModule.ViewModels.CompanyProfile;
using JS.AMSWeb.Data;
using JS.AMSWeb.Areas.CompanyModule.ViewModels.Staff;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using X.PagedList;
using JS.AMS.Data;
using Humanizer;
using DocumentFormat.OpenXml.Wordprocessing;
using JS.AMSWeb.DTO.Identity;
using JS.AMSWeb.Utils;
using JS.BPOSWeb.DTO.Shared;

namespace JS.AMSWeb.Areas.CompanyModule
{
    [Area("CompanyModule")]
    public class StaffController : Controller
    {
        private readonly AMSDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public StaffController(AMSDbContext db, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Index(int? page,string searchName)
        {
            var pagination = new PaginationDTO();
            pagination.CurrentPage = page ?? 1;
            var sessionData = HttpContext.Session?.GetObjectFromJson<UserSessionDTO>("UserSession") ?? null;
            if (sessionData == null)
            {
                return Redirect("/");
            }

            var staff = _db.Staff
                .Include(m => m.CompanyProfile)
                .Include(m => m.LocationTag)
                .Where(x => x.Active)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchName))
            {
                staff = staff.Where(x => x.Name.ToLower().Replace(" ","").Contains(searchName.ToLower().Replace(" ","")));
            }

            var listVm = new List<StaffViewModel>();

            var staffList = staff.ToList();
            foreach (var a in staffList)
            {
                var vm = new StaffViewModel();
                vm.Id = a.Id;
                vm.Name = a.Name;
                vm.EmployeeId = a.EmployeeId;
                vm.PhoneNumber = a.PhoneNumber;
                vm.CompanyProfileId = a.CompanyProfileId;
                vm.CompanyProfileName = a.CompanyProfile.Name;
                vm.LocationTagId = a.LocationTagId;
                vm.LocationTagName = a.LocationTag.Name;
                listVm.Add(vm);
            }
            listVm = listVm.OrderBy(x => x.Name).ToList();

            int pageSize = 10;
            int pageNumber = page ?? 1;

            ViewData["SearchName"] = searchName;

            var listing = listVm.ToPagedList(pageNumber, pageSize);

            var result = new StaffPageViewModel();
            result.Listing = listing;
            result.AddStaffDTO = new AddStaffViewModel();

            ViewBag.CompanyProfiles = new SelectList(_db.CompanyProfiles.Where(x => x.Active), "Id", "Name");
            ViewBag.LocationTags = new SelectList(_db.LocationTags.Where(x => x.Active), "Id", "Name");

            return View(result);
        }

        [HttpPost]
        public IActionResult Search(string? searchName,  int? page)
        {
            if (page == 0 || page == null)
            {
                page = 1;
            }

            return RedirectToAction("Index", new { page = page, searchName = searchName});
        }

        [HttpPost]
        public async Task<IActionResult> Create(AddStaffViewModel dto)
        {
            var companyProfile = _db.CompanyProfiles
                .FirstOrDefault(x => x.Id == dto.CompanyProfileId);
            if(companyProfile == null)
            {
                return BadRequest("Company profile not found");
            }

            var locationTag = new LocationTag                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ();
            locationTag.Active = true;
            locationTag.Name = dto.Name;
            locationTag.Code = dto.EmployeeId;
            locationTag.CompanyProfile = companyProfile;

            _db.LocationTags.Add(locationTag);
            _db.SaveChanges("system");

            var staff = new Staff();
            staff.Active = true;
            staff.EmployeeId = dto.EmployeeId;
            staff.Name = dto.Name;
            staff.PhoneNumber = dto.PhoneNumber;
            staff.CompanyProfile = companyProfile;
            staff.LocationTag = locationTag;

            _db.Staff.Add(staff);
            _db.SaveChanges("system");
            
            return RedirectToAction("Index");
        }

        public IActionResult Edit(Guid id)
        {
            var sessionData = HttpContext.Session?.GetObjectFromJson<UserSessionDTO>("UserSession") ?? null;
            if (sessionData == null)
            {
                return Redirect("/");
            }
            var staff = _db.Staff
                .FirstOrDefault(x => x.Id == id);
            if (staff == null)
            {
                return BadRequest("Company profile not found");
            }

            var vm = new ManageStaffViewModel();
            vm.Id = staff.Id;
            vm.EmployeeId = staff.Name;
            vm.PhoneNumber = staff.PhoneNumber;
            vm.Name = staff.Name;
            vm.CompanyProfileId = staff.CompanyProfileId;
            vm.LocationTagId = staff.LocationTagId;

            ViewBag.CompanyProfiles = new SelectList(_db.CompanyProfiles.Where(x => x.Active), "Id", "Name");
            ViewBag.LocationTags = new SelectList(_db.LocationTags.Where(x => x.Active), "Id", "Name");

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(ManageStaffViewModel dto)
        {
            try
            {
                var staff = _db.Staff
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (staff == null)
                {
                    return BadRequest("Company profile not found");
                }

                staff.Name = dto.Name;
                staff.EmployeeId = dto.EmployeeId;
                staff.PhoneNumber = dto.PhoneNumber;
                staff.CompanyProfileId = dto.CompanyProfileId;
                staff.LocationTagId = dto.LocationTagId;

                _db.Staff.Update(staff);
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
            var staff = _db.Staff
                .FirstOrDefault(x => x.Id == id);
            
            if (staff == null)
            {
                return BadRequest("Company profile not found");
            }

            var vm = new ManageStaffViewModel();
            vm.Id = staff.Id;
            vm.Name = staff.Name;
            vm.EmployeeId = staff.EmployeeId;
            vm.PhoneNumber = staff.PhoneNumber;
            vm.CompanyProfileId = staff.CompanyProfileId;
            vm.LocationTagId = staff.LocationTagId;

            ViewBag.CompanyProfiles = new SelectList(_db.CompanyProfiles.Where(x => x.Active), "Id", "Name");
            ViewBag.LocationTags = new SelectList(_db.LocationTags.Where(x => x.Active), "Id", "Name");

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(ManageStaffViewModel dto)
        {
            try
            {
                var staff = _db.Staff
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (staff == null)
                {
                    return BadRequest("Company profile not found");
                }

                staff.Active = false;

                _db.Staff.Update(staff);
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
