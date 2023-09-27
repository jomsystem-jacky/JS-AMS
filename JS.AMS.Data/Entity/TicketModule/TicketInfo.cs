using JS.AMS.Data.Core.Entity;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMS.Data.Entity.TicketModule
{
    public class TicketInfo : Auditable
    {
        public Guid TicketCategoryId { get; set; }
        public TicketCategory TicketCategory { get; set; }

        public Guid TicketRaisedByStaffId { get; set; }
        public Staff TicketRaisedByStaff { get; set; }

        public string? Remark { get; set; }

        public List<TicketHistory> TicketHistories { get; set; } = new List<TicketHistory>();
    }
}