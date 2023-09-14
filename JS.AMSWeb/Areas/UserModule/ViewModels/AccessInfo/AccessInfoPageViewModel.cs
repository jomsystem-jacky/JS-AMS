using System;
using JS.AMSWeb.Areas.UserModule.ViewModels.AccessInfo;

namespace JS.AMSWeb.Areas.UserModule.ViewModels.AccessInfo
{
	public class AccessInfoPageViewModel
	{
        public X.PagedList.IPagedList<AccessInfoViewModel> Listing { get; set; }
        public AddAccessInfoViewModel AddAccessInfoDTO { get; set; }
    }
}

