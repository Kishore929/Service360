using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models = Data.Models;


namespace BusinessObjects.Mappers
{
    public class AuthMapper
    {
        public static Models.User RegisterUserModel(User user)
        {
            if (user != null)
            {

                Models.User _user = new Models.User();

                _user.UserName = user?.UserName;
                _user.PasswordHash = user?.PasswordHash;
                _user.Email = user?.Email;

                return _user;
            }

            return null;
        }


        public static User RegisterUser(Models.User user)
        {
            if (user != null)
            {
                User _user = new User();

                _user.Id = user.Id;
                _user.UserName = user?.UserName;
                //_user.PasswordHash = user?.PasswordHash;
                _user.Email = user?.Email;
                return _user;

            }
            return null;
        }
    }
}
