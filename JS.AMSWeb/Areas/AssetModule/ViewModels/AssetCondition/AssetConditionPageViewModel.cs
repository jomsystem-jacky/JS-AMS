using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;
using JS.AMSWeb.Areas.AssetModule.ViewModels.AssetCondition;

namespace JS.AMSWeb.Areas.AssetModule.ViewModels.AssetCondition
{
	public class AssetConditionPageViewModel
    {
        public X.PagedList.IPagedList<AssetConditionViewModel> Listing { get; set; }
        public AssetConditionViewModel AddAssetConditionTypeDTO { get; set; }
    }
}

