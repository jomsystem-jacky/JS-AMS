using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;
using JS.AMS.Data.Entity.TicketModule;

namespace JS.AMSWeb.Areas.TicketModule.ViewModels.TicketInfo
{
    public class ManageTicketInfoViewModel
    {
        public Guid Id { get; set; }
        public Guid CompanyProfileId { get; set; }
        public Guid TicketCategoryId { get; set; }
        public Guid TicketRaisedByStaffId { get; set; }
        public string? Remark { get; set; }
        public string? OtherDescription { get; set; }
        public List<IFormFile> Files { get; set; } = new List<IFormFile>();
    }
}

