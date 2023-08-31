using JS.AMS.Data.Core.Entity;
using JS.AMS.Data.Entity.AssetModule;

namespace JS.AMS.Data.Entity.CompanyModule
{
    public class Staff : Auditable
    {
        public string Name { get; set; }
        public string? EmployeeId { get; set; }
        public string? PhoneNumber { get; set; }

        public Guid CompanyProfileId { get; set; }
        public CompanyProfile CompanyProfile { get; set; }

        public Guid? LocationTagId { get; set; }
        public LocationTag LocationTag { get; set; }

        public List<AssetLocationHistory> AssignedStaffAssetLocationHistories { get; set; } = new List<AssetLocationHistory>();
    }
}