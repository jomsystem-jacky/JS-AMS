using JS.AMS.Data.Core.Entity;

namespace JS.AMS.Data.Entity.AssetModule
{
    public class AssetType : Auditable
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string? Remark { get; set; }

        public List<AssetInfo> TypeAssets { get; set; } = new List<AssetInfo>();
    }
}