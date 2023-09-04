using System;
using JS.AMS.Data.Entity.AssetModule;
using JS.AMS.Data.Entity.CompanyModule;

namespace JS.AMSWeb.Areas.AssetModule.ViewModels.SpecificationType
{
	public class SpecificationTypePageViewModel
    {
        public X.PagedList.IPagedList<SpecificationTypeViewModel> Listing { get; set; }
        public SpecificationTypeViewModel AddSpecificationTypeDTO { get; set; }
    }
}

