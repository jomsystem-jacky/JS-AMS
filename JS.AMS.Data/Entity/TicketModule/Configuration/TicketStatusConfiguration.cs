using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.TicketModule.Configuration
{
    public class TicketStatusConfiguration : AuditableConfiguration<TicketStatus>
    {
        public override void Configure(EntityTypeBuilder<TicketStatus> builder)
        {
            base.Configure(builder);
            builder.ToTable("TicketStatus");

            builder.Property(x => x.Name)
                .IsRequired(true);

            builder.Property(x => x.Code)
                .IsRequired(true);

            builder.Property(x => x.Remark)
                .IsRequired(false);
        }
    }
}
