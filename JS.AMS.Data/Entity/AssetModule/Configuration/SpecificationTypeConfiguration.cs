using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.AssetModule.Configuration
{
    public class SpecificationTypeConfiguration : AuditableConfiguration<SpecificationType>
    {
        public override void Configure(EntityTypeBuilder<SpecificationType> builder)
        {
            base.Configure(builder);
            builder.ToTable("SpecificationType");

            builder.Property(x => x.Name)
                .IsRequired(true);

            builder.Property(x => x.Code)
                .IsRequired(true);

            builder.Property(x => x.Remark)
                .IsRequired(false);

            builder.Property(x => x.AcceptanceLevel)
                .IsRequired(false);
        }
    }
}
