using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;
using JS.AMS.Data.Entity.User;

namespace JS.AMSWeb.Areas.CompanyModule.ViewModels.Staff
{
	public class ManageStaffViewModel
	{
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? EmployeeId { get; set; }
        public string? PhoneNumber { get; set; }
        public Guid CompanyProfileId { get; set; }

        public bool IsBindedAccount { get; set; }
        public string BindedAccountUsername { get; set; }
        public string BindNewAccountUsername { get; set; }

        public Guid? LocationTagId { get; set; }
        public List<AssetLocationHistory> AssignedStaffAssetLocationHistories { get; set; } = new List<AssetLocationHistory>();
    }
}

