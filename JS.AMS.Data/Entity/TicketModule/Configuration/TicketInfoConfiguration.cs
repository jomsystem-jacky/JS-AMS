using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.TicketModule.Configuration
{
    public class TicketInfoConfiguration : AuditableConfiguration<TicketInfo>
    {
        public override void Configure(EntityTypeBuilder<TicketInfo> builder)
        {
            base.Configure(builder);
            builder.ToTable("TicketInfo");

            builder.HasOne(x => x.TicketCategory)
                .WithMany()
                .HasForeignKey(x => x.TicketCategoryId)
                .IsRequired(true);

            builder.HasOne(x => x.TicketRaisedByStaff)
                .WithMany(x => x.StaffRaisedTickets)
                .HasForeignKey(x => x.TicketRaisedByStaffId)
                .IsRequired(true);

            builder.Property(x => x.Remark)
                .IsRequired(false);
        }
    }
}
