using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMS.Data.Entity.AssetModule.Configuration
{
    public class AssetLocationHistoryConfiguration : AuditableConfiguration<AssetLocationHistory>
    {
        public override void Configure(EntityTypeBuilder<AssetLocationHistory> builder)
        {
            base.Configure(builder);
            builder.ToTable("AssetLocationHistory");

            builder.HasOne(x => x.AssetInfo)
                .WithMany(x => x.AssetLocationHistories)
                .HasForeignKey(x => x.AssetInfoId)
                .IsRequired(true);

            builder.Property(x => x.AssignedDate)
                .IsRequired(false);

            builder.Property(x => x.ReturnedDate)
                .IsRequired(false);

            builder.HasOne(x => x.LocationTag)
                .WithMany(x => x.LocationAssetHistories)
                .HasForeignKey(x => x.LocationTagId)
                .IsRequired(true)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(x => x.AssignedByStaff)
                .WithMany(x => x.AssignedStaffAssetLocationHistories)
                .HasForeignKey(x => x.AssignedByStaffId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}