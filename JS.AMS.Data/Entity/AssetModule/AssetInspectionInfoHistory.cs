using JS.AMS.Data.Core.Entity;
using JS.AMS.Data.Entity.InspectionModule;

namespace JS.AMS.Data.Entity.AssetModule
{
    public class AssetInspectionInfoHistory : Auditable
    {
        public Guid AssetInfoId { get; set; }
        public AssetInfo AssetInfo { get; set; }

        public Guid SpecificationTypeId { get; set; }
        public SpecificationType SpecificationType { get; set; }

        public string? Value { get; set; }
        public string? Description { get; set; }
        public string? Remark { get; set; }

        public Guid? InspectionCaseId { get; set; }
        public InspectionCase InspectionCase { get; set; }

        public string? CurrentAcceptanceRate { get; set; }

        public Guid? AssetConditionId { get; set; }
        public AssetCondition AssetCondition { get; set; }
    }
}