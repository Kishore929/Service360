using Entities;
using Infra.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects.Providers
{
    public interface IAuthProvider
    {
        public ClientResponse<User> RegisterUser(User user);
        public ClientResponse<User> LoginUser(User user);
    }
}
