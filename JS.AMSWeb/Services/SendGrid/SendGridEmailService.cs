using SendGrid.Helpers.Mail;
using SendGrid;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;
using JS.AMSWeb.Services.SendGrid.ViewModel;
using JS.AMS.Data;
using JS.AMS.Data.Entity.User;

namespace JS.AMSWeb.Services.SendGrid
{
    public class SendGridEmailService : ISendGridEmailService
    {
        private readonly IConfiguration _configuration;
        private AMSDbContext _context;
        private readonly UserManager<UserAccount> _userManager;
        public SendGridEmailService(IConfiguration configuration, AMSDbContext context, UserManager<UserAccount> userManager)
        {
            _configuration = configuration;
            _context = context;
            _userManager = userManager;
        }

        public async Task SendTestEmail()
        {
            var apiKey = _configuration.GetSection("SendGrid").GetSection("ApiKey").Value;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("s@s.com.my", "Wowlistix");
            var subject = "Sending with SendGrid is Fun";
            var to = new EmailAddress("s@gmail.com", "Example User");
            var plainTextContent = "and easy to do anywhere, even with C#";
            var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

        public async Task SendResetPasswordEmail(string recipientEmail, string recipientName)
        {
            var user = _context.UserAccounts.FirstOrDefault(x => x.UserName == recipientEmail);
            var code = await _userManager.GeneratePasswordResetTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

            var url = $"https://Wowlistix.com.my/Identity/Account/ResetPassword?code={code}";

            var apiKey = _configuration.GetSection("SendGrid").GetSection("ApiKey").Value;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("s@s.com.my", "Wowlistix");
            var to = new EmailAddress(recipientEmail, recipientName);
            var templateId = "d-5f566fef509b44b8867f46bb506a9fbb";
            var dynamicTemplateData = new { resetPassUrl = url };

            var msg = MailHelper.CreateSingleTemplateEmail(from, to, templateId, dynamicTemplateData);
            var response = await client.SendEmailAsync(msg);

        }
        public async Task SendSuccessfullyRegEmail(string recipientEmail, string recipientName, string giftName, string address)
        {
            var apiKey = _configuration.GetSection("SendGrid").GetSection("ApiKey").Value;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("s@s.com.my", "Wowlistix");
            var to = new EmailAddress(recipientEmail, recipientName);
            var templateId = "d-418a53c20b3s64fc19d04b665a7580ae8";
            var dynamicTemplateData = new { fullName = recipientName, freeGift = giftName, fullAddress = address };

            var msg = MailHelper.CreateSingleTemplateEmail(from, to, templateId, dynamicTemplateData);
            var response = await client.SendEmailAsync(msg);

        }

        public async Task SendAppointmentEmail(string recipientEmail, string recipientName, string dateTime)
        {
            var apiKey = _configuration.GetSection("SendGrid").GetSection("ApiKey").Value;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("s@s.com.my", "Wowlistix");
            var subject = "New Appointment";
            var to = new EmailAddress(recipientEmail, recipientName);
            var plainTextContent = $"Dear {recipientName}, a viewing appointment scheduled at {dateTime} is waiting for a confirmation.  Please login to Wowlistix to confirm";
            var htmlContent = $"Dear {recipientName}, a viewing appointment scheduled at <strong>{dateTime}</strong> is waiting for a confirmation. <br/> Please login to Wowlistix to confirm";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

        public async Task SendEventReceipt(string recipientEmail, string recipientName, EventReceiptViewModel vm)
        {
            var apiKey = _configuration.GetSection("SendGrid").GetSection("ApiKey").Value;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("s@s.com.my", "Wowlistix");
            var to = new EmailAddress(recipientEmail, recipientName);
            var templateId = "d-418a53c20b364fsc19d04b665a7580ae8";
            var dynamicTemplateData = new
            {
                purchaseTime = vm.PurchasedTime,
                customerUsername = vm.CustomerUsername,
                customerEmail = vm.CustomerEmail,
                ticketNumber = vm.TicketNumber,
                ticketName = vm.TicketName,
                purchaseQuantity = vm.PurchaseQuantity,
                ticketPricing = vm.TicketPricing,
                totalPrice = vm.TotalPrice
            };
            var msg = MailHelper.CreateSingleTemplateEmail(from, to, templateId, dynamicTemplateData);
            var response = await client.SendEmailAsync(msg);
        }

        public async Task SendRealflexStatus(RealFlexEmailViewModel vm)
        {
            var apiKey = _configuration.GetSection("SendGrid").GetSection("ApiKey").Value;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("s@s.com.my", "Wowlistix");
            var to = new EmailAddress(vm.RecipientEmail, vm.RecipientName);
            var templateId = "d-s";
            var dynamicTemplateData = new
            {
                tenure = vm.TenureInMonth,
                interest = vm.InterestRate,
                monthlyRepayment = vm.MonthlyRepayment,
                amount = vm.LoanAmount,
                bankName = vm.BankName,
                name = vm.RecipientName,
                status = vm.Status,
                propertyName = vm.PropertyName,
                imgUrl = vm.PropertyImage
            };
            var msg = MailHelper.CreateSingleTemplateEmail(from, to, templateId, dynamicTemplateData);
            var response = await client.SendEmailAsync(msg);
        }

        public async Task SendNewRealflexApplicationNotification(NewRealflexApplicationViewModel vm)
        {
            var apiKey = _configuration.GetSection("SendGrid").GetSection("ApiKey").Value;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("s@s.com.my", "Wowlistix");
            var to = new EmailAddress(vm.RecipientEmail, vm.RecipientName);
            var templateId = "d-0f7eb0765de445a0sb32ed43437661609";
            var dynamicTemplateData = new
            {
                amount = vm.LoanAmount,
                tenure = vm.TenureInMonth,
                incomeSrc = vm.IncomeSource,
                propAddress = vm.PropertyAddress,
                propertyImage = vm.PropertyImage
            };
            var msg = MailHelper.CreateSingleTemplateEmail(from, to, templateId, dynamicTemplateData);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
