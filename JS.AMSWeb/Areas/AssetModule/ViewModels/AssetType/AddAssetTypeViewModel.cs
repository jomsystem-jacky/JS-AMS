using System;
using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMSWeb.Areas.AssetModule.ViewModels.AssetType
{
	public class AddAssetTypeViewModel
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string? Remark { get; set; }
    }
}

