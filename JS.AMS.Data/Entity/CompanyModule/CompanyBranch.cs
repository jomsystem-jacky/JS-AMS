using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.CompanyModule
{
    public class CompanyBranch : Auditable
    {
        public string Name { get; set; }
        public string FullAddress { get; set; }
        public string? BranchContactPersonName { get; set; }
        public string? BranchContactPersonPhoneNumber { get; set; }

        public Guid CompanyProfileId { get; set; }
        public CompanyProfile CompanyProfile { get; set; }

        public Guid? LocationTagId { get; set; }
        public LocationTag LocationTag { get; set; }
    }
}