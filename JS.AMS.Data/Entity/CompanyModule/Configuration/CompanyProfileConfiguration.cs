using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.CompanyModule.Configuration
{
    public class CompanyProfileConfiguration : AuditableConfiguration<CompanyProfile>
    {
        public override void Configure(EntityTypeBuilder<CompanyProfile> builder)
        {
            base.Configure(builder);
            builder.ToTable("CompanyProfile");

            builder.Property(x => x.Name)
                .IsRequired(true);

            builder.Property(x => x.BRN)
                .IsRequired(false);

            builder.Property(x => x.FullAddress)
                .IsRequired(true);

            builder.Property(x => x.ContactPersonName)
                .IsRequired(true);

            builder.Property(x => x.ContactPersonPhoneNumber)
                .IsRequired(true);
        }
    }
}
