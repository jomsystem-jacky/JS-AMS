using JS.AMS.Data.Core.Entity;
using JS.AMS.Data.Entity.Shared.Enum;

namespace JS.AMS.Data.Entity.Shared
{
    public class AuditLog : Auditable
    {
        public string Username { get; set; }
        public string Message { get; set; }
        public LogCategoryEnum LogCategory { get; set; }
    }
}