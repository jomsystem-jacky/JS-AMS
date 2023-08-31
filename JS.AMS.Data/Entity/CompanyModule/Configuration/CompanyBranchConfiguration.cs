using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.CompanyModule.Configuration
{
    public class CompanyBranchConfiguration : AuditableConfiguration<CompanyBranch>
    {
        public override void Configure(EntityTypeBuilder<CompanyBranch> builder)
        {
            base.Configure(builder);
            builder.ToTable("CompanyBranch");

            builder.Property(x => x.Name)
                .IsRequired(true);

            builder.Property(x => x.FullAddress)
                .IsRequired(true);

            builder.Property(x => x.BranchContactPersonName)
                .IsRequired(false);

            builder.Property(x => x.BranchContactPersonPhoneNumber)
                .IsRequired(false);

            builder.HasOne(x => x.CompanyProfile)
                .WithMany(x => x.CompanyBranches)
                .HasForeignKey(x => x.CompanyProfileId)
                .IsRequired(true);

            builder.HasOne(x => x.LocationTag)
                .WithMany(x => x.LocationTagCompanyBranches)
                .HasForeignKey(x => x.LocationTagId)
                .IsRequired(false);
        }
    }
}