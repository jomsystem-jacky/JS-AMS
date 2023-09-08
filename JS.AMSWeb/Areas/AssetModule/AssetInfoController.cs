using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using X.PagedList;
using JS.AMS.Data;
using Humanizer;
using DocumentFormat.OpenXml.Wordprocessing;
using JS.AMSWeb.Areas.AssetModule.ViewModels.AssetInfo;
using JS.AMS.Data.Entity.AssetModule;
using Microsoft.AspNetCore.Http.HttpResults;

namespace JS.AMSWeb.Areas.AssetModule
{
    [Area("AssetModule")]
    public class AssetInfoController : Controller
    {
        private readonly AMSDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AssetInfoController(AMSDbContext db, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Index(int? page)
        {
            //var pagination = new PaginationDTO();
            //pagination.CurrentPage = dto.Page;

            var assetInfo = _db.AccessInfos
                .Where(x => x.Active);

            var listVm = new List<AssetInfoViewModel>();

            var assetInfoList = assetInfo.ToList();
            foreach (var a in assetInfoList)
            {
                var vm = new AssetInfoViewModel();
                vm.Id = a.Id;
                vm.Name = a.Name;
                vm.Code = a.Code;
                vm.Remark = a.Remark;

                listVm.Add(vm);
            }

            int pageSize = 10;
            int pageNumber = page ?? 1;

            var listing = listVm.ToPagedList(pageNumber, pageSize);

            var result = new AssetInfoPageViewModel();
            result.Listing = listing;
            result.AddAssetInfoDTO = new AddAssetInfoViewModel();

            ViewBag.CompanyProfiles = new SelectList(_db.CompanyProfiles.Where(x => x.Active), "Id", "Name");
            ViewBag.AssetTypes = new SelectList(_db.AssetTypes.Where(x => x.Active), "Id", "Name");
            return View(result);
        }


        [HttpPost]
        public async Task<IActionResult> Create(AddAssetInfoViewModel dto)
        {
            try {
                var companyProfile = _db.CompanyProfiles
                        .FirstOrDefault(x => x.Id == dto.CompanyProfileId);

                var assetType = _db.AssetTypes
                    .FirstOrDefault(x => x.Id == dto.AssetTypeId);

                if (companyProfile == null)
                {
                    return BadRequest("Company Profile not found");
                }
                var assetInfo = new AssetInfo();
                assetInfo.Active = true;
                assetInfo.Name = dto.Name;
                assetInfo.Code = dto.Code;
                assetInfo.Remark = dto.Remark;
                assetInfo.CompanyProfile = companyProfile;
                assetInfo.AssetType = assetType;


                _db.AssetInfos.Add(assetInfo);
                _db.SaveChanges("system");

                return RedirectToAction("Index");
            }
            catch(Exception ex) 
            {
                return Ok(ex);
            }
        }

        public IActionResult Edit(Guid id)
        {
            var assetInfo = _db.AssetInfos
                .FirstOrDefault(x => x.Id == id);
            if (assetInfo == null)
            {
                return BadRequest("Asset Type not found");
            }

            var vm = new ManageAssetInfoViewModel();
            vm.Id = assetInfo.Id;
            vm.Name = assetInfo.Name;
            vm.Code = assetInfo.Code;
            vm.Remark = assetInfo.Remark;

            ViewBag.CompanyProfiles = new SelectList(_db.CompanyProfiles.Where(x => x.Active), "Id", "Name");
            ViewBag.AssetTypes = new SelectList(_db.AssetTypes.Where(x => x.Active), "Id", "Name");


            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(ManageAssetInfoViewModel dto)
        {
            try
            {
                var assetInfo = _db.AssetInfos
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (assetInfo == null)
                {
                    return BadRequest("Asset Type not found");
                }

                assetInfo.Name = dto.Name;
                assetInfo.Code = dto.Code;
                assetInfo.Remark = dto.Remark;
                
                _db.AssetInfos.Update(assetInfo);
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
            var assetInfo = _db.AssetInfos
                .FirstOrDefault(x => x.Id == id);
            if (assetInfo == null)
            {
                return BadRequest("Specification Type not found");
            }

            var vm = new ManageAssetInfoViewModel();
            vm.Id = assetInfo.Id;
            vm.Name = assetInfo.Name;
            vm.Code = assetInfo.Code;
            vm.Remark = assetInfo.Remark;

            ViewBag.CompanyProfiles = new SelectList(_db.CompanyProfiles.Where(x => x.Active), "Id", "Name");
            ViewBag.AssetTypes = new SelectList(_db.AssetTypes.Where(x => x.Active), "Id", "Name");


            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(ManageAssetInfoViewModel dto)
        {
            try
            {
                var assetInfo = _db.AssetInfos
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (assetInfo == null)
                {
                    return BadRequest("Asset Type not found");
                }

                assetInfo.Active = false;

                _db.AssetInfos.Update(assetInfo);
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
