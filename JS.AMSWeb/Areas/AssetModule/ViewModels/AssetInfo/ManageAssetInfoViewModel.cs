using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMSWeb.Areas.AssetModule.ViewModels.AssetInfo
{
	public class ManageAssetInfoViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Code { get; set; }
        public string? Remark { get; set; }

        public Guid AssetTypeId { get; set; }

        public Guid CompanyProfileId { get; set; }

        public List<AssetInspectionInfoHistory> AssetInspectionInfoHistories { get; set; } = new List<AssetInspectionInfoHistory>();
        //public List<AssetLocationHistory> AssetLocationHistories { get; set; } = new List<AssetLocationHistory>();
    }
}

