using System;
using JS.AMS.Data.Entity.User;

namespace JS.AMSWeb.Areas.UserModule.ViewModels.UserAccount
{
	public class AddUserAccountViewModel
	{
        public string Id { get; set; }
        public string Username { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Nickname { get; set; }
        public string? IcPassport { get; set; }
        public DateTime? Birthday { get; set; }
        public string Password { get; set; }
        public string ConfirmationPassword { get; set; }
        public string NewPassword { get; set; }

        //public List<UserAccountAccess> UserAccountAccesses { get; set; } = new List<UserAccountAccess>();
    }
}

