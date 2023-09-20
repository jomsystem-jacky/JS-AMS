using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMSWeb.Areas.AssetModule.ViewModels.AssetLocationHistory
{
	public class AssetLocationHistoryPageViewModel
    {
        public X.PagedList.IPagedList<AssetLocationHistoryViewModel> Listing { get; set; }
    }
}

