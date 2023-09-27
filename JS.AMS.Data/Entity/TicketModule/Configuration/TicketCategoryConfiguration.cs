using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.TicketModule.Configuration
{
    public class TicketCategoryConfiguration : AuditableConfiguration<TicketCategory>
    {
        public override void Configure(EntityTypeBuilder<TicketCategory> builder)
        {
            base.Configure(builder);
            builder.ToTable("TicketCategory");

            builder.Property(x => x.Name)
                .IsRequired(true);

            builder.Property(x => x.Code)
                .IsRequired(true);

            builder.Property(x => x.Remark)
                .IsRequired(false);
        }
    }
}
