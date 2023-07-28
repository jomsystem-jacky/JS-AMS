using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.User
{
    public class AccessInfo : Auditable
    {
        public string Name { get; set; }
        public string Code { get; set; }

        public string? Value { get; set; }
        public string? Remark { get; set; }

        public List<UserAccountAccess> AccessUserAccounts { get; set; } = new List<UserAccountAccess>();
    }
}