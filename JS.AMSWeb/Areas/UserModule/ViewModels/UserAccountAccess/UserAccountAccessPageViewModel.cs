using System;
using JS.AMSWeb.Areas.UserModule.ViewModels.UserAccount;

namespace JS.AMSWeb.Areas.UserModule.ViewModels.UserAccountAccess
{
	public class UserAccountAccessPageViewModel
	{
        public X.PagedList.IPagedList<UserAccountAccessViewModel> Listing { get; set; }
        public AddUserAccountAccessViewModel AddUserAccountAccessDTO { get; set; }
    }
}

