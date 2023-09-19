using System.Data;
using JS.AMS.Data.Entity.CompanyModule;
using JS.AMSWeb.Areas.CompanyModule.ViewModels.CompanyProfile;
using JS.AMSWeb.Data;
using JS.AMSWeb.Areas.CompanyModule.ViewModels.CompanyBranch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using X.PagedList;
using JS.AMS.Data;
using Humanizer;
using DocumentFormat.OpenXml.Wordprocessing;
using JS.AMSWeb.DTO.Identity;
using JS.AMSWeb.Utils;

namespace JS.AMSWeb.Areas.CompanyModule
{
    [Area("CompanyModule")]
    public class CompanyBranchController : Controller
    {
        private readonly AMSDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public CompanyBranchController(AMSDbContext db, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Index(int? page)
        {
            //var pagination = new PaginationDTO();
            //pagination.CurrentPage = dto.Page;
            var sessionData = HttpContext.Session?.GetObjectFromJson<UserSessionDTO>("UserSession") ?? null;
            if (sessionData == null)
            {
                return Redirect("/");
            }

            var companyBranch = _db.CompanyBranches
                .Where(x => x.Active);

            var listVm = new List<CompanyBranchViewModel>();

            var companyBranchList = companyBranch.ToList();
            foreach (var a in companyBranchList)
            {
                var vm = new CompanyBranchViewModel();
                vm.Id = a.Id;
                vm.Name = a.Name;
                vm.FullAddress = a.FullAddress;
                vm.BranchContactPersonName = a.BranchContactPersonName;
                vm.BranchContactPersonPhoneNumber = a.BranchContactPersonPhoneNumber;
                vm.CompanyProfileId = a.CompanyProfileId;
                vm.LocationTagId = a.LocationTagId;
                
                listVm.Add(vm);
            }

            int pageSize = 10;
            int pageNumber = page ?? 1;

            var listing = listVm.ToPagedList(pageNumber, pageSize);

            var result = new CompanyBranchPageViewModel();
            result.Listing = listing;
            result.AddCompanyBranchDTO = new AddCompanyBranchViewModel();

            ViewBag.CompanyProfiles = new SelectList(_db.CompanyProfiles.Where(x => x.Active), "Id", "Name");
            ViewBag.LocationTags = new SelectList(_db.LocationTags.Where(x => x.Active), "Id", "Name");

            return View(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(AddCompanyBranchViewModel dto)
        {
            try
            {
                var companyProfile = _db.CompanyProfiles
                    .FirstOrDefault(x => x.Id == dto.CompanyProfileId);

                var locationTag = _db.LocationTags
                    .FirstOrDefault(x => x.Id == dto.LocationTagId);

                if (companyProfile == null)
                {
                    return BadRequest("Company Profile not found");
                }

                var companyBranch = new CompanyBranch();
                companyBranch.Active = true;
                companyBranch.BranchContactPersonName = dto.BranchContactPersonName;
                companyBranch.BranchContactPersonPhoneNumber = dto.BranchContactPersonPhoneNumber;
                companyBranch.Name = dto.Name;
                companyBranch.FullAddress = dto.FullAddress;
                companyBranch.CompanyProfile = companyProfile;
                companyBranch.LocationTag = locationTag;
                

                _db.CompanyBranches.Add(companyBranch);
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
            var companyBranch = _db.CompanyBranches
                .FirstOrDefault(x => x.Id == id);
            if (companyBranch == null)
            {
                return BadRequest("Company Branch not found");
            }

            var vm = new ManageCompanyBranchViewModel();
            vm.Id = companyBranch.Id;
            vm.Name = companyBranch.Name;
            vm.FullAddress = companyBranch.FullAddress;
            vm.BranchContactPersonName = companyBranch.BranchContactPersonName;
            vm.BranchContactPersonPhoneNumber = companyBranch.BranchContactPersonPhoneNumber;
            vm.CompanyProfileId = companyBranch.CompanyProfileId;
            vm.LocationTagId = companyBranch.LocationTagId;

            ViewBag.CompanyProfiles = new SelectList(_db.CompanyProfiles.Where(x => x.Active), "Id", "Name");
            ViewBag.LocationTags = new SelectList(_db.LocationTags.Where(x => x.Active), "Id", "Name");

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(ManageCompanyBranchViewModel dto)
        {
            try
            {
                var companyBranch = _db.CompanyBranches
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (companyBranch == null)
                {
                    return BadRequest("Company Branch not found");
                }

                companyBranch.Name = dto.Name;
                companyBranch.FullAddress = dto.FullAddress;
                companyBranch.FullAddress = dto.FullAddress;
                companyBranch.BranchContactPersonName = dto.BranchContactPersonName;
                companyBranch.BranchContactPersonPhoneNumber = dto.BranchContactPersonPhoneNumber;
                companyBranch.CompanyProfileId = dto.CompanyProfileId;
                companyBranch.LocationTagId = dto.LocationTagId;

                _db.CompanyBranches.Update(companyBranch);
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
            var CompanyBranch = _db.CompanyBranches
                .FirstOrDefault(x => x.Id == id);
            if (CompanyBranch == null)
            {
                return BadRequest("Company Branch not found");
            }

            var vm = new ManageCompanyBranchViewModel();
            vm.Id = CompanyBranch.Id;
            vm.Name = CompanyBranch.Name;
            vm.CompanyProfileId = CompanyBranch.CompanyProfileId;
            vm.LocationTagId = CompanyBranch.LocationTagId;
            vm.BranchContactPersonName = CompanyBranch.BranchContactPersonName;
            vm.FullAddress = CompanyBranch.FullAddress;
            vm.BranchContactPersonPhoneNumber = CompanyBranch.BranchContactPersonPhoneNumber;

            ViewBag.CompanyProfiles = new SelectList(_db.CompanyProfiles.Where(x => x.Active), "Id", "Name");
            ViewBag.LocationTags = new SelectList(_db.LocationTags.Where(x => x.Active), "Id", "Name");


            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(ManageCompanyBranchViewModel dto)
        {
            try
            {
                var CompanyBranch = _db.CompanyBranches
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (CompanyBranch == null)
                {
                    return BadRequest("Company Branch not found");
                }

                CompanyBranch.Active = false;

                _db.CompanyBranches.Update(CompanyBranch);
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
