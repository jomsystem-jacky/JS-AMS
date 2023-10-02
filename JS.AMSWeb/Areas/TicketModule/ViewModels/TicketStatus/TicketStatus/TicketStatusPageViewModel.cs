using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;
using JS.AMSWeb.Areas.TicketModule.ViewModels.TicketStatus;

namespace JS.AMSWeb.Areas.TicketModule.ViewModels.TicketStatus
{
	public class TicketStatusPageViewModel
    {
        public X.PagedList.IPagedList<TicketStatusViewModel> Listing { get; set; }
        public AddTicketStatusViewModel AddTicketStatusDTO { get; set; }

        //public List<AssetInfo> CompanyAssetInfos { get; set; } = new List<AssetInfo>();
        //public List<Staff> CompanyStaffs { get; set; } = new List<Staff>();
        //public List<CompanyBranch> CompanyBranches { get; set; } = new List<CompanyBranch>();
        //public List<LocationTag> CompanyLocationTags { get; set; } = new List<LocationTag>();
    }
}

