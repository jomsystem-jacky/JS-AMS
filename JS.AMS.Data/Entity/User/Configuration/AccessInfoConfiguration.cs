using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.User.Configuration
{
    public class AccessInfoConfiguration : AuditableConfiguration<AccessInfo>
    {
        public override void Configure(EntityTypeBuilder<AccessInfo> builder)
        {
            base.Configure(builder);
            builder.ToTable("AccessInfo");

            builder.Property(x => x.Name)
                .IsRequired(true);

            builder.Property(x => x.Code)
                .IsRequired(true);

            builder.Property(x => x.Value)
                .IsRequired(false);

            builder.Property(x => x.Remark)
                .IsRequired(false);
        }
    }
}
