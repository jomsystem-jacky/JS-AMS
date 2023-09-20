using System;
using JS.AMSWeb.Areas.UserModule.ViewModels.AccountAccess;

namespace JS.AMSWeb.Areas.UserModule.ViewModels.UserAccountAccess
{
	public class ManageUserAccountAccessViewModel
	{
        public string UserAccountId { get; set; }
        public string UserAccount { get; set; }
        public string Username { get; set; }
        public string Fullname { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }

        public List<UserAccountChecklistViewModel> AccessInfoChecklistItems { get; set; } = new List<UserAccountChecklistViewModel>();

        public Guid AccessInfoId { get; set; }
        public string AccessInfo { get; set; }

        public string returnUrl { get; set; }
    }
}

