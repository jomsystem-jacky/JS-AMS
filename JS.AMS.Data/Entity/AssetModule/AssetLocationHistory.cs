using JS.AMS.Data.Core.Entity;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMS.Data.Entity.AssetModule
{
    public class AssetLocationHistory : Auditable
    {
        public Guid AssetInfoId { get; set; }
        public AssetInfo AssetInfo { get; set; }

        public Guid LocationTagId { get; set; }
        public LocationTag LocationTag { get; set; }

        public DateTime? AssignedDate { get; set; }
        public DateTime? ReturnedDate { get; set; }

        public Guid AssignedByStaffId { get; set; }
        public Staff? AssignedByStaff { get; set; }
    }
}