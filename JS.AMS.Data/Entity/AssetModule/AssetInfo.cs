using JS.AMS.Data.Core.Entity;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMS.Data.Entity.AssetModule
{
    public class AssetInfo : Auditable
    {
        public string Name { get; set; }
        public string? Code { get; set; }
        public string? Remark { get; set; }

        public Guid AssetTypeId { get; set; }
        public AssetType AssetType { get; set; }

        public Guid CompanyProfileId { get; set; }
        public CompanyProfile CompanyProfile { get; set; }

        public List<AssetInspectionInfoHistory> AssetInspectionInfoHistories { get; set; } = new List<AssetInspectionInfoHistory>();
        public List<AssetLocationHistory> AssetLocationHistories { get; set; } = new List<AssetLocationHistory>();
    }
}