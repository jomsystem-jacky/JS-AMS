using JS.AMSWeb.Services.SendGrid.ViewModel;

namespace JS.AMSWeb.Services.SendGrid
{
    public interface ISendGridEmailService
    {
        Task SendTestEmail();
        Task SendResetPasswordEmail(string recipientEmail, string recipientName);
        Task SendSuccessfullyRegEmail(string recipientEmail, string recipientName, string giftName, string address);
        Task SendAppointmentEmail(string recipientEmail, string recipientName, string dateTime);
        Task SendEventReceipt(string recipientEmail, string recipientName, EventReceiptViewModel vm);
        Task SendRealflexStatus(RealFlexEmailViewModel vm);
        Task SendNewRealflexApplicationNotification(NewRealflexApplicationViewModel vm);
    }
}
