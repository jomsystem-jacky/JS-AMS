using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.TicketModule.Configuration
{
    public class TicketHistoryConfiguration : AuditableConfiguration<TicketHistory>
    {
        public override void Configure(EntityTypeBuilder<TicketHistory> builder)
        {
            base.Configure(builder);
            builder.ToTable("TicketHistory");

            builder.HasOne(x => x.TicketInfo)
                .WithMany(x => x.TicketHistories)
                .HasForeignKey(x => x.TicketInfoId)
                .IsRequired(true);

            builder.HasOne(x => x.TicketStatus)
                .WithMany()
                .HasForeignKey(x => x.TicketStatusId)
                .IsRequired(true);

            builder.Property(x => x.Remark)
                .IsRequired(false);

            builder.Property(x => x.OtherDescription)
                .IsRequired(false);
        }
    }
}
