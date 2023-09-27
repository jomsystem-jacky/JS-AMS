using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.Shared.Configuration
{
    public class AuditLogConfiguration : AuditableConfiguration<AuditLog>
    {
        public override void Configure(EntityTypeBuilder<AuditLog> builder)
        {
            base.Configure(builder);
            builder.ToTable("AuditLog");

            builder.Property(x => x.Message)
                .IsRequired(true);

            builder.Property(x => x.Username)
                .HasMaxLength(100)
                .IsRequired(false);

            builder.Property(x => x.LogCategory)
               .IsRequired(true);
        }
    }
}
