using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;
using JS.AMS.Data.Entity.TicketModule;

namespace JS.AMSWeb.Areas.TicketModule.ViewModels.TicketHistory
{
    public class ManageTicketHistoryViewModel
    {
        public Guid TicketInfoId { get; set; }
        public Guid TicketStatusId { get; set; }
        public string? Remark { get; set; }
        public string? OtherDescription { get; set; }
    }
}

