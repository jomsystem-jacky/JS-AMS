using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.AssetModule
{
    public class AssetCondition : Auditable
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string? Remark { get; set; }

        public List<AssetInspectionInfoHistory> AssetInspectionInfoConditionHistories { get; set; } = new List<AssetInspectionInfoHistory>();
    }
}