using MailKit.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JS.AMSWeb.Services.SMTP
{
    public class MailKitEmailSenderOptions
    {
        public MailKitEmailSenderOptions()
        {
            Host_SecureSocketOptions = SecureSocketOptions.Auto;
        }

        public string Host_Address { get; set; } = "mail.wowlistix.com";
           
        public int Host_Port { get; set; } = 465;

        public string Host_Username { get; set; } = "customerservice@wowlistix.com";

        public string Host_Password { get; set; } = "Wowlistix888@";

        public SecureSocketOptions Host_SecureSocketOptions { get; set; }

        public string Sender_EMail { get; set; } = "customerservice@wowlistix.com";

        public string Sender_Name { get; set; } = "WOWLISTIX";
    }
}
