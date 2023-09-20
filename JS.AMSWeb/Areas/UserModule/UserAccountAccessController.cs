using System.Data;
using JS.AMSWeb.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using X.PagedList;
using JS.AMS.Data;
using JS.AMS.Data.Entity.User;
using Microsoft.AspNetCore.Identity;
using JS.AMSWeb.Areas.UserModule.ViewModels.UserAccountAccess;
using JS.AMSWeb.Areas.UserModule.ViewModels.AccountAccess;
using Humanizer;

namespace JS.AMSWeb.Areas.UserModule
{
    [Area("UserModule")]
    public class UserAccountAccessController : Controller
    {
        private readonly AMSDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly UserManager<UserAccount> _userManager;

        public UserAccountAccessController(AMSDbContext db, UserManager<UserAccount> userManager, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
            _userManager = userManager;
        }

        public IActionResult Index(int? page, string UserAccountId)
        {
            //var pagination = new PaginationDTO();
            //pagination.CurrentPage = dto.Page;
            var userAccount = _db.UserAccounts
                    .FirstOrDefault(x => x.Id == UserAccountId);
            if (userAccount == null)
            {
                return BadRequest("User Account not found");
            }

            var userAccountAccess = _db.UserAccountAccesses
                .Where(x => x.Active && x.UserAccountId == UserAccountId)
                .ToList();

            var listVm = new List<UserAccountAccessViewModel>();

            var userAccountAccessLists = userAccountAccess.ToList();
            foreach (var a in userAccountAccessLists)
            {
                var vm = new UserAccountAccessViewModel();
                vm.UserAccountId = a.UserAccountId;
                vm.AccessInfo = a.AccessInfo.Name;
                listVm.Add(vm);
            }

            int pageSize = 10;
            int pageNumber = page ?? 1;

            var listing = listVm.ToPagedList(pageNumber, pageSize);

            var result = new UserAccountAccessPageViewModel();
            result.Listing = listing;
            result.AddUserAccountAccessDTO = new AddUserAccountAccessViewModel();
            result.AddUserAccountAccessDTO.Fullname = $"{userAccount.FirstName} {userAccount.LastName}";
            result.AddUserAccountAccessDTO.Username = userAccount.UserName;

            return View(result);
        }

        public IActionResult Create(string UserAccountId)
        {
            var userAccount = _db.UserAccounts
                .Include(m => m.UserAccountAccesses).ThenInclude(m => m.AccessInfo)
                .FirstOrDefault(m => m.Id == UserAccountId);
            if (userAccount == null)
            {
                return BadRequest("User Account not found");
            }
            var vm = new UserAccountAccessViewModel();
            vm.UserAccountId = userAccount.Id;
            vm.Username = userAccount.UserName;
            vm.Fullname = $"{userAccount.FirstName} {userAccount.LastName}";

            return View(vm); 
        }


        [HttpPost]
        public async Task<IActionResult> Create(AddUserAccountAccessViewModel dto)
        {
            try
            {

                var validateUser = _db.UserAccounts.FirstOrDefault(x => x.Id == dto.UserAccountId);
                if (validateUser == null)
                {
                    return BadRequest("User account not found");
                }

                var updateList = new List<UserAccountAccess>();
                var newList = new List<UserAccountAccess>();

                var falseAccesses = dto.AccessInfoChecklistItems.Where(x => !x.HasAccess).ToList();
                var trueAccesses = dto.AccessInfoChecklistItems.Where(x => x.HasAccess).ToList();

                foreach (var falseAccess in falseAccesses)
                {
                    var userAccessInfo = _db.UserAccountAccesses
                        .Include(m => m.UserAccount)
                        .Include(m => m.AccessInfo)
                        .FirstOrDefault(x => x.UserAccountId == validateUser.Id && x.AccessInfoId == falseAccess.AccessInfoId);
                    if (userAccessInfo != null)
                    {
                        userAccessInfo.Active = false;

                        _db.UserAccountAccesses.Update(userAccessInfo);
                        _db.SaveChanges("system");

                        continue;
                    }
                }

                foreach (var trueAccess in trueAccesses)
                {
                    var userAccessInfo = _db.UserAccountAccesses
                        .Include(m => m.UserAccount)
                        .Include(m => m.AccessInfo)
                        .FirstOrDefault(x => x.UserAccountId == validateUser.Id && x.AccessInfoId == trueAccess.AccessInfoId);
                    if (userAccessInfo != null)
                    {
                        userAccessInfo.Active = true;

                        _db.UserAccountAccesses.Update(userAccessInfo);
                        _db.SaveChanges("system");

                        continue;
                    }
                    else
                    {
                        var userAccountAccess = new UserAccountAccess();
                        userAccountAccess.UserAccountId = dto.UserAccountId;
                        userAccountAccess.AccessInfoId = trueAccess.AccessInfoId;
                        userAccountAccess.Active = true;

                        _db.UserAccountAccesses.Add(userAccountAccess);
                        _db.SaveChanges("system");
                    }

                }

                return Redirect(dto.returnUrl);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        public async Task<IActionResult> Delete(ManageUserAccountAccessViewModel dto, Guid id)
        {
            try
            {
                var userAccountAccess = _db.UserAccountAccesses
                .FirstOrDefault(x => x.Id == id);
                if (userAccountAccess == null)
                {
                    return BadRequest("User Account not found");
                }


                userAccountAccess.Active = false;

                _db.UserAccountAccesses.Update(userAccountAccess);
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
