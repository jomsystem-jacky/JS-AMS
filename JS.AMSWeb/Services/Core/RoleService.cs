
using JS.AMSWeb.Utils;
using Microsoft.AspNetCore.Identity;

namespace JS.AMSWeb.Services.Core
{
    public class RoleService : IRoleService
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        public RoleService(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }

        public async Task<List<string>> InitRolesAvailable()
        {
            //Super Admin
            var superAdmin = await _roleManager.RoleExistsAsync(IdentityHelper.BPOS_SUPER_ADMIN);
            if (!superAdmin)
            {
                var role = new IdentityRole();
                role.Name = IdentityHelper.BPOS_SUPER_ADMIN;
                await _roleManager.CreateAsync(role);
            }

            //Admin
            var admin = await _roleManager.RoleExistsAsync(IdentityHelper.ADMIN);
            if (!admin)
            {
                var role = new IdentityRole();
                role.Name = IdentityHelper.ADMIN;
                await _roleManager.CreateAsync(role);
            }

            //POS User
            var posUser = await _roleManager.RoleExistsAsync(IdentityHelper.BPOS_USER);
            if (!posUser)
            {
                var role = new IdentityRole();
                role.Name = IdentityHelper.BPOS_USER;
                await _roleManager.CreateAsync(role);
            }


            var roles = _roleManager.Roles.Select(x => x.Name).ToList();
            return roles;
        }
    }
}
