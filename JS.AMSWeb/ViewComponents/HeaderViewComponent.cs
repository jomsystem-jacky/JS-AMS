using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.Intrinsics.X86;

namespace JS.AMSWeb.ViewComponents
{
    public class HeaderViewComponent : ViewComponent
    {
       //private AuthViewModel? Auth { get; set; }
        public HeaderViewComponent()
        {
        }

        //public async Task<IViewComponentResult> InvokeAsync()
        //{
        //    Auth = HttpContext?.Session.GetObjectFromJson<AuthViewModel>(WebConstants.UserSession);
        //    var vm = new HeaderViewModel();
        //    if (Auth != null)
        //    {
        //        vm.UserId = Auth.UserId;
        //        vm.BranchId = Auth.BranchId;
        //        vm.BranchName = Auth.BranchName;
        //        vm.CompanyId = Auth.CompanyId;
        //        vm.CompanyName = Auth.CompanyName;
        //        vm.FullName = Auth.FullName;
        //        vm.RoleName = Auth.RoleName;
        //    }
        //    return View(vm);
        //}
    }
}
