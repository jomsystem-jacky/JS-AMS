namespace JS.AMSWeb.Services.SendGrid.ViewModel
{
    public class EventReceiptViewModel
    {
        public string PurchasedTime { get; set; }
        public string CustomerUsername { get; set; }
        public string CustomerEmail { get; set; }
        public string TicketNumber { get; set; }
        public string TicketName { get; set; }
        public string PurchaseQuantity { get; set; }
        public string TicketPricing { get; set; }
        public string TotalPrice { get; set; }
    }
}
