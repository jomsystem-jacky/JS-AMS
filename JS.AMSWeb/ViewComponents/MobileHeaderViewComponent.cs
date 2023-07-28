using Microsoft.AspNetCore.Mvc;

namespace JS.AMSWeb.ViewComponents
{
    public class MobileHeaderViewComponent : ViewComponent
    {
        public MobileHeaderViewComponent()
        {
            
        }
        public IViewComponentResult Invoke()
        {
            return View();
        }

    }
}
