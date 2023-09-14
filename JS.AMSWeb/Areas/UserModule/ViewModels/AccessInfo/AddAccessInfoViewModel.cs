using System;
using JS.AMS.Data.Entity.User;

namespace JS.AMSWeb.Areas.UserModule.ViewModels.AccessInfo
{
	public class AddAccessInfoViewModel
	{
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }

        public string? Value { get; set; }
        public string? Remark { get; set; }

        //public List<UserAccountAccess> AccessUserAccounts { get; set; } = new List<UserAccountAccess>();
    }
}

