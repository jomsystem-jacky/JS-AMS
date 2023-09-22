using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using X.PagedList;
using JS.AMS.Data;
using Humanizer;
using DocumentFormat.OpenXml.Wordprocessing;
using JS.AMSWeb.Areas.AssetModule.ViewModels.AssetType;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMSWeb.DTO.Identity;
using JS.AMSWeb.Utils;
using JS.BPOSWeb.DTO.Shared;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMSWeb.Areas.AssetModule
{
    [Area("AssetModule")]
    public class AssetTypeController : Controller
    {
        private readonly AMSDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public AssetTypeController(AMSDbContext db, IWebHostEnvironment webHostEnvironment)
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

            var assetTypes = _db.AssetTypes
                .Where(x => x.Active);

            if (!string.IsNullOrWhiteSpace(searchName))
            {
                assetTypes = assetTypes.Where(x => x.Name.ToLower().Replace(" ", "").Contains(searchName.ToLower().Replace(" ", "")));
            }
            var listVm = new List<AssetTypeViewModel>();

            var assetTypeList = assetTypes.ToList();
            foreach (var a in assetTypeList)
            {
                var vm = new AssetTypeViewModel();
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

            var result = new AssetTypePageViewModel();
            result.Listing = listing;
            result.AddAssetTypeDTO = new AddAssetTypeViewModel();

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
        public async Task<IActionResult> Create(AddAssetTypeViewModel dto)
        {
            var assetType = new AssetType();
            assetType.Active = true;
            assetType.Name = dto.Name; 
            assetType.Code = dto.Code; 
            assetType.Remark = dto.Remark;

            _db.AssetTypes.Add(assetType);
            _db.SaveChanges("system");

            return RedirectToAction("Index");
        }
        public IActionResult Edit(Guid id)
        {
            var assetType = _db.AssetTypes
                .FirstOrDefault(x => x.Id == id);
            if (assetType == null)
            {
                return BadRequest("Asset Type not found");
            }

            var vm = new ManageAssetTypeViewModel();
            vm.Id = assetType.Id;
            vm.Name = assetType.Name;
            vm.Code = assetType.Code;
            vm.Remark = assetType.Remark;

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(ManageAssetTypeViewModel dto)
        {
            var sessionData = HttpContext.Session?.GetObjectFromJson<UserSessionDTO>("UserSession") ?? null;
            if (sessionData == null)
            {
                return Redirect("/");
            }
            try
            {
                var assetType = _db.AssetTypes
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (assetType == null)
                {
                    return BadRequest("Asset Type not found");
                }

                assetType.Name = dto.Name;
                assetType.Code = dto.Code;
                assetType.Remark = dto.Remark;

                _db.AssetTypes.Update(assetType);
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
            var assetType = _db.AssetTypes
                .FirstOrDefault(x => x.Id == id);
            if (assetType == null)
            {
                return BadRequest("Asset Type not found");
            }

            var vm = new ManageAssetTypeViewModel();
            vm.Id = assetType.Id;
            vm.Name = assetType.Name;
            vm.Code = assetType.Code;
            vm.Remark = assetType.Remark;

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(ManageAssetTypeViewModel dto)
        {
            try
            {
                var assetType = _db.AssetTypes
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (assetType == null)
                {
                    return BadRequest("Asset Type not found");
                }

                assetType.Active = false;

                _db.AssetTypes.Update(assetType);
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
