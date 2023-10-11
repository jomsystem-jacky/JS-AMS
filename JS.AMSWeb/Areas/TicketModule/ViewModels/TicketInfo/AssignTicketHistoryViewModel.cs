using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;
using JS.AMS.Data.Entity.TicketModule;

namespace JS.AMSWeb.Areas.TicketModule.ViewModels.TicketInfo
{
	public class AssignTicketHistoryViewModel
    {
        public Guid TicketInfoId { get; set; }
        public Guid TicketStatusId { get; set; }
        public string? Remark { get; set; }
        
        public string? OtherDescription { get; set; }
    }
}

