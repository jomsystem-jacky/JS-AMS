using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMSWeb.Areas.CompanyModule.ViewModels.CompanyBranch
{
	public class AddCompanyBranchViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string FullAddress { get; set; }
        public string? BranchContactPersonName { get; set; }
        public string? BranchContactPersonPhoneNumber { get; set; }

        public Guid CompanyProfileId { get; set; }

        public Guid? LocationTagId { get; set; }
       
    }
}

