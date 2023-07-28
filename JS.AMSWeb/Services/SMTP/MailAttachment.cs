using JS.AMSWeb.Services.SMTP.Abstraction;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace JS.AMSWeb.Services.SMTP
{
    public class MailAttachment : ISMTPService
    {
        public MailAttachment(IOptions<MailKitEmailSenderOptions> options)
        {
            Options = options.Value;
        }

        public MailKitEmailSenderOptions Options { get; set; }

        public Task SendMailWithAttachment(string email, string subject, string message, string filePath)
        {
            return ExecuteEmailWithAttachment(email, subject, message, filePath);
        }

        public Task ExecuteEmailWithAttachment(string to, string subject, string message, string filePath)
        {
            // create message
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(Options.Sender_EMail);
            if (!string.IsNullOrEmpty(Options.Sender_Name))
                email.Sender.Name = Options.Sender_Name;
            email.From.Add(email.Sender);
            if (to.Contains(";"))
            {
                foreach (var receipient in to.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries))
                {
                    email.To.Add(MailboxAddress.Parse(receipient));
                }
            }
            else
            {
                email.To.Add(MailboxAddress.Parse(to));
            }
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Html) { Text = message };

            BodyBuilder bodyBuilder = new BodyBuilder();

            bodyBuilder.Attachments.Add(filePath);

            email.Body = bodyBuilder.ToMessageBody();

            // send email
            using (var smtp = new SmtpClient())
            {
                smtp.Connect(Options.Host_Address, Options.Host_Port, Options.Host_SecureSocketOptions);
                smtp.Authenticate(Options.Host_Username, Options.Host_Password);
                smtp.Send(email);
                smtp.Disconnect(true);
            }

            return Task.FromResult(true);
        }
    }
}
