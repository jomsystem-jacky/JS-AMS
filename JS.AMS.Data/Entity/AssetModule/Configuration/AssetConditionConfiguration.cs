using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.AssetModule.Configuration
{
    public class AssetConditionConfiguration : AuditableConfiguration<AssetCondition>
    {
        public override void Configure(EntityTypeBuilder<AssetCondition> builder)
        {
            base.Configure(builder);
            builder.ToTable("AssetCondition");

            builder.Property(x => x.Name)
                .IsRequired(true);

            builder.Property(x => x.Code)
                .IsRequired(true);

            builder.Property(x => x.Remark)
                .IsRequired(false);
        }
    }
}
