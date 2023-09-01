using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMSWeb.Areas.CompanyModule.ViewModels.CompanyProfile
{
	public class ManageCompanyProfileViewModel
	{
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? BRN { get; set; }
        public string FullAddress { get; set; }
        public string ContactPersonName { get; set; }
        public string ContactPersonPhoneNumber { get; set; }

        //public List<AssetInfo> CompanyAssetInfos { get; set; } = new List<AssetInfo>();
        //public List<Staff> CompanyStaffs { get; set; } = new List<Staff>();
        //public List<CompanyBranch> CompanyBranches { get; set; } = new List<CompanyBranch>();
        //public List<LocationTag> CompanyLocationTags { get; set; } = new List<LocationTag>();
    }
}

