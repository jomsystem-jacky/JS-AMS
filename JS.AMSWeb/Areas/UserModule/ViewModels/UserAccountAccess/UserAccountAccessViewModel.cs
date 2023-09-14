using System;
namespace JS.AMSWeb.Areas.UserModule.ViewModels.UserAccountAccess
{
	public class UserAccountAccessViewModel
	{
        public string UserAccountId { get; set; }
        public string UserAccount { get; set; }

        public Guid AccessInfoId { get; set; }
        public string AccessInfo { get; set; }
    }
}

