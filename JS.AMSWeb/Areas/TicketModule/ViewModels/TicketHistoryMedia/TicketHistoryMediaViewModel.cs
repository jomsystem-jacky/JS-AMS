using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;
using JS.AMS.Data.Entity.TicketModule;

namespace JS.AMSWeb.Areas.TicketModule.ViewModels.TicketHistoryMedia
{
	public class TicketHistoryMediaViewModel
    {
        public Guid Id { get; set; }
        public Guid TicketHistoryId { get; set; }
        public TicketHistory TicketHistory { get; set; }

        public Guid MediaId { get; set; }
        //public Media Media { get; set; }

        public string? Remark { get; set; }
    }
}

