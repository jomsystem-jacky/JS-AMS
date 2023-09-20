using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMSWeb.Areas.AssetModule.ViewModels.AssetInfo
{
	public class AssetInfoViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Code { get; set; }
        public string? Remark { get; set; }

        public Guid AssetTypeId { get; set; }

        public string AssetTypeName { get; set; }

        public Guid CompanyProfileId { get; set; }

        public string CompanyProfileName { get; set; }

        public List<AssetInspectionInfoHistory> AssetInspectionInfoHistories { get; set; } = new List<AssetInspectionInfoHistory>();
        //public List<AssetLocationHistory> AssetLocationHistories { get; set; } = new List<AssetLocationHistory>();
    }
}

