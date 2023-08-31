using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.InspectionModule.Configuration
{
    public class InspectionCaseConfiguration : AuditableConfiguration<InspectionCase>
    {
        public override void Configure(EntityTypeBuilder<InspectionCase> builder)
        {
            base.Configure(builder);
            builder.ToTable("InspectionCase");

            builder.Property(x => x.CaseId)
                .IsRequired(true);

            builder.Property(x => x.InspectionDate)
                .IsRequired(true);

            builder.Property(x => x.Remark)
                .IsRequired(false);
        }
    }
}
