namespace JS.AMSWeb.Services.SendGrid.ViewModel
{
    public class NewRealflexApplicationViewModel
    {
        public string RecipientEmail { get; set; }
        public string RecipientName { get; set; }

        public string LoanAmount { get; set; }
        public string TenureInMonth { get; set; }
        public string IncomeSource { get; set; }
        public string PropertyAddress { get; set; } = "";
        public string PropertyImage { get; set; } = "";
    }
}
