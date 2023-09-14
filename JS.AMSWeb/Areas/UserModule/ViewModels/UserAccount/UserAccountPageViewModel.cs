using System;
using JS.AMSWeb.Areas.UserModule.ViewModels.UserAccount;

namespace JS.AMSWeb.Areas.UserModule.ViewModels.UserAccount
{
	public class UserAccountPageViewModel
	{
        public X.PagedList.IPagedList<UserAccountViewModel> Listing { get; set; }
        public AddUserAccountViewModel AddUserAccountDTO { get; set; }
    }
}

