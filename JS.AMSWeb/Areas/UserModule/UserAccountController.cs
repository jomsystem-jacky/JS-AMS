using System.Data;
using JS.AMSWeb.Data;
using JS.AMSWeb.Areas.UserModule.ViewModels.UserAccount;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using X.PagedList;
using JS.AMS.Data;
using Humanizer;
using JS.AMSWeb.Utils;
using DocumentFormat.OpenXml.Wordprocessing;
using JS.AMS.Data.Entity.User;
using DocumentFormat.OpenXml.Office2010.Excel;
using Microsoft.AspNetCore.Identity;

namespace JS.AMSWeb.Areas.UserModule
{
    [Area("UserModule")]
    public class UserAccountController : Controller
    {
        private readonly AMSDbContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly UserManager<UserAccount> _userManager;

        public UserAccountController(AMSDbContext db, UserManager<UserAccount> userManager, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
            _userManager = userManager;
        }

        public IActionResult Index(int? page)
        {
            //var pagination = new PaginationDTO();
            //pagination.CurrentPage = dto.Page;

            var userAccount = _db.UserAccounts
                .Where(x => x.IsActive);


            var listVm = new List<UserAccountViewModel>();

            var userAccountLists = userAccount.ToList();
            foreach (var a in userAccountLists)
            {
                var vm = new UserAccountViewModel();
                vm.Id = a.Id;
                vm.Username = a.UserName;
                vm.FirstName = a.FirstName;
                vm.LastName = a.LastName;
                vm.Nickname = a.Nickname;
                vm.IcPassport = a.IcPassport;
                vm.Birthday = a.Birthday;
                listVm.Add(vm);
            }

            int pageSize = 10;
            int pageNumber = page ?? 1;

            var listing = listVm.ToPagedList(pageNumber, pageSize);

            var result = new UserAccountPageViewModel();
            result.Listing = listing;
            result.AddUserAccountDTO = new AddUserAccountViewModel();

            return View(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(AddUserAccountViewModel dto)
        {
            try
            {

                if (string.IsNullOrWhiteSpace(dto.Username) || string.IsNullOrWhiteSpace(dto.Password))
                {
                    return BadRequest("Username and Password are required");
                }

                dto.Username = dto.Username.Replace(" ", "");

                if (!Utils.CommonHelper.IsValidEmail(dto.Username))
                {
                    return BadRequest("Username must be a valid email");
                }

                if (dto.Password != dto.ConfirmationPassword)
                {
                    return BadRequest("Password and Confirmation Password are not match");
                }

                var exist = _db.UserAccounts
                    .FirstOrDefault(x => x.UserName.Replace(" ", "").ToLower() == dto.Username.ToLower());
                if (exist != null)
                {
                    return BadRequest("Username already exist! Please use another!");
                }


                var userAccount = new UserAccount();
                userAccount.IsActive = true;
                userAccount.UserName = dto.Username;
                userAccount.FirstName = dto.FirstName.ToUpper();
                userAccount.LastName = dto.LastName.ToUpper();
                userAccount.Nickname = dto.Nickname;
                userAccount.IcPassport = dto.IcPassport;
                userAccount.Birthday = dto.Birthday;

                var result = await _userManager.CreateAsync(userAccount, dto.Password);

                if (!result.Succeeded)
                {
                    return BadRequest(result?.Errors?.LastOrDefault()?.Description);
                }

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                return BadRequest(ex?.InnerException?.Message + ex?.Message);
            }

        }



        public IActionResult Edit(string id)
        {
            var userAccount = _db.UserAccounts
                .FirstOrDefault(x => x.Id == id);
            if (userAccount == null)
            {
                return BadRequest("User account not found");
            }

            var vm = new ManageUserAccountViewModel();
            vm.Id = userAccount.Id;
            vm.FirstName = userAccount.FirstName;
            vm.LastName = userAccount.LastName;
            vm.Nickname = userAccount.Nickname;
            vm.IcPassport = userAccount.IcPassport;
            vm.Birthday = userAccount.Birthday;

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(ManageUserAccountViewModel dto)
        {
            try
            {
                var userAccount = _db.UserAccounts
                    .Where(x => x.IsActive)
                    .FirstOrDefault(x => x.Id == dto.Id);
                if (userAccount == null)
                {
                    return BadRequest("User account not found");
                }

                userAccount.FirstName = dto.FirstName;
                userAccount.LastName = dto.LastName;
                userAccount.Nickname = dto.Nickname;
                userAccount.IcPassport = dto.IcPassport;
                userAccount.Birthday = dto.Birthday;

                _db.UserAccounts.Update(userAccount);
                await _db.SaveChangesAsync("system");

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public IActionResult Delete(string id)
        {
            var userAccount = _db.UserAccounts
                .FirstOrDefault(x => x.Id == id);
            if (userAccount == null)
            {
                return BadRequest("User Account not found");
            }

            var vm = new ManageUserAccountViewModel();
            vm.Id = userAccount.Id;
            vm.FirstName = userAccount.FirstName;
            vm.LastName = userAccount.LastName;
            vm.Nickname = userAccount.Nickname;
            vm.IcPassport = userAccount.IcPassport;
            vm.Birthday = userAccount.Birthday;

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(ManageUserAccountViewModel dto,string id)
        {
            try
            {
                var userAccount = _db.UserAccounts
                .FirstOrDefault(x => x.Id == id);
                if (userAccount == null)
                {
                    return BadRequest("User Account not found");
                }


                userAccount.IsActive = false;

                _db.UserAccounts.Update(userAccount);
                await _db.SaveChangesAsync("system");

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public IActionResult ChangePassword(string userId)
        {
            try
            {
                var user = _db.UserAccounts
                    .FirstOrDefault(x => x.Id == userId);
                if (user == null)
                {
                    return BadRequest("User Account not found");
                }

                var vm = new ChangeUserAccountPasswordViewModel();
                vm.UserId = user.Id;

                return View(vm);
            }
            catch (Exception ex)
            {
                return BadRequest(ex?.InnerException?.Message + ex?.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> ChangePassword(ChangeUserAccountPasswordViewModel dto)
        {
            try
            {
                var user = _db.UserAccounts.FirstOrDefault(x => x.Id == dto.UserId);
                if (user == null)
                {
                    return NotFound();
                }
                if (string.IsNullOrWhiteSpace(dto.NewPassword) || string.IsNullOrWhiteSpace(dto.ConfirmationPassword))
                {
                    return BadRequest("New Password and Confirmation Password are required");
                }

                if (dto.NewPassword != dto.ConfirmationPassword)
                {
                    return BadRequest("New Password and Confirmation Password do not match");
                }

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var result = await _userManager.ResetPasswordAsync(user, token, dto.NewPassword);
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors.FirstOrDefault()?.Description);
                }

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                return BadRequest(ex?.InnerException?.Message + ex?.Message);
            }
        }
    }
}
