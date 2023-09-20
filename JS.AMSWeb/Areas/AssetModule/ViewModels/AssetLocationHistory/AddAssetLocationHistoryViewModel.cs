using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMSWeb.Areas.AssetModule.ViewModels.AssetLocationHistory
{
    public class AddAssetLocationHistoryViewModel
    {
        public Guid AssetInfoId { get; set; }

        public Guid LocationTagId { get; set; }


        public DateTime? AssignedDate { get; set; }
        public DateTime? ReturnedDate { get; set; }

        public Guid AssignedByStaffId { get; set; }
    }
}

