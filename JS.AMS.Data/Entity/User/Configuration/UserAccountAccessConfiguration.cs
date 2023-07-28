using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.User.Configuration
{
    public class UserAccountAccessConfiguration : AuditableConfiguration<UserAccountAccess>
    {
        public override void Configure(EntityTypeBuilder<UserAccountAccess> builder)
        {
            base.Configure(builder);
            builder.ToTable("UserAccountAccess");

            builder.HasOne(x => x.UserAccount)
                .WithMany(x => x.UserAccountAccesses)
                .HasForeignKey(x => x.UserAccountId)
                .IsRequired(true)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(x => x.AccessInfo)
                .WithMany(x => x.AccessUserAccounts)
                .HasForeignKey(x => x.AccessInfoId)
                .IsRequired(true)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}