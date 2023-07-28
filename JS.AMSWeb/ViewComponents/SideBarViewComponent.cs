using Microsoft.AspNetCore.Mvc;

namespace JS.AMSWeb.ViewComponents
{
    public class SideBarViewComponent : ViewComponent
    {

        public SideBarViewComponent()
        {
        }
        //public async Task<IViewComponentResult> InvokeAsync()
        //{
        //    var auth = HttpContext?.Session.GetObjectFromJson<AuthViewModel>(WebConstants.UserSession);
        //    var vm = new AuthorizationViewModel();
        //    var roleName = auth?.RoleName;
        //    //setup role control
        //    vm.IsSuperAdmin = roleName == Constants.SuperAdminRole;
        //    vm.IsCS = roleName == Constants.SuperAdminRole || roleName == Constants.CSRole;
        //    vm.IsAboveBM = roleName == Constants.BranchManagerRole || roleName == Constants.SuperAdminRole || roleName == Constants.DirectorRole;
        //    vm.IsAboveRA = roleName == Constants.RetailAsRole || roleName == Constants.BranchManagerRole || roleName == Constants.SuperAdminRole || roleName == Constants.DirectorRole;
        //    vm.IsDirector = roleName == Constants.SuperAdminRole || roleName == Constants.DirectorRole;
        //    return View(vm);
        //}
    }
}
