using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JS.AMS.Data.Entity.User.Configuration
{
    public class UserAccountConfiguration : IEntityTypeConfiguration<UserAccount>
    {
        public virtual void Configure(EntityTypeBuilder<UserAccount> builder)
        {
            builder.ToTable("UserAccount");

            builder.HasAlternateKey(x => x.Count);

            builder.Property(x => x.FirstName)
                .HasMaxLength(150)
                .IsRequired(false);

            builder.Property(x => x.LastName)
                .HasMaxLength(150)
                .IsRequired(false);

            builder.Property(x => x.Nickname)
                .HasMaxLength(150)
                .IsRequired(false);

            builder.Property(x => x.IcPassport)
                .HasMaxLength(150)
                .IsRequired(false);

            builder.Property(x => x.CreatedAt)
                .IsRequired();

            builder.Property(x => x.IsActive)
                .IsRequired(true);

            builder.Property(x => x.IsDeleted)
                .IsRequired(true);
        }
    }
}
