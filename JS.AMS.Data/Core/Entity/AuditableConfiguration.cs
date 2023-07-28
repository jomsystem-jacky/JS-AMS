using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JS.AMS.Data.Core.Entity
{
    public abstract class AuditableConfiguration<T> : IEntityTypeConfiguration<T> where T : Auditable
    {
        public virtual void Configure(EntityTypeBuilder<T> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.CreatedAt)
                .IsRequired();

            builder.Property(x => x.CreatedBy)
                .HasMaxLength(150)
                .IsRequired();

            builder.Property(x => x.UpdatedAt)
                .IsRequired(false);

            builder.Property(x => x.UpdatedBy)
                .HasMaxLength(150)
                .IsRequired(false);

            builder.Property(x => x.DeletedAt)
                .IsRequired(false);

            builder.Property(x => x.DeletedBy)
                .HasMaxLength(50)
                .IsRequired(false);

            builder.Property(x => x.IsDeleted)
                .IsRequired();

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd()
                .IsRequired();

            builder.Property(x => x.Timestamp)
                .IsRowVersion();
        }

    }
}
