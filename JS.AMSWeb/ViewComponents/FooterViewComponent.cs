using Microsoft.AspNetCore.Mvc;

namespace JS.AMSWeb.ViewComponents
{
    public class FooterViewComponent : ViewComponent
    {
        public FooterViewComponent()
        {
        }
        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}
