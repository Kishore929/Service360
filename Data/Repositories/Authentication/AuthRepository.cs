using Data.Context;
using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories.Authentication
{
    public class AuthRepository : IAuthRepository
    {
        readonly Resolve360Context _resolve360Context;
        public AuthRepository(Resolve360Context resolve360Context)
        {
            _resolve360Context = resolve360Context;
        }

        public User RegisterUser(User user)
        {
            try
            {
                var register = _resolve360Context.Add(user);
                int count = _resolve360Context.SaveChanges();
                if (count > 0)
                {
                    return SearchUser(user.Email);
                }
                return null;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public User SearchUser(string email)
        {
            try
            {
                var search = _resolve360Context.User.Where(x => x.Email == email).FirstOrDefault();
                    
                return search;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        public User SearchUser(string email,string userName)
        {
            try
            {
                var search = _resolve360Context.User.Where(x => (x.Email.ToLower() == email.ToLower() || x.UserName.ToLower() == userName.ToLower())).FirstOrDefault();

                return search;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        public User SearchUser(string email,string userName,string password)
        {
            var search = _resolve360Context.User.Where(x => (x.Email.ToLower() == email.ToLower() || x.UserName.ToLower() == userName.ToLower()) && x.PasswordHash == password).FirstOrDefault();

            return search;
        }

    }
}
