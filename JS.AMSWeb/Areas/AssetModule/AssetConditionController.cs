using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using X.PagedList;
using JS.AMS.Data;
using Humanizer;
using DocumentFormat.OpenXml.Wordprocessing;
using JS.AMSWeb.Areas.AssetModule.ViewModels.AssetCondition;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMSWeb.DTO.Identity;
using JS.AMSWeb.Utils;

namespace JS.AMSWeb.Areas.AssetModule
{
    [Area("AssetModule")]
    public class AssetConditionController : Controller
    {
        private readonly AMSDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AssetConditionController(AMSDbContext db, IWebHostEnvironment webHostEnvironment)
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

            var AssetCondition = _db.AssetConditions
                .Where(x => x.Active);

            var listVm = new List<AssetConditionViewModel>();

            var AssetConditionList = AssetCondition.ToList();
            foreach (var a in AssetConditionList)
            {
                var vm = new AssetConditionViewModel();
                vm.Id = a.Id;
                vm.Name = a.Name;
                vm.Code = a.Code;
                vm.Remark = a.Remark;
                

                listVm.Add(vm);
            }

            int pageSize = 10;
            int pageNumber = page ?? 1;

            var listing = listVm.ToPagedList(pageNumber, pageSize);

            var result = new AssetConditionPageViewModel();
            result.Listing = listing;
            result.AddAssetConditionTypeDTO = new AssetConditionViewModel();

            return View(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(AddAssetConditionViewModel dto)
        {
            var sessionData = HttpContext.Session?.GetObjectFromJson<UserSessionDTO>("UserSession") ?? null;
            if (sessionData == null)
            {
                return Redirect("/");
            }

            var AssetCondition = new AssetCondition();
            AssetCondition.Active = true;
            AssetCondition.Name = dto.Name;
            AssetCondition.Code = dto.Code;
            AssetCondition.Remark = dto.Remark;
            

            _db.AssetConditions.Add(AssetCondition);
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
            var AssetCondition = _db.AssetConditions
                .FirstOrDefault(x => x.Id == id);
            if (AssetCondition == null)
            {
                return BadRequest("Asset Condition not found");
            }

            var vm = new ManageAssetConditionViewModel();
            vm.Id = AssetCondition.Id;
            vm.Name = AssetCondition.Name;
            vm.Code = AssetCondition.Code;
            vm.Remark = AssetCondition.Remark;
            

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(ManageAssetConditionViewModel dto)
        {
            try
            {
                var AssetCondition = _db.AssetConditions
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (AssetCondition == null)
                {
                    return BadRequest("Asset Condition not found");
                }

                AssetCondition.Name = dto.Name;
                AssetCondition.Code = dto.Code;
                AssetCondition.Remark = dto.Remark;
               

                _db.AssetConditions.Update(AssetCondition);
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
            var AssetCondition = _db.AssetConditions
                .FirstOrDefault(x => x.Id == id);
            if (AssetCondition == null)
            {
                return BadRequest("Asset Condition not found");
            }

            var vm = new ManageAssetConditionViewModel();
            vm.Id = AssetCondition.Id;
            vm.Name = AssetCondition.Name;
            vm.Code = AssetCondition.Code;
            vm.Remark = AssetCondition.Remark;
            

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(ManageAssetConditionViewModel dto)
        {
            try
            {
                var AssetCondition = _db.AssetConditions
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (AssetCondition == null)
                {
                    return BadRequest("Asset Condition not found");
                }

                AssetCondition.Active = false;

                _db.AssetConditions.Update(AssetCondition);
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
