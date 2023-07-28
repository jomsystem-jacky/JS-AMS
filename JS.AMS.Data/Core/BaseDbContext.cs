using JS.AMS.Data.Core.Abstractions;
using JS.AMS.Data.Entity.User;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Linq.Expressions;
using System.Reflection;

namespace JS.AMS.Data.Core
{
    public class BaseDbContext : IdentityDbContext<UserAccount>
    {
        private const string IsDeletedProperty = "IsDeleted";
        private static readonly MethodInfo PropertyMethod;

        protected BaseDbContext(DbContextOptions options)
          : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
            {
                if (typeof(IDeleted).IsAssignableFrom(entityType.ClrType))
                    modelBuilder.Entity(entityType.ClrType).HasQueryFilter(GetIsDeletedRestriction(entityType.ClrType));
            }
            base.OnModelCreating(modelBuilder);
        }

        private static LambdaExpression GetIsDeletedRestriction(Type type)
        {
            ParameterExpression parameterExpression = Expression.Parameter(type, "it");
            return Expression.Lambda(Expression.MakeBinary(ExpressionType.Equal, Expression.Call(PropertyMethod, parameterExpression, Expression.Constant("IsDeleted")), Expression.Constant(false)), parameterExpression);
        }

        public int SaveChanges(string username)
        {
            ChangeTracker.DetectChanges();
            foreach (EntityEntry entityEntry in ChangeTracker.Entries().Where<EntityEntry>(x => x.State == EntityState.Added))
            {
                if (entityEntry.Entity is ICreated entity)
                {
                    entity.CreatedAt = DateTime.UtcNow;
                    entity.CreatedBy = username;
                }

                if (entityEntry.Entity is IActive activeEntity)
                {
                    activeEntity.Active = true;
                }
            }
            foreach (EntityEntry entityEntry in ChangeTracker.Entries().Where<EntityEntry>(x => x.State == EntityState.Modified))
            {
                if (entityEntry.Entity is IUpdated entity)
                {
                    entity.UpdatedAt = new DateTime?(DateTime.UtcNow);
                    entity.UpdatedBy = username;
                }
            }
            foreach (EntityEntry entityEntry in ChangeTracker.Entries().Where<EntityEntry>(x => x.State == EntityState.Deleted))
            {
                if (entityEntry.Entity is IDeleted entity)
                {
                    entityEntry.State = EntityState.Unchanged;
                    entity.IsDeleted = true;
                    entity.DeletedAt = new DateTime?(DateTime.UtcNow);
                    entity.DeletedBy = username;
                }
            }
            return SaveChanges();
        }

        public async Task<int> SaveChangesAsync(
          string username,
          CancellationToken cancellationToken = default)
        {
            BaseDbContext baseDbContext = this;
            baseDbContext.ChangeTracker.DetectChanges();
            foreach (EntityEntry entityEntry in baseDbContext.ChangeTracker.Entries().Where<EntityEntry>(x => x.State == EntityState.Added))
            {
                if (entityEntry.Entity is ICreated entity)
                {
                    entity.CreatedAt = DateTime.UtcNow;
                    entity.CreatedBy = username;
                }

                if (entityEntry.Entity is IActive activeEntity)
                {
                    activeEntity.Active = true;
                }
            }
            foreach (EntityEntry entityEntry in baseDbContext.ChangeTracker.Entries().Where<EntityEntry>(x => x.State == EntityState.Modified))
            {
                if (entityEntry.Entity is IUpdated entity)
                {
                    entity.UpdatedAt = new DateTime?(DateTime.UtcNow);
                    entity.UpdatedBy = username;
                }
            }
            foreach (EntityEntry entityEntry in baseDbContext.ChangeTracker.Entries().Where<EntityEntry>(x => x.State == EntityState.Deleted))
            {
                if (entityEntry.Entity is IDeleted entity)
                {
                    entityEntry.State = EntityState.Unchanged;
                    entity.IsDeleted = true;
                    entity.DeletedAt = new DateTime?(DateTime.UtcNow);
                    entity.DeletedBy = username;
                }
            }
            return await baseDbContext.SaveChangesAsync(cancellationToken);
        }

        static BaseDbContext()
        {
            MethodInfo method = typeof(EF).GetMethod("Property", BindingFlags.Static | BindingFlags.Public);
            MethodInfo methodInfo;
            if ((object)method == null)
                methodInfo = null;
            else
                methodInfo = method.MakeGenericMethod(typeof(bool));
            PropertyMethod = methodInfo;
        }
    }
}
