using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using X.PagedList;
using JS.AMS.Data;
using Humanizer;
using DocumentFormat.OpenXml.Wordprocessing;
using JS.AMSWeb.Areas.AssetModule.ViewModels.AssetLocationHistory;
using JS.AMS.Data.Entity.AssetModule;
using Microsoft.AspNetCore.Http.HttpResults;

namespace JS.AMSWeb.Areas.AssetModule
{
    [Area("AssetModule")]
    public class AssetLocationHistoryController : Controller
    {
        private readonly AMSDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AssetLocationHistoryController(AMSDbContext db, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
        }

        //public IActionResult Index(int? page)
        //{
        //    //var pagination = new PaginationDTO();
        //    //pagination.CurrentPage = dto.Page;

        //    var assetlocationhistory = _db.AssetLocationHistories
        //        .Where(x => x.Active);
            
            

        //    var listVm = new List<AssetLocationHistoryViewModel>();

        //    var assetlocationhistoryList = assetlocationhistory.ToList();
        //    foreach (var a in assetlocationhistoryList)
        //    {
        //        var vm = new AssetLocationHistoryViewModel();
        //        vm.AssetInfoId = a.AssetInfoId;
        //        vm.LocationTagId = a.LocationTagId;
        //        vm.AssignedDate = a.AssignedDate;
        //        vm.ReturnedDate = a.ReturnedDate;
        //        vm.AssignedByStaffId = a.AssignedByStaffId;


        //        listVm.Add(vm);
        //    }

        //    int pageSize = 10;
        //    int pageNumber = page ?? 1;

        //    var listing = listVm.ToPagedList(pageNumber, pageSize);

        //    var result = new AssetLocationHistoryPageViewModel();
        //    result.Listing = listing;
        //    result.AddAssetLocationHistoryDTO = new AddAssetLocationHistoryViewModel();

        //    ViewBag.LocationTags = new SelectList(_db.LocationTags.Where(x => x.Active), "Id", "Name");
        //    ViewBag.AssetInfos = new SelectList(_db.AssetInfos.Where(x => x.Active), "Id", "Name");
        //    return View(result);
        //}


        [HttpPost]
        public async Task<IActionResult> Create(AddAssetLocationHistoryViewModel dto)
        {
            try {
                //var companyProfile = _db.CompanyProfiles
                //        .FirstOrDefault(x => x.Id == dto.CompanyProfileId);

                //var assetType = _db.AssetTypes
                //    .FirstOrDefault(x => x.Id == dto.AssetTypeId);

                //if (companyProfile == null)
                //{
                //    return BadRequest("Company Profile not found");
                //}
                var assetlocationhistory = new AssetLocationHistory();
                assetlocationhistory.AssetInfoId = dto.AssetInfoId;
                assetlocationhistory.LocationTagId = dto.LocationTagId;
                assetlocationhistory.AssignedDate = dto.AssignedDate;
                assetlocationhistory.ReturnedDate = dto.ReturnedDate;
                assetlocationhistory.AssignedByStaffId = dto.AssignedByStaffId;

                _db.AssetLocationHistories.Add(assetlocationhistory);
                _db.SaveChanges("system");

                return RedirectToAction("Index");
            }
            catch(Exception ex) 
            {
                return Ok(ex);
            }
        }

        //public IActionResult Edit(Guid id)
        //{
        //    var assetlocationhistory = _db.AssignAssetInfoViewModel
        //        .FirstOrDefault(x => x.Id == id);
        //    if (assetlocationhistory == null)
        //    {
        //        return BadRequest("Asset Type not found");
        //    }

        //    var vm = new ManageAssetLocationHistoryViewModel();
        //    vm.AssetInfoId = assetlocationhistory.AssetInfoId;
        //    vm.LocationTagId = assetlocationhistory.LocationTagId;
        //    vm.AssignedDate = assetlocationhistory.AssignedDate;
        //    vm.ReturnedDate = assetlocationhistory.ReturnedDate;
        //    vm.AssignedByStaffId = assetlocationhistory.AssignedByStaffId;
           
        //    //ViewBag.CompanyProfiles = new SelectList(_db.CompanyProfiles.Where(x => x.Active), "Id", "Name");
        //    //ViewBag.AssetTypes = new SelectList(_db.AssetTypes.Where(x => x.Active), "Id", "Name");


        //    return View(vm);
        //}

        //[HttpPost]
        //public async Task<IActionResult> Edit(ManageAssetLocationHistoryViewModel dto)
        //{
        //    try
        //    {
        //        var assetlocationhistory = _db.AssetLocationHistories
        //            .FirstOrDefault(x => x.Id == dto.Id);
        //        if (assetInfo == null)
        //        {
        //            return BadRequest("Asset Type not found");
        //        }

        //        assetInfo.Name = dto.Name;
        //        assetInfo.Code = dto.Code;
        //        assetInfo.Remark = dto.Remark;
        //        assetInfo.CompanyProfileId = dto.CompanyProfileId;
        //        assetInfo.AssetTypeId = dto.AssetTypeId;

        //        _db.AssetLocationHistories.Update(assetlocationhistory);
        //        await _db.SaveChangesAsync("system");

        //        return RedirectToAction("Index");
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        //public IActionResult Delete(Guid id)
        //{
        //    var assetlocationhistory = _db.AssignAssetInfoViewModel
        //        .FirstOrDefault(x => x.Id == id);
        //    if (assetlocationhistory == null)
        //    {
        //        return BadRequest("Specification Type not found");
        //    }

        //    var vm = new ManageAssetLocationHistoryViewModel();
        //    vm.AssetInfoId = assetlocationhistory.AssetInfoId;
        //    vm.LocationTagId = assetlocationhistory.LocationTagId;
        //    vm.AssignedDate = assetlocationhistory.AssignedDate;
        //    vm.AssignedDate = assetlocationhistory.ReturnedDate;
        //    vm.AssignedByStaffId = assetlocationhistory.AssignedByStaffId;
        //    //vm.Id = assetInfo.Id;
        //    //vm.Name = assetInfo.Name;
        //    //vm.Code = assetInfo.Code;
        //    //vm.Remark = assetInfo.Remark;
        //    //vm.CompanyProfileId = assetInfo.CompanyProfileId;
        //    //vm.AssetTypeId = assetInfo.AssetTypeId;

        //    //ViewBag.CompanyProfiles = new SelectList(_db.CompanyProfiles.Where(x => x.Active), "Id", "Name");
        //    //ViewBag.AssetTypes = new SelectList(_db.AssetTypes.Where(x => x.Active), "Id", "Name");


        //    return View(vm);
        //}

        //[HttpPost]
        //public async Task<IActionResult> Delete(ManageAssetInfoViewModel dto)
        //{
        //    try
        //    {
        //        var assetInfo = _db.AssetInfos
        //            .FirstOrDefault(x => x.Id == dto.Id);
        //        if (assetInfo == null)
        //        {
        //            return BadRequest("Asset Type not found");
        //        }

        //        assetInfo.Active = false;

        //        _db.AssetInfos.Update(assetInfo);
        //        await _db.SaveChangesAsync("system");

        //        return RedirectToAction("Index");
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}
