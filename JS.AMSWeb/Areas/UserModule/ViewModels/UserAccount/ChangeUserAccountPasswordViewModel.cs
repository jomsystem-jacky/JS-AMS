using System;
using JS.AMS.Data.Entity.User;

namespace JS.AMSWeb.Areas.UserModule.ViewModels.UserAccount
{
	public class ChangeUserAccountPasswordViewModel
	{
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmationPassword { get; set; }

        public List<ChangeUserAccountPasswordViewModel> ChangeUserPassword { get; set; } = new List<ChangeUserAccountPasswordViewModel>();

        //public List<UserAccountAccess> UserAccountAccesses { get; set; } = new List<UserAccountAccess>();
    }
}

