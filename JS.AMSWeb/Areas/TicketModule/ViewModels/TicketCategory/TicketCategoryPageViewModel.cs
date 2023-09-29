using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;
using JS.AMSWeb.Areas.TicketModule.ViewModels.TicketStatus;

namespace JS.AMSWeb.Areas.TicketModule.ViewModels.TicketCategory
{
	public class TicketCategoryPageViewModel
    {
        public X.PagedList.IPagedList<TicketCategoryViewModel> Listing { get; set; }
        public AddTicketCategoryViewModel AddTicketCategoryDTO { get; set; }

        //public List<AssetInfo> CompanyAssetInfos { get; set; } = new List<AssetInfo>();
        //public List<Staff> CompanyStaffs { get; set; } = new List<Staff>();
        //public List<CompanyBranch> CompanyBranches { get; set; } = new List<CompanyBranch>();
        //public List<LocationTag> CompanyLocationTags { get; set; } = new List<LocationTag>();
    }
}

