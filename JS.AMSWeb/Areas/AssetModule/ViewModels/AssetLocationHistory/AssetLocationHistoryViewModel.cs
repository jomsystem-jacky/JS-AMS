using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMSWeb.Areas.AssetModule.ViewModels.AssetLocationHistory
{
    public class AssetLocationHistoryViewModel
    {
        public Guid AssetInfoId { get; set; }
        public string AssetInfoName { get; set; }
        public Guid LocationTagId { get; set; }

        public string LocationTagName { get; set; }

        public DateTime? AssignedDate { get; set; }
        public DateTime? ReturnedDate { get; set; }

        public Guid AssignedByStaffId { get; set; }

        public string AssignedByStaffName { get;  set; }

    }
}

