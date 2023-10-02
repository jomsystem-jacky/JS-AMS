using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;
using JS.AMS.Data.Entity.TicketModule;

namespace JS.AMSWeb.Areas.TicketModule.ViewModels.TicketStatus
{
	public class AddTicketStatusViewModel
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string? Remark { get; set; }

    }
}

