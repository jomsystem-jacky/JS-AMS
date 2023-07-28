
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace JS.AMS.Data
{
    public class AMSDbContextFactory : IDesignTimeDbContextFactory<AMSDbContext>
    {
        public AMSDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<AMSDbContext>();

            builder.UseSqlServer(@"Server=jsams.database.windows.net,1433;Initial Catalog=ams;Persist Security Info=False;User ID=jsmas@jomsystem@jsams;Password=Jom5ys@33AMS#888;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;",
            optionsBuilder => optionsBuilder.MigrationsAssembly(typeof(AMSDbContext).GetTypeInfo().Assembly.GetName().Name));

            //builder.UseMySql("server=159.138.85.25;port=3306;database=Wowlistix;user=root;password=Lovesgsb#11#", 
            //    new MySqlServerVersion(new Version(8, 0, 27)), optionsBuilder => optionsBuilder.MigrationsAssembly(typeof(WowlistixDbContext).GetTypeInfo().Assembly.GetName().Name));

            return new AMSDbContext(builder.Options);
        }
    }
}