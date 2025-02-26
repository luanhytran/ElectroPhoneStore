using System;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

namespace EmailService
{
    public class EmailService : IEmailService
    {
        public void Send(string from, string to, string subject, string text)
        {
            // create message
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(from));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = subject;

            // Send text format
            //email.Body = new TextPart(TextFormat.Plain) { Text = text };

            // Send html format
            email.Body = new TextPart(TextFormat.Html)
            {
                Text = string.Format(text)
            };

            // send email
            using var smtp = new SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("hytranluan@gmail.com", "");

            try
            {
                smtp.Send(email);
                smtp.Disconnect(true);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}