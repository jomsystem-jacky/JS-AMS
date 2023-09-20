using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using X.PagedList;
using JS.AMS.Data;
using Humanizer;
using DocumentFormat.OpenXml.Wordprocessing;
using JS.AMSWeb.Areas.AssetModule.ViewModels.SpecificationType;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMSWeb.DTO.Identity;
using JS.AMSWeb.Utils;

namespace JS.AMSWeb.Areas.AssetModule
{
    [Area("AssetModule")]
    public class SpecificationTypeController : Controller
    {
        private readonly AMSDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public SpecificationTypeController(AMSDbContext db, IWebHostEnvironment webHostEnvironment)
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

            var SpecificationType = _db.SpecificationTypes
                .Where(x => x.Active);

            var listVm = new List<SpecificationTypeViewModel>();

            var SpecificationTypeList = SpecificationType.ToList();
            foreach (var a in SpecificationTypeList)
            {
                var vm = new SpecificationTypeViewModel();
                vm.Id = a.Id;
                vm.Name = a.Name;
                vm.Code = a.Code;
                vm.Remark = a.Remark;
                vm.AcceptanceLevel = a.AcceptanceLevel;

                listVm.Add(vm);
            }

            int pageSize = 10;
            int pageNumber = page ?? 1;

            var listing = listVm.ToPagedList(pageNumber, pageSize);

            var result = new SpecificationTypePageViewModel();
            result.Listing = listing;
            result.AddSpecificationTypeDTO = new SpecificationTypeViewModel();

            return View(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(AddSpecificationTypeViewModel dto)
        {
            var SpecificationType = new SpecificationType();
            SpecificationType.Active = true;
            SpecificationType.Name = dto.Name;
            SpecificationType.Code = dto.Code;
            SpecificationType.Remark = dto.Remark;
            SpecificationType.AcceptanceLevel = dto.AcceptanceLevel;

            _db.SpecificationTypes.Add(SpecificationType);
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
            var SpecificationType = _db.SpecificationTypes
                .FirstOrDefault(x => x.Id == id);
            if (SpecificationType == null)
            {
                return BadRequest("Asset Type not found");
            }

            var vm = new ManageSpecificationTypeViewModel();
            vm.Id = SpecificationType.Id;
            vm.Name = SpecificationType.Name;
            vm.Code = SpecificationType.Code;
            vm.Remark = SpecificationType.Remark;
            vm.AcceptanceLevel = SpecificationType.AcceptanceLevel;

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(ManageSpecificationTypeViewModel dto)
        {
            try
            {
                var SpecificationType = _db.SpecificationTypes
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (SpecificationType == null)
                {
                    return BadRequest("Asset Type not found");
                }

                SpecificationType.Name = dto.Name;
                SpecificationType.Code = dto.Code;
                SpecificationType.Remark = dto.Remark;
                SpecificationType.AcceptanceLevel = dto.AcceptanceLevel;

                _db.SpecificationTypes.Update(SpecificationType);
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
            var SpecificationType = _db.SpecificationTypes
                .FirstOrDefault(x => x.Id == id);
            if (SpecificationType == null)
            {
                return BadRequest("Specification Type not found");
            }

            var vm = new ManageSpecificationTypeViewModel();
            vm.Id = SpecificationType.Id;
            vm.Name = SpecificationType.Name;
            vm.Code = SpecificationType.Code;
            vm.Remark = SpecificationType.Remark;
            vm.AcceptanceLevel = SpecificationType.AcceptanceLevel;

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(ManageSpecificationTypeViewModel dto)
        {
            try
            {
                var SpecificationType = _db.SpecificationTypes
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (SpecificationType == null)
                {
                    return BadRequest("Asset Type not found");
                }

                SpecificationType.Active = false;

                _db.SpecificationTypes.Update(SpecificationType);
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
