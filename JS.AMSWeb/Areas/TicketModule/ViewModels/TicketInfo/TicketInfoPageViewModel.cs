using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;
using JS.AMSWeb.Areas.TicketModule.ViewModels.TicketStatus;

namespace JS.AMSWeb.Areas.TicketModule.ViewModels.TicketInfo
{
	public class TicketInfoPageViewModel
    {
        public X.PagedList.IPagedList<TicketInfoViewModel> Listing { get; set; }
        public AddTicketInfoViewModel AddTicketInfoDTO { get; set; }

        //public List<AssetInfo> CompanyAssetInfos { get; set; } = new List<AssetInfo>();
        //public List<Staff> CompanyStaffs { get; set; } = new List<Staff>();
        //public List<CompanyBranch> CompanyBranches { get; set; } = new List<CompanyBranch>();
        //public List<LocationTag> CompanyLocationTags { get; set; } = new List<LocationTag>();
    }
}

