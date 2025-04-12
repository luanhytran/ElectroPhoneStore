namespace EmailService.Email
{
    public interface IEmailService
    {
        void Send(string to, string subject, string html);
    }
}
