using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;
using JS.AMS.Data.Entity.TicketModule;

namespace JS.AMSWeb.Areas.TicketModule.ViewModels.TicketHistory
{
	public class TicketHistoryViewModel
    {
        public Guid TicketInfoId { get; set; }
        public Guid TicketStatusId { get; set; }
        public Guid TicketCategoryId { get; set; }
        public string TicketInfoName { get; set; }
        public string TicketCategoryName { get; set; }
        public string TicketStatusName { get; set; }
        public string? Remark { get; set; }
        public string? OtherDescription { get; set; }
    }
}

