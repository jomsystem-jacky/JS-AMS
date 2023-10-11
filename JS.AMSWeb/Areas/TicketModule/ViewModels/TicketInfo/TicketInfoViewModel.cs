using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;
using JS.AMS.Data.Entity.TicketModule;

namespace JS.AMSWeb.Areas.TicketModule.ViewModels.TicketInfo
{
	public class TicketInfoViewModel
    {
        public string CoverPhotoUrl { get; set; }

        public string? Remark { get; set; }

        public Guid Id { get; set; }

        public Guid CoverPhotoId { get; set; }

        public string CompanyName { get; set; }
        
        public Guid TicketCategoryId { get; set; }
        public string TicketCategoryName { get; set; }
        
        public Guid TicketRaisedByStaffId { get; set; }
        public string TicketRaisedByStaffName { get; set; }

        public string CurrentTicketStatus { get; set; }

        //public List<TicketHistory> TicketHistories { get; set; } = new List<TicketHistory>();
    }
}

