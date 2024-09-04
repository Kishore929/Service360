using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories.Authentication
{
    public interface IAuthRepository
    {
        public User RegisterUser(User user);
        public User SearchUser(string email);
        public User SearchUser(string email, string userName);
        public User SearchUser(string email, string userName, string password);
    }
}
