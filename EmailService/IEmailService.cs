using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EmailService
{
    public interface IEmailService
    {
        void Send(string from, string to, string subject, string html);
    }
}
