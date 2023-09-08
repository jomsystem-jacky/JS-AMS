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

        public IActionResult Index(int? page)
        {
            //var pagination = new PaginationDTO();
            //pagination.CurrentPage = dto.Page;

            var staff = _db.Staff
                .Where(x => x.Active);

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
                vm.LocationTagId = a.LocationTagId;
                listVm.Add(vm);
            }

            int pageSize = 10;
            int pageNumber = page ?? 1;

            var listing = listVm.ToPagedList(pageNumber, pageSize);

            var result = new StaffPageViewModel();
            result.Listing = listing;
            result.AddStaffDTO = new AddStaffViewModel();

            ViewBag.CompanyProfiles = new SelectList(_db.CompanyProfiles.Where(x => x.Active), "Id", "Name");
            ViewBag.LocationTags = new SelectList(_db.LocationTags.Where(x => x.Active), "Id", "Name");

            return View(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(AddStaffViewModel dto)
        {
            var companyProfile = _db.CompanyProfiles
                    .FirstOrDefault(x => x.Id == dto.CompanyProfileId);

            var locationTag = _db.LocationTags
                .FirstOrDefault(x => x.Id == dto.LocationTagId);

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
