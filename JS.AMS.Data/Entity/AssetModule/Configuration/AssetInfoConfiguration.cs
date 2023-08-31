using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.AssetModule.Configuration
{
    public class AssetInfoConfiguration : AuditableConfiguration<AssetInfo>
    {
        public override void Configure(EntityTypeBuilder<AssetInfo> builder)
        {
            base.Configure(builder);
            builder.ToTable("AssetInfo");

            builder.Property(x => x.Name)
                .IsRequired(true);

            builder.Property(x => x.Code)
                .IsRequired(false);

            builder.Property(x => x.Remark)
                .IsRequired(false);

            builder.HasOne(x => x.AssetType)
                .WithMany(x => x.TypeAssets)
                .HasForeignKey(x => x.AssetTypeId)
                .IsRequired(true);

            builder.HasOne(x => x.CompanyProfile)
                .WithMany(x => x.CompanyAssetInfos)
                .HasForeignKey(x => x.CompanyProfileId)
                .IsRequired(true);
        }
    }
}