using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.AssetModule.Configuration
{
    public class AssetTypeConfiguration : AuditableConfiguration<AssetType>
    {
        public override void Configure(EntityTypeBuilder<AssetType> builder)
        {
            base.Configure(builder);
            builder.ToTable("AssetType");

            builder.Property(x => x.Name)
                .IsRequired(true);

            builder.Property(x => x.Code)
                .IsRequired(true);

            builder.Property(x => x.Remark)
                .IsRequired(false);
        }
    }
}
