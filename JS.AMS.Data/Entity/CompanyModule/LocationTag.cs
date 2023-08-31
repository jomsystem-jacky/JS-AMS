using JS.AMS.Data.Core.Entity;
using JS.AMS.Data.Entity.AssetModule;

namespace JS.AMS.Data.Entity.CompanyModule
{
    public class LocationTag : Auditable
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string? Remark { get; set; }

        public Guid CompanyProfileId { get; set; }
        public CompanyProfile CompanyProfile { get; set; }

        public List<CompanyBranch> LocationTagCompanyBranches { get; set; } = new List<CompanyBranch>();
        public List<Staff> LocationTagStaffs { get; set; } = new List<Staff>();
        public List<AssetLocationHistory> LocationAssetHistories { get; set; } = new List<AssetLocationHistory>();
    }
}