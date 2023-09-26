using System.Data;
using JS.AMS.Data.Entity.CompanyModule;
using JS.AMSWeb.Areas.CompanyModule.ViewModels.CompanyProfile;
using JS.AMSWeb.Data;
using JS.AMSWeb.Areas.CompanyModule.ViewModels.CompanyProfile;
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

namespace JS.AMSWeb.Areas.CompanyModule
{
    [Area("CompanyModule")]
    public class CompanyProfileController : Controller
    {
        private readonly AMSDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public CompanyProfileController(AMSDbContext db, IWebHostEnvironment webHostEnvironment)
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

            var companyProfiles = _db.CompanyProfiles
                .Where(x => x.Active);

            if (!string.IsNullOrWhiteSpace(searchName))
            {
                companyProfiles = companyProfiles.Where(x => x.Name.ToLower().Replace(" ", "").Contains(searchName.ToLower().Replace(" ", "")));
            }

            var listVm = new List<CompanyProfileViewModel>();

            var companyProfileList = companyProfiles.ToList();
            foreach (var a in companyProfileList)
            {
                var vm = new CompanyProfileViewModel();
                vm.Id = a.Id;
                vm.Name = a.Name;
                vm.BRN = a.BRN;
                vm.FullAddress = a.FullAddress;
                vm.ContactPersonName = a.ContactPersonName;
                vm.ContactPersonPhoneNumber = a.ContactPersonPhoneNumber;
                listVm.Add(vm);
            }

            int pageSize = 10;
            int pageNumber = page ?? 1;

            ViewData["SearchName"] = searchName;

            var listing = listVm.ToPagedList(pageNumber, pageSize);

            var result = new CompanyProfilePageViewModel();
            result.Listing = listing;
            result.AddCompanyProfileDTO = new AddCompanyProfileViewModel();

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
        public async Task<IActionResult> Create(AddCompanyProfileViewModel dto)
        {
            var companyProfile = new CompanyProfile();
            companyProfile.Active = true;
            companyProfile.BRN = dto.BRN;
            companyProfile.ContactPersonName = dto.ContactPersonName;
            companyProfile.ContactPersonPhoneNumber = dto.ContactPersonPhoneNumber;
            companyProfile.Name = dto.Name;
            companyProfile.FullAddress = dto.FullAddress;

            _db.CompanyProfiles.Add(companyProfile);
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
            var companyProfile = _db.CompanyProfiles
                .FirstOrDefault(x => x.Id == id);
            if (companyProfile == null)
            {
                return BadRequest("Company profile not found");
            }

            var vm = new ManageCompanyProfileViewModel();
            vm.Id = companyProfile.Id;
            vm.Name = companyProfile.Name;
            vm.BRN = companyProfile.BRN;
            vm.FullAddress = companyProfile.FullAddress;
            vm.ContactPersonName = companyProfile.ContactPersonName;
            vm.ContactPersonPhoneNumber = companyProfile.ContactPersonPhoneNumber;

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(ManageCompanyProfileViewModel dto)
        {
            try
            {
                var companyProfile = _db.CompanyProfiles
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (companyProfile == null)
                {
                    return BadRequest("Company profile not found");
                }

                companyProfile.Name = dto.Name;
                companyProfile.BRN = dto.BRN;
                companyProfile.FullAddress = dto.FullAddress;
                companyProfile.ContactPersonName = dto.ContactPersonName;
                companyProfile.ContactPersonPhoneNumber = dto.ContactPersonPhoneNumber;

                _db.CompanyProfiles.Update(companyProfile);
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
            var companyProfile = _db.CompanyProfiles
                .FirstOrDefault(x => x.Id == id);
            if (companyProfile == null)
            {
                return BadRequest("Company profile not found");
            }

            var vm = new ManageCompanyProfileViewModel();
            vm.Id = companyProfile.Id;
            vm.Name = companyProfile.Name;
            vm.BRN = companyProfile.BRN;
            vm.FullAddress = companyProfile.FullAddress;
            vm.ContactPersonName = companyProfile.ContactPersonName;
            vm.ContactPersonPhoneNumber = companyProfile.ContactPersonPhoneNumber;

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(ManageCompanyProfileViewModel dto)
        {
            try
            {
                var companyProfile = _db.CompanyProfiles
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (companyProfile == null)
                {
                    return BadRequest("Company profile not found");
                }

                companyProfile.Active = false;

                _db.CompanyProfiles.Update(companyProfile);
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
