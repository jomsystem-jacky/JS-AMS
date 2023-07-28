using JS.AMS.Data.Core;
using JS.AMS.Data.Entity.User;
using Microsoft.EntityFrameworkCore;
using System;

namespace JS.AMS.Data
{
    public class AMSDbContext : BaseDbContext
    {
        public AMSDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<UserAccount> UserAccounts { get; set; }
        public DbSet<UserAccountAccess> UserAccountAccesses { get; set; }
        public DbSet<AccessInfo> AccessInfos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //use the custom configuration of each entity
            modelBuilder.ApplyConfigurationsFromAssembly(this.GetType().Assembly, (Func<Type, bool>)null);

            //bulk update the delete behavior
            //foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            //{
            //    relationship.DeleteBehavior = DeleteBehavior.NoAction;
            //}
        }
    }
}
