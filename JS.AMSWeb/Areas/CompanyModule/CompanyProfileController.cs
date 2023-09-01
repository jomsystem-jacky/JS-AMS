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

        public IActionResult Index(int? page)
        {
            //var pagination = new PaginationDTO();
            //pagination.CurrentPage = dto.Page;

            var companyProfiles = _db.CompanyProfiles
                .Where(x => x.Active);

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

            var listing = listVm.ToPagedList(pageNumber, pageSize);

            var result = new CompanyProfilePageViewModel();
            result.Listing = listing;
            result.AddCompanyProfileDTO = new AddCompanyProfileViewModel();

            return View(result);
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

        //[HttpPost]
        //public async Task<IActionResult> Create(AddCompanyProfileViewModel dto)
        //{
        //    try
        //    {
        //        var user = await _db.Users.SingleOrDefaultAsync(m => m.UserName == User.Identity.Name);
        //        if (user == null)
        //        {
        //            return BadRequest("Current user not found");
        //        }

        //        var state = _db.States
        //            .FirstOrDefault(x => x.Id == dto.StateId);
        //        if (state == null)
        //        {
        //            return BadRequest("State not found");
        //        }

        //        var city = _db.Cities
        //            .FirstOrDefault(x => x.Id == dto.CityId);
        //        if (city == null)
        //        {
        //            return BadRequest("City not found");
        //        }

        //        var location = new Location();
        //        location.Name = dto.CompanyName;
        //        location.State = state;
        //        location.City = city;
        //        location.AddressOne = dto.Address1;
        //        location.AddressTwo = dto.Address2;
        //        location.AddressThree = dto.Address3;
        //        location.AddressFour = dto.Address4;
        //        location.PostalCode = dto.Postcode;

        //        _db.Locations.Add(location);
        //        _db.SaveChanges(User.Identity.Name);

        //        var companyProfile = new CompanyProfile();
        //        companyProfile.Active = true;
        //        companyProfile.CompanyName = dto.CompanyName;
        //        companyProfile.InternalCompanyCode = dto.InternalCompanyCode;
        //        companyProfile.PhoneNumber1 = dto.PhoneNumber1;
        //        companyProfile.PhoneNumber2 = dto.PhoneNumber2;
        //        companyProfile.EmailAddress = dto.EmailAddress;
        //        companyProfile.BusinessRegistrationNumber = dto.BusinessRegistrationNumber;
        //        companyProfile.Location = location;

        //        _db.CompanyProfiles.Add(companyProfile);
        //        _db.SaveChanges(User.Identity.Name);

        //        return RedirectToAction("Index");
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        //public IActionResult Edit(Guid id)
        //{
        //    var companyProfile = _db.CompanyProfiles
        //        .Include(m => m.CompanyDocumentSettings).ThenInclude(m => m.DocumentType)
        //        .FirstOrDefault(x => x.Id == id);
        //    if (companyProfile == null)
        //    {
        //        return BadRequest("Company profile not found");
        //    }

        //    var vm = new ManageCompanyProfileViewModel();
        //    vm.Id = companyProfile.Id;
        //    vm.CompanyName = companyProfile.CompanyName;
        //    vm.InternalCompanyCode = companyProfile.InternalCompanyCode;
        //    vm.PhoneNumber1 = companyProfile.PhoneNumber1 ?? "-";
        //    vm.PhoneNumber2 = companyProfile.PhoneNumber2;
        //    vm.LocationId = companyProfile.LocationId;
        //    vm.Address1 = companyProfile.Location?.AddressOne ?? "";
        //    vm.Address2 = companyProfile.Location?.AddressTwo ?? "";
        //    vm.Address3 = companyProfile.Location?.AddressThree ?? "";
        //    vm.Address4 = companyProfile.Location?.AddressFour ?? "";
        //    vm.Postcode = companyProfile.Location?.PostalCode;
        //    vm.StateId = companyProfile.Location?.StateId;
        //    vm.CityId = companyProfile.Location?.CityId;
        //    vm.EmailAddress = companyProfile.EmailAddress;
        //    vm.BusinessRegistrationNumber = companyProfile.BusinessRegistrationNumber;
        //    vm.DisplayAddress = companyProfile.Location != null ? Utils.CommonHelper.CombineLocationToFullAddress(companyProfile.Location) : "-";

        //    foreach (var companyBranch in companyProfile.CompanyBranches)
        //    {
        //        var cb = new CompanyBranchViewModel();
        //        cb.BranchName = companyBranch.BranchName;
        //        cb.BranchCode = companyBranch.BranchCode;
        //        cb.DisplayAddress = companyBranch.Location != null ? Utils.CommonHelper.CombineLocationToFullAddress(companyBranch.Location) : "-";
        //        cb.Id = companyBranch.Id;

        //        vm.CompanyBranches.Add(cb);
        //    }

        //    foreach (var staff in companyProfile.CompanyStaffs)
        //    {
        //        var s = new StaffViewModel();
        //        s.Id = staff.Id;
        //        s.FullName = staff.FullName;
        //        s.EmployeeId = staff.EmployeeId;
        //        s.PhoneNumber = staff.PhoneNumber;

        //        vm.Staffs.Add(s);
        //    }

        //    foreach (var companyDocumentType in companyProfile.CompanyDocumentSettings.Where(x => x.Active))
        //    {
        //        var cdt = new CompanyDocumentTypeViewModel();
        //        cdt.DocumentType = companyDocumentType.DocumentType.Name;
        //        cdt.Prefix = companyDocumentType.Prefix;
        //        cdt.CurrentDocumentNo = companyDocumentType.CurrentDocumentNo;
        //        cdt.NextDocumentNo = companyDocumentType.NextDocumentNo;
        //        cdt.Id = companyDocumentType.Id;

        //        vm.CompanyDocumentTypes.Add(cdt);
        //    }

        //    ViewBag.States = new SelectList(_db.States.Where(x => x.Active), "Id", "Name");
        //    ViewBag.Cities = new SelectList(_db.Cities.Where(x => x.Active), "Id", "Name");

        //    return View(vm);
        //}

        //[HttpPost]
        //public async Task<IActionResult> Edit(ManageCompanyProfileViewModel dto)
        //{
        //    try
        //    {
        //        var user = await _db.Users.SingleOrDefaultAsync(m => m.UserName == User.Identity.Name);
        //        if (user == null)
        //        {
        //            return BadRequest("Current user not found");
        //        }

        //        var state = _db.States
        //            .FirstOrDefault(x => x.Id == dto.StateId);
        //        if (state == null)
        //        {
        //            return BadRequest("State not found");
        //        }

        //        var city = _db.Cities
        //            .FirstOrDefault(x => x.Id == dto.CityId);
        //        if (city == null)
        //        {
        //            return BadRequest("City not found");
        //        }

        //        var location = _db.Locations
        //            .FirstOrDefault(x => x.Id == dto.LocationId);
        //        if (location == null && dto.LocationId.HasValue)
        //        {
        //            return BadRequest("Location not found");
        //        }

        //        if (location != null && dto.LocationId.HasValue)
        //        {
        //            location.Name = dto.CompanyName;
        //            location.State = state;
        //            location.City = city;
        //            location.AddressOne = dto.Address1;
        //            location.AddressTwo = dto.Address2;
        //            location.AddressThree = dto.Address3;
        //            location.AddressFour = dto.Address4;
        //            location.PostalCode = dto.Postcode;

        //            _db.Locations.Update(location);
        //            _db.SaveChanges(User.Identity.Name);
        //        }

        //        if (location == null && !dto.LocationId.HasValue)
        //        {
        //            var newLocation = new Location();
        //            newLocation.Name = dto.CompanyName;
        //            newLocation.State = state;
        //            newLocation.City = city;
        //            newLocation.AddressOne = dto.Address1;
        //            newLocation.AddressTwo = dto.Address2;
        //            newLocation.AddressThree = dto.Address3;
        //            newLocation.AddressFour = dto.Address4;
        //            newLocation.PostalCode = dto.Postcode;

        //            _db.Locations.Add(newLocation);
        //            _db.SaveChanges(User.Identity.Name);

        //            location = newLocation;
        //        }

        //        var companyProfile = _db.CompanyProfiles
        //            .FirstOrDefault(x => x.Id == dto.Id);
        //        if (companyProfile == null)
        //        {
        //            return BadRequest("Company profile not found");
        //        }

        //        companyProfile.CompanyName = dto.CompanyName;
        //        companyProfile.InternalCompanyCode = dto.InternalCompanyCode;
        //        companyProfile.PhoneNumber1 = dto.PhoneNumber1;
        //        companyProfile.PhoneNumber2 = dto.PhoneNumber2;
        //        companyProfile.EmailAddress = dto.EmailAddress;
        //        companyProfile.BusinessRegistrationNumber = dto.BusinessRegistrationNumber;
        //        companyProfile.LocationId = location?.Id ?? null;

        //        _db.CompanyProfiles.Update(companyProfile);
        //        await _db.SaveChangesAsync(User.Identity.Name);

        //        return RedirectToAction("Index");
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        //public IActionResult Delete(Guid id)
        //{
        //    var companyProfile = _db.CompanyProfiles
        //        .Include(m => m.Location)
        //        .Include(m => m.Location).ThenInclude(m => m.City)
        //        .Include(m => m.Location).ThenInclude(m => m.State)
        //        .FirstOrDefault(x => x.Id == id);
        //    if (companyProfile == null)
        //    {
        //        return BadRequest("Company profile not found");
        //    }

        //    var vm = new ManageCompanyProfileViewModel();
        //    vm.CompanyName = companyProfile.CompanyName;
        //    vm.InternalCompanyCode = companyProfile.InternalCompanyCode;
        //    vm.PhoneNumber1 = companyProfile.PhoneNumber1;
        //    vm.PhoneNumber2 = companyProfile.PhoneNumber2;
        //    vm.EmailAddress = companyProfile.EmailAddress;
        //    vm.BusinessRegistrationNumber = companyProfile.BusinessRegistrationNumber;
        //    vm.LocationId = companyProfile.LocationId;
        //    vm.Address1 = companyProfile.Location?.AddressOne ?? "";
        //    vm.Address2 = companyProfile.Location?.AddressTwo ?? "";
        //    vm.Address3 = companyProfile.Location?.AddressThree ?? "";
        //    vm.Address4 = companyProfile.Location?.AddressFour ?? "";
        //    vm.Postcode = companyProfile.Location?.PostalCode;
        //    vm.StateId = companyProfile.Location?.StateId;
        //    vm.CityId = companyProfile.Location?.CityId;
        //    vm.CityName = companyProfile.Location.City.Name;
        //    vm.StateName = companyProfile.Location.State.Name;

        //    return View(vm);
        //}

        //[HttpPost]
        //public async Task<IActionResult> Delete(ManageCompanyProfileViewModel dto)
        //{
        //    try
        //    {
        //        var user = await _db.Users.SingleOrDefaultAsync(m => m.UserName == User.Identity.Name);
        //        if (user == null)
        //        {
        //            return BadRequest("Current user not found");
        //        }

        //        var companyProfile = _db.CompanyProfiles
        //            .FirstOrDefault(x => x.Id == dto.Id);
        //        if (companyProfile == null)
        //        {
        //            return BadRequest("Company profile not found");
        //        }

        //        companyProfile.Active = false;

        //        _db.CompanyProfiles.Update(companyProfile);
        //        await _db.SaveChangesAsync(User.Identity.Name);

        //        return RedirectToAction("Index");
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}
