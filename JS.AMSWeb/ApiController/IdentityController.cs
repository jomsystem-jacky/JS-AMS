using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using JS.AMS.Data;
using JS.AMS.Data.Entity.User;
using JS.AMSWeb.DTO.Identity;
using JS.AMSWeb.Services.Azure;
using JS.AMSWeb.Utils;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace JS.AMSWeb.ApiController
{
    [ApiController]
    public class IdentityController : ControllerBase
    {
        private readonly UserManager<UserAccount> _userManager;
        private readonly SignInManager<UserAccount> _signInManager;
        private readonly AMSDbContext _db;

        public IdentityController(UserManager<UserAccount> userManager,SignInManager<UserAccount> signInManager,AMSDbContext db)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _db = db;
        }

        [HttpPost("api/v1/Identity/Login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            try
            {
                var acc = _db.UserAccounts
                    ////.Include(m => m.CompanyProfile)
                    //.Include(m => m.UserAccountAccesses).ThenInclude(m => m.AccessInfo)
                    .FirstOrDefault(x => x.UserName == dto.Username && x.IsActive);
                if (acc == null)
                {
                    return BadRequest("Failed to login, invalid username/password");
                }

                var result = await _signInManager.PasswordSignInAsync(dto.Username, dto.Password, true, lockoutOnFailure: false);
                if (result.IsLockedOut)
                {
                    return BadRequest("Failed to login, account locked out");
                }

                if (!result.Succeeded)
                {
                    return BadRequest("Failed to login, invalid username/password");
                }

                var roles = await _userManager.GetRolesAsync(acc);

                foreach (var claim in await _userManager.GetClaimsAsync(acc))
                {
                    await _userManager.RemoveClaimAsync(acc, claim);
                }
                //var staffDesignation = "JOM SYSTEM SUPER ADMIN";

                //string? profilePicUrl = null;
                //string? companyBranchId = null;
                //var companyBranchName = "JOM SYSTEM";


                var sessionObject = new UserSessionDTO();
                sessionObject.Username = acc.UserName ?? "No Username";

                HttpContext.Session.SetObjectAsJson("UserSession", sessionObject);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
