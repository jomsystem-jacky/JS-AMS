using System.Data;
using JS.AMSWeb.Data;
using JS.AMSWeb.Areas.UserModule.ViewModels.AccessInfo;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using X.PagedList;
using JS.AMS.Data;
using Humanizer;
using DocumentFormat.OpenXml.Wordprocessing;
using JS.AMS.Data.Entity.User;

namespace JS.AMSWeb.Areas.UserModule
{
    [Area("UserModule")]
    public class AccessinfoController : Controller
    {
        private readonly AMSDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AccessinfoController(AMSDbContext db, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Index(int? page)
        {
            //var pagination = new PaginationDTO();
            //pagination.CurrentPage = dto.Page;

            var accessInfos = _db.AccessInfos
                .Where(x => x.Active);

            var listVm = new List<AccessInfoViewModel>();

            var accessInfoLists = accessInfos.ToList();
            foreach (var a in accessInfoLists)
            {
                var vm = new AccessInfoViewModel();
                vm.Id = a.Id;
                vm.Name = a.Name;
                vm.Code = a.Code;
                vm.Value = a.Value;
                vm.Remark = a.Remark;
                listVm.Add(vm);
            }

            int pageSize = 10;
            int pageNumber = page ?? 1;

            var listing = listVm.ToPagedList(pageNumber, pageSize);

            var result = new AccessInfoPageViewModel();
            result.Listing = listing;
            result.AddAccessInfoDTO = new AddAccessInfoViewModel();

            return View(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(AddAccessInfoViewModel dto)
        {
            var accessInfo = new AccessInfo();
            accessInfo.Active = true;
            accessInfo.Name = dto.Name;
            accessInfo.Code = dto.Code;
            accessInfo.Value = dto.Value;
            accessInfo.Remark = dto.Remark;

            _db.AccessInfos.Add(accessInfo);
            _db.SaveChanges("system");

            return RedirectToAction("Index");
        }



        public IActionResult Edit(Guid id)
        {
            var accessInfo = _db.AccessInfos
                .FirstOrDefault(x => x.Id == id);
            if (accessInfo == null)
            {
                return BadRequest("Access info not found");
            }

            var vm = new ManageAccessInfoViewModel();
            vm.Id = accessInfo.Id;
            vm.Name = accessInfo.Name;
            vm.Code = accessInfo.Code;
            vm.Value = accessInfo.Value;
            vm.Remark = accessInfo.Remark;

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(ManageAccessInfoViewModel dto)
        {
            try
            {
                var accessInfo = _db.AccessInfos
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (accessInfo == null)
                {
                    return BadRequest("Company profile not found");
                }

                accessInfo.Name = dto.Name;
                accessInfo.Code = dto.Code;
                accessInfo.Value = dto.Value;
                accessInfo.Remark = dto.Remark;

                _db.AccessInfos.Update(accessInfo);
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
            var accessInfo = _db.AccessInfos
                .FirstOrDefault(x => x.Id == id);
            if (accessInfo == null)
            {
                return BadRequest("Access Info not found");
            }

            var vm = new ManageAccessInfoViewModel();
            vm.Id = accessInfo.Id;
            vm.Name = accessInfo.Name;
            vm.Code = accessInfo.Code;
            vm.Code = accessInfo.Value;
            vm.Remark = accessInfo.Remark;

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(ManageAccessInfoViewModel dto)
        {
            try
            {
                var accessInfo = _db.AccessInfos
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (accessInfo == null)
                {
                    return BadRequest("Access info not found");
                }

                accessInfo.Active = false;

                _db.AccessInfos.Update(accessInfo);
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
