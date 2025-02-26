namespace EmailService
{
    public interface IEmailService
    {
        void Send(string from, string to, string subject, string html);
    }
}
