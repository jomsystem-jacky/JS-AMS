using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.TicketModule.Configuration
{
    public class TicketHistoryMediaConfiguration : AuditableConfiguration<TicketHistoryMedia>
    {
        public override void Configure(EntityTypeBuilder<TicketHistoryMedia> builder)
        {
            base.Configure(builder);
            builder.ToTable("TicketHistoryMedia");

            builder.HasOne(x => x.TicketHistory)
                .WithMany(x => x.TicketHistoryMedias)
                .HasForeignKey(x => x.TicketHistoryId)
                .IsRequired(true);

            builder.HasOne(x => x.Media)
                .WithMany(x => x.MediaTicketHistories)
                .HasForeignKey(x => x.MediaId)
                .IsRequired(true);

            builder.Property(x => x.Remark)
                .IsRequired(false);
        }
    }
}
