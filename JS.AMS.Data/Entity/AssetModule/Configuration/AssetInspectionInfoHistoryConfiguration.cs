using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.InspectionModule;

namespace JS.AMS.Data.Entity.AssetModule.Configuration
{
    public class AssetInspectionInfoHistoryConfiguration : AuditableConfiguration<AssetInspectionInfoHistory>
    {
        public override void Configure(EntityTypeBuilder<AssetInspectionInfoHistory> builder)
        {
            base.Configure(builder);
            builder.ToTable("AssetInspectionInfoHistory");

            builder.HasOne(x => x.AssetInfo)
                .WithMany(x => x.AssetInspectionInfoHistories)
                .HasForeignKey(x => x.AssetInfoId)
                .IsRequired(true);

            builder.Property(x => x.Value)
                .IsRequired(false);

            builder.Property(x => x.Description)
                .IsRequired(false);

            builder.Property(x => x.Remark)
                .IsRequired(false);

            builder.Property(x => x.CurrentAcceptanceRate)
                .IsRequired(false);

            builder.HasOne(x => x.SpecificationType)
                .WithMany(x => x.AssetInspectionInfoSpecificationHistory)
                .HasForeignKey(x => x.SpecificationTypeId)
                .IsRequired(true);

            builder.HasOne(x => x.InspectionCase)
                .WithMany(x => x.InspectionAssetInfoHistories)
                .HasForeignKey(x => x.InspectionCaseId)
                .IsRequired(true);

            builder.HasOne(x => x.AssetCondition)
                .WithMany(x => x.AssetInspectionInfoConditionHistories)
                .HasForeignKey(x => x.AssetConditionId)
                .IsRequired(true);
        }
    }
}