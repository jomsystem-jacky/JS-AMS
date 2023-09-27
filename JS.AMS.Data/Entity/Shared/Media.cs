using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JS.AMS.Data.Core.Entity;
using JS.AMS.Data.Entity.Shared.Enum;
using JS.AMS.Data.Entity.TicketModule;

namespace JS.AMS.Data.Entity.Shared
{
    public class Media : Auditable
    {
        public string Name { get; set; }
        public string Url { get; set; }
        public MediaTypeEnum MediaType { get; set; }

        public List<TicketHistoryMedia> MediaTicketHistories { get; set; } = new List<TicketHistoryMedia>();
    }
}
