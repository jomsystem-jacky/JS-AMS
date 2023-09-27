using JS.AMS.Data.Core.Entity;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.TicketModule;
using JS.AMS.Data.Entity.User;

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

        public string UserAccountId { get; set; }
        public UserAccount UserAccount { get; set; }

        public List<AssetLocationHistory> AssignedStaffAssetLocationHistories { get; set; } = new List<AssetLocationHistory>();
        public List<TicketInfo> StaffRaisedTickets { get; set; } = new List<TicketInfo>();
    }
}