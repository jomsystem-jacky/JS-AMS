using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMSWeb.Areas.CompanyModule.ViewModels.Staff
{
	public class ManageStaffViewModel
	{
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? EmployeeId { get; set; }
        public string? PhoneNumber { get; set; }
        public Guid CompanyProfileId { get; set; }

        public Guid? LocationTagId { get; set; }
        public List<AssetLocationHistory> AssignedStaffAssetLocationHistories { get; set; } = new List<AssetLocationHistory>();
    }
}

