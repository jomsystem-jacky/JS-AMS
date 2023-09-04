using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMSWeb.Areas.AssetModule.ViewModels.AssetType
{
	public class AssetTypePageViewModel
    {
        public X.PagedList.IPagedList<AssetTypeViewModel> Listing { get; set; }
        public AddAssetTypeViewModel AddAssetTypeDTO { get; set; }
    }
}

