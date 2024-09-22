using BusinessObjects.Providers;
using Entities;
using Infra.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Resolve360.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthProvider _authProvider;
        public AuthController(IAuthProvider authprovider)
        {
            _authProvider = authprovider;
        }
        [HttpPost("RegisterUser")]
        public ClientResponse<User> RegisterUser([FromBody] User user)
        {
            var reg = _authProvider.RegisterUser(user);
            return reg;

        }
        [HttpPost("LoginUser")]
        public ClientResponse<User> LoginUser([FromBody] User user)
        {
            var login = _authProvider.LoginUser(user);
            return login;
        }
    }
}
