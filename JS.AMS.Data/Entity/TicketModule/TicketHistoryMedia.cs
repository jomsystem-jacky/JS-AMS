using JS.AMS.Data.Core.Entity;
using JS.AMS.Data.Entity.Shared;

namespace JS.AMS.Data.Entity.TicketModule
{
    public class TicketHistoryMedia : Auditable
    {
        public Guid TicketHistoryId { get; set; }
        public TicketHistory TicketHistory { get; set; }

        public Guid MediaId { get; set; }
        public Media Media { get; set; }

        public string? Remark { get; set; }
    }
}