namespace JS.AMSWeb.Services.SMTP.Abstraction
{
    public interface ISMTPService
    {
        Task SendMailWithAttachment(string email, string subject, string htmlMessage, string path);
    }
}
