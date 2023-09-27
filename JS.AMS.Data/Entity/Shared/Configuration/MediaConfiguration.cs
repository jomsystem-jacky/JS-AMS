using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.Shared.Configuration
{
    public class MediaConfiguration : AuditableConfiguration<Media>
    {
        public override void Configure(EntityTypeBuilder<Media> builder)
        {
            base.Configure(builder);
            builder.ToTable("Media");

            builder.Property(x => x.Name)
                .HasMaxLength(100)
                .IsRequired(false);

            builder.Property(x => x.Url)
                .HasMaxLength(500)
                .IsRequired(true);

            builder.Property(x => x.MediaType)
                .IsRequired(true);
        }
    }
}
