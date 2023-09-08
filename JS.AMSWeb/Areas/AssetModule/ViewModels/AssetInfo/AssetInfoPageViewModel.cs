using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMSWeb.Areas.AssetModule.ViewModels.AssetInfo
{
	public class AssetInfoPageViewModel
    {
        public X.PagedList.IPagedList<AssetInfoViewModel> Listing { get; set; }
        public AddAssetInfoViewModel AddAssetInfoDTO { get; set; }
    }
}

