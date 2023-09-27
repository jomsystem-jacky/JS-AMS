using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.TicketModule
{
    public class TicketHistory : Auditable
    {
        public Guid TicketInfoId { get; set; }
        public TicketInfo TicketInfo { get; set; }

        public Guid TicketStatusId { get; set; }
        public TicketStatus TicketStatus { get; set; }

        public string? Remark { get; set; }
        public string? OtherDescription { get; set; }

        public List<TicketHistoryMedia> TicketHistoryMedias { get; set; } = new List<TicketHistoryMedia>();
    }
}