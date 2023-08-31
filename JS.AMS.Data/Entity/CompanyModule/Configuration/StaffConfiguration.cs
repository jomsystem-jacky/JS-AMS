using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.CompanyModule.Configuration
{
    public class StaffConfiguration : AuditableConfiguration<Staff>
    {
        public override void Configure(EntityTypeBuilder<Staff> builder)
        {
            base.Configure(builder);
            builder.ToTable("Staff");

            builder.Property(x => x.Name)
                .IsRequired(true);

            builder.Property(x => x.EmployeeId)
                .IsRequired(false);

            builder.Property(x => x.PhoneNumber)
                .IsRequired(false);

            builder.HasOne(x => x.CompanyProfile)
                .WithMany(x => x.CompanyStaffs)
                .HasForeignKey(x => x.CompanyProfileId)
                .IsRequired(true);

            builder.HasOne(x => x.LocationTag)
                .WithMany(x => x.LocationTagStaffs)
                .HasForeignKey(x => x.LocationTagId)
                .IsRequired(false);
        }
    }
}
