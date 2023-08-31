using JS.AMS.Data.Core.Entity;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMS.Data.Entity.AssetModule
{
    public class SpecificationType : Auditable
    {
        public string Name { get; set; }
        public string? Code { get; set; }
        public string? Remark { get; set; }
        public string? AcceptanceLevel { get; set; }

        public List<AssetInspectionInfoHistory> AssetInspectionInfoSpecificationHistory { get; set; } = new List<AssetInspectionInfoHistory>();
    }
}