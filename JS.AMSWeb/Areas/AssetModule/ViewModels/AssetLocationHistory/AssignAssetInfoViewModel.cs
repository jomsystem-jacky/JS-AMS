using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMSWeb.Areas.AssetModule.ViewModels.AssetLocationHistory
{
    public class AssignAssetInfoViewModel
    {
        public Guid LocationTagId { get; set; }
        public Guid AssetInfoId { get; set; }
        public string AssetInfoName { get; set; }
        public DateTime AssignDate { get; set; }
        public Guid AssignByStaffId { get; set; }
    }
}

