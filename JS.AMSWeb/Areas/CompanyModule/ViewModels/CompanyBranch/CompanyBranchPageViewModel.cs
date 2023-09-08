using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;
using JS.AMSWeb.Areas.CompanyModule.ViewModels.CompanyBranch;

namespace JS.AMSWeb.Areas.CompanyModule.ViewModels.CompanyBranch
{
	public class CompanyBranchPageViewModel
    {
        public X.PagedList.IPagedList<CompanyBranchViewModel> Listing { get; set; }
        public AddCompanyBranchViewModel AddCompanyBranchDTO { get; set; }

        //public List<AssetInfo> CompanyAssetInfos { get; set; } = new List<AssetInfo>();
        //public List<Staff> CompanyStaffs { get; set; } = new List<Staff>();
        //public List<CompanyBranch> CompanyBranches { get; set; } = new List<CompanyBranch>();
        //public List<LocationTag> CompanyLocationTags { get; set; } = new List<LocationTag>();
    }
}

