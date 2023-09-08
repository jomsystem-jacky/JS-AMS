using JS.AMS.Data.Core;
using JS.AMS.Data.Entity.User;
using JS.AMS.Data.Entity.CompanyModule;
using JS.AMS.Data.Entity.InspectionModule;
using JS.AMS.Data.Entity.AssetModule;
using Microsoft.EntityFrameworkCore;
using System;

namespace JS.AMS.Data
{
    public class AMSDbContext : BaseDbContext
    {
        public AMSDbContext(DbContextOptions options) : base(options)
        {

        }

        //Asset Module
        public DbSet<AssetCondition> AssetConditions { get; set; }
        public DbSet<AssetInfo> AssetInfos { get; set; }
        public DbSet<AssetInspectionInfoHistory> AssetInspectionInfoHistories { get; set; }
        public DbSet<AssetLocationHistory> AssetLocationHistories { get; set; }
        public DbSet<AssetType> AssetTypes { get; set; }
        public DbSet<SpecificationType> SpecificationTypes { get; set; }

        //Company Module
        public DbSet<CompanyProfile> CompanyProfiles { get; set; }
        public DbSet<CompanyBranch> CompanyBranches { get; set; }
        public DbSet<LocationTag> LocationTags { get; set; }
        public DbSet<Staff> Staff { get; set; }

        //Inspection Module
        public DbSet<InspectionCase> InspectionCases { get; set; }

        //User Module
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
