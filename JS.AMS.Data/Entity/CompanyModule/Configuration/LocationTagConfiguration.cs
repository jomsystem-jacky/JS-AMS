using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.CompanyModule.Configuration
{
    public class LocationTagConfiguration : AuditableConfiguration<LocationTag>
    {
        public override void Configure(EntityTypeBuilder<LocationTag> builder)
        {
            base.Configure(builder);
            builder.ToTable("LocationTag");

            builder.Property(x => x.Name)
                .IsRequired(true);

            builder.Property(x => x.Code)
                .IsRequired(true);

            builder.Property(x => x.Remark)
                .IsRequired(false);

            builder.HasOne(x => x.CompanyProfile)
                .WithMany(x => x.CompanyLocationTags)
                .HasForeignKey(x => x.CompanyProfileId)
                .IsRequired(true);
        }
    }
}
