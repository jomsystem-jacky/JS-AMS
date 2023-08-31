using JS.AMS.Data.Core.Entity;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMS.Data.Entity.InspectionModule
{
    public class InspectionCase : Auditable
    {
        public string CaseId { get; set; }
        public DateTime InspectionDate { get; set; }

        public string? Remark { get; set; }

        public List<AssetInspectionInfoHistory> InspectionAssetInfoHistories { get; set; } = new List<AssetInspectionInfoHistory>();
    }
}